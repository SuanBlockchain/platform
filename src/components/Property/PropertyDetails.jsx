import React, { useEffect, useState } from "react";
import { useAuth } from "context/AuthContext";
import { getProjectProgress } from "services/getProjectProgress";
import { CheckIcon } from "components/common/icons/CheckIcon";
import { HourGlassIcon } from "components/common/icons/HourGlassIcon";
import { usePropertyData } from "context/PropertyDataContext";
import Swal from "sweetalert2";

import ActualUseAndPotential from "components/Constructor/Property/ActualUseAndPotential";
import UseRestrictions from "./UseRestrictions";
import Ecosystem from "./Ecosystem";
import GeneralAspects from "./GeneralAspects";
import Relations from "./Relations";
import CadastralRecords from "./CadastralRecords";
import AdditionalFiles from "./AdditionalFiles";
import { API, graphqlOperation } from "aws-amplify";
import { toast } from "react-toastify";
import { updateProperty } from "graphql/mutations";

export default function PropertyDetails({ visible, setHasUnsavedChanges , handleFieldChange}) {
  const { propertyData } = usePropertyData();
  const [autorizedUser, setAutorizedUser] = useState(false);
  const [isPostulant, setIsPostulant] = useState(false);
  const [isVerifier, setIsVerifier] = useState(false);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [totalArea, setTotalArea] = useState(0);
  const [latLngCentroid, setLatLngCentroid] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (user && propertyData) {
      console.log("🔍 Usuario autenticado:", user);
      console.log("🔍 Datos de la propiedad:", propertyData);
  
      const postulant = propertyData?.projectPostulant?.id;
      const authorizedUsers = [...propertyData.projectVerifiers, postulant];
  
      setAutorizedUser(
        (authorizedUsers.includes(user.id) &&
          (propertyData.propertyInfo.status === null ||
            propertyData.propertyInfo.status === "PENDING")) ||
          user.role === "admon" ||
          propertyData.projectVerifiers.includes(user.id)
      );
  
      setIsPostulant(postulant === user.id);
  
      // ✅ Agregar log para verificar si el usuario es verificador
      console.log("🔍 Lista de verificadores:", propertyData.projectVerifiers);
      console.log("🔍 El usuario es verificador:", propertyData.projectVerifiers.includes(user.id));
  
      setIsVerifier(propertyData.projectVerifiers.includes(user.id));
    }
  }, [user, propertyData]);
  

  useEffect(() => {
    if (user && propertyData) {
      setStatus(propertyData?.propertyInfo?.status || "PENDING"); // Inicializar estado
    }
  }, [user, propertyData, setHasUnsavedChanges]);


  const handleValidateProperty = async (status) => {
    if (!propertyData?.propertyInfo?.id) return;

    setIsLoading(true);
    try {
      await API.graphql(graphqlOperation(updateProperty, {
        input: {
          id: propertyData.propertyInfo.id,
          status,
        },
      }));
      toast.success(`Predio ${status === "APPROVED" ? "aprobado" : "rechazado"} exitosamente`);
    } catch (error) {
      console.error("Error al actualizar el estado del predio:", error);
      toast.error("Error al actualizar el estado del predio");
    }
    setIsLoading(false);
  };

  // Función para mostrar el modal con las opciones de validación
  const handleVerifyClick = () => {
    Swal.fire({
      title: "Verificación del predio",
      text: "Selecciona si deseas aprobar o rechazar el predio.",
      icon: "question",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "✅ Aprobar",
      denyButtonText: "❌ Rechazar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      confirmButtonColor: "#28a745",
      denyButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        handleValidateProperty("APPROVED");
      } else if (result.isDenied) {
        handleValidateProperty("REJECTED");
      }
    });
  };


  return (
    <>
      {visible && propertyData && (
           <>
        <div className="row row-cols-1 row-cols-xl-2 g-4">
          <div className="col-12 col-xl-12">
            <CadastralRecords
              autorizedUser={autorizedUser}
              totalArea={totalArea}
              latLngCentroid={latLngCentroid}
              setTotalArea={setTotalArea}
              setHasUnsavedChanges={setHasUnsavedChanges}
              handleFieldChange={handleFieldChange}
            />
          </div>
  
          <div className="col-12">
            <ActualUseAndPotential
              autorizedUser={autorizedUser}
              setHasUnsavedChanges={setHasUnsavedChanges}
              handleFieldChange={handleFieldChange}
            />
          </div>
  
          <div className="col-12">
            <UseRestrictions
              autorizedUser={autorizedUser}
              setHasUnsavedChanges={setHasUnsavedChanges}
              handleFieldChange={handleFieldChange}
            />
          </div>
  
          <div className="col-12">
            <Ecosystem
              autorizedUser={autorizedUser}
              setHasUnsavedChanges={setHasUnsavedChanges}
              handleFieldChange={handleFieldChange}
            />
          </div>
  
          <div className="col">
            <GeneralAspects
              autorizedUser={autorizedUser}
              setHasUnsavedChanges={setHasUnsavedChanges}
              handleFieldChange={handleFieldChange}
            />
          </div>
  
          <div className="col">
            <Relations
              autorizedUser={autorizedUser}
              setHasUnsavedChanges={setHasUnsavedChanges}
              handleFieldChange={handleFieldChange}
            />
          </div>
  
          <div className="col">
            <AdditionalFiles
              autorizedUser={autorizedUser}
              basePath={`projects/${propertyData.propertyInfo?.projectID}/other/`}
              setHasUnsavedChanges={setHasUnsavedChanges}
              handleFieldChange={handleFieldChange}
            />
          </div>
        </div>
        <div className="w-full mt-12 mb-16">
        <div className="bg-white shadow-xl rounded-lg p-6 w-full text-center border border-gray-300">
  
  {/* Mostrar estado del predio */}
  {status === "APPROVED" && (
    <div className="mb-4 px-4 py-2 text-white bg-green-500 rounded-md font-semibold">
      ✅ Predio Aprobado
    </div>
  )}

  {status === "REJECTED" && (
    <div className="mb-4 px-4 py-2 text-white bg-red-500 rounded-md font-semibold">
      ❌ Predio Rechazado
    </div>
  )}

  {/* Debug para ver si se cumplen las condiciones */}
  {console.log("🎯 Estado del predio:", status)}
  {console.log("🎯 Usuario es verificador:", isVerifier)}

  {/* Mostrar el botón solo si el usuario es verificador y el estado es PENDING */}
  {status === "PENDING" && isVerifier && (
    <>
      {console.log("✅ Renderizando botón para verificador")}
      <button
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-300"
        onClick={handleVerifyClick}
        disabled={isLoading}
      >
        {isLoading ? "Procesando..." : "Verificar"}
      </button>
    </>
  )}
</div>

          </div>
    </>
  )}
</>
);

  
}
