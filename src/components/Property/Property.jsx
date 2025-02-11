import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


// Contexts
import { S3ClientProvider } from "context/s3ClientContext";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";
import { HourGlassIcon } from "components/common/icons/HourGlassIcon";
import { getProperty } from "graphql/queries";
import PropertyDetails from "./PropertyDetails";
import { usePropertyData } from "context/PropertyDataContext";
// Mostrar si tiene asignado validador
// Tiempo restante para verificar
const statusColor = {
  PENDING: "bg-gray-600",
  APPROVED: "bg-green-600",
  REJECTED: "bg-red-600",
};
const statusEs = {
  PENDING: "Pendiente",
  APPROVED: "Aprobado",
  REJECTED: "Rechazado",
};
export default function Property() {
  const { id } = useParams();
  const { propertyData, handlePropertyData } = usePropertyData();
  const [property, setProperty] = useState(null);
  const [editable, setEditable] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("details");
  const [changedFields, setChangedFields] = useState({});

  useEffect(() => {
    /* const fetchUserGroups = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.idToken.payload['cognito:groups'] || [''];
        setUserGroup(groups[0])
      } catch (error) {
        console.error('Error fetching user groups: ', error);
      }
    };

    fetchUserGroups(); */
    const fetchPropertyData = async () => {
      await handlePropertyData({ pID: id });
    };
    if (id) {
      fetchPropertyData();
    }
  }, [id]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = "Tienes cambios sin guardar. ¿Seguro que deseas salir?";
      }
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);
  
  const handleNavigation = (path) => {
    if (hasUnsavedChanges) {
      Swal.fire({
        title: "Cambios sin guardar",
        text: "Tienes cambios sin guardar. ¿Seguro que deseas salir?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, salir",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(path);
        }
      });
    } else {
      navigate(path);
    }
  };

  const handleFieldChange = (field, value) => {
    setChangedFields((prev) => ({
      ...prev,
      [field]: true, // 🔴 Marca el campo como modificado
    }));
    setHasUnsavedChanges(true);
  };

  const isAuthor = async (id) => {
    try {
      const userLogged = await Auth.currentAuthenticatedUser();

      if (userLogged.attributes.sub === id) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const fetchProperty = async () => {
    try {
      const data = await API.graphql(graphqlOperation(getProperty, { id }));

      console.log(data.data.getProperty, "data.data.getProperty");
      setProperty(data.data.getProperty);
      const isAuthorResult = await isAuthor(data.data.getProperty.userID);

      setEditable(isAuthorResult && propertyData.propertyInfo.status === null);
    } catch (error) {
      console.error("Error fetching campaign:", error);
    }
  };
  useEffect(() => {
    if (propertyData) {
      fetchProperty();
    }
  }, [propertyData]);

  if (!property) return null;
  if (!propertyData) return null;
  console.log("propertyData", propertyData);

  return (
    <S3ClientProvider>
      <div>
        <div className="container-sm">
          <div className="mb-5">
            <NewHeaderNavbar></NewHeaderNavbar>
          </div>
          <div className="my-2">-</div>
          <div className="mt-4">
           <a
  onClick={() => handleNavigation(property.campaign.available ? `/campaign/${property.campaign.id}` : `/project/${property.productID}`)}
  className="border-2 border-yellow-500 bg-yellow-500 rounded-md px-2 py-1 active:bg-yellow-600 active:border-yellow-600"
>
  {property.campaign.available ? "Regresar a la campaña" : "Regresar al proyecto"}
</a>
            <div className="relative pt-3 px-4 mb-4 mt-4 border rounded shadow">
              <div className="row gy-2">
                <header className="d-flex justify-content-between">
                  <p className="fs-3 mb-0">{property.name}</p>
                </header>
                <section>
                  <p className="fs-6 mb-0 fw-bold">Fecha de creación:</p>
                  <p className="fs-6 mb-0">{property.createdAt}</p>
                </section>
                <section>
                  <p className="fs-6 mb-0 fw-bold">Área Total:</p>
                  <p className="fs-6 mb-0">
                    {propertyData.projectCadastralRecords.totalAreaFormatted}
                  </p>
                </section>
                {/* <section>
                  <p className="fs-6 mb-0 fw-bold">Descripción:</p>
                  <p className="fs-6 mb-0">Descripcion de predios</p>
                </section>
                <section>
                  <p className="fs-6 mb-0 fw-bold">Identificadores catastrales:</p>
                  <p className="fs-6 mb-0">{property.cadastralNumber}</p>
                </section> */}
              </div>
              <span
                className={`${
                  statusColor[property.status]
                } absolute top-4 right-4 bg-blue-500 text-xs text-white font-bold px-4 py-2 w-fit rounded-md text-nowrap `}
              >
                {statusEs[property.status]}
              </span>
              <ul className="font-medium flex mt-4 pl-0 ">
                <li>
                  <a
                    href="#details"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection("details");
                    }}
                    className={`${
                      activeSection === "details"
                        ? "text-black border-t border-r border-l border-gray-400  rounded-t-md"
                        : "text-blue-500"
                    } flex py-2 px-3`}
                    aria-current="page"
                  >
                    Detalles
                  </a>
                </li>
              </ul>
            </div>
            <PropertyDetails
  visible={activeSection === "details"}
  setHasUnsavedChanges={setHasUnsavedChanges}
  handleFieldChange={handleFieldChange}
/>
          </div>
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </S3ClientProvider>
  );
}
