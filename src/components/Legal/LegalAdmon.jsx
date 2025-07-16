import React, { useState, useEffect } from "react";
import vacio from "../views/_images/caja-vacia-gris.png";
import HeaderNavbar from "components/Investor/Navbars/HeaderNavbar";
import { API, Auth, graphqlOperation } from "aws-amplify";
import useFetchProperties from "hooks/useFetchProperties";
import { useNavigate } from "react-router";
import { formatArea } from "components/Constructor/ProjectPage/mappers";
import { stateMapper } from "utilities/propertyStateMapper";
import { useAuth } from "context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import {
  createNotification,
  createVerificationComment,
  updateProperty,
  updateVerification,
} from "graphql/mutations";
import PropertyChat from "components/Legal/PropertyChat";
import { FaEye, FaUserPlus, FaUserMinus, FaInfoCircle } from "react-icons/fa";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const documentTypeMapper = {
  CERTIFICADO_TRADICION: "Certificado de Tradición",
  ESCRITURA_PUBLICA: "Escritura Pública",
  PLANO_CATASTRAL: "Plano Catastral",
};

const getPropertyArea = (property) => {
  const areaFeature = property.propertyFeatures?.items.find(
    (feature) => feature?.featureID === "D_area"
  );
  if (!areaFeature) return "-";
  return parseFloat(areaFeature?.value).toLocaleString("es-ES");
};

const DocumentationModal = ({
  isOpen,
  onClose,
  property,
  fetchProperties,
  user,
}) => {
  const [showRejectionReasonModal, setShowRejectionReasonModal] =
    useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  console.log("property", property);

  const propertyFiles = property?.propertyFeatures?.items
    .find((feature) => feature.featureID === "GLOBAL_PROPERTY_FILES")
    .documents.items.map((document) => {
      const documentData = JSON.parse(document.data || "");
      return {
        name: documentData.name,
        type:
          documentTypeMapper[documentData.type] ||
          "Tipo de documento desconocido",
        url: documentData.url,
      };
    });

  console.log(propertyFiles);

  const handleEligible = async (option, reason = "") => {
    try {
      await API.graphql(
        graphqlOperation(updateProperty, {
          input: {
            id: property.id,
            status: option ? "SELECTABLE" : "NOT_SELECTABLE",
            reason: option ? null : reason,
          },
        })
      );

      // Si se rechaza, también deja un mensaje en el chat del predio
      if (!option && reason.trim()) {
        await API.graphql(
          graphqlOperation(createVerificationComment, {
            input: {
              verificationID: property.propertyFeatures.items.find(
                (f) => f.featureID === "GLOBAL_PROPERTY_FILES"
              ).verifications.items[0].id,
              comment: `Predio marcado como No Elegible. Razón: ${reason}`,
              isCommentByVerifier: true,
            },
          })
        );
      }

      const notificationMessage = option
        ? `Tu predio '${property.name}' ha sido aprobado como 'Elegible'.`
        : `Tu predio '${property.name}' ha sido marcado como 'No Elegible'.`;

      const notificationData = {
        userOriginID: user.id,
        userID: property.userID,
        message: notificationMessage,
        type: "PROPERTY",
        resourceID: property.id,
        isRead: false,
      };

      await API.graphql(
        graphqlOperation(createNotification, { input: notificationData })
      );

      toast.success(
        `El estado del predio ahora es: ${option ? "Elegible" : "No elegible"}`
      );
      fetchProperties();
    } catch (error) {
      toast.error("Error al actualizar el estado del predio");
      console.log("error", error);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl h-auto">
        <h2 className="text-xl font-bold mb-4">Documentación del predio</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            {propertyFiles.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {propertyFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-md shadow-sm"
                  >
                    <span className="text-gray-500 text-sm">{file.type}</span>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center gap-2"
                    >
                      <FaEye size={14} />
                      Ver
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic text-center">
                No hay documentos subidos para este predio.
              </p>
            )}
          </div>
          <PropertyChat
            propertyId={property.id}
            featureChat={"GLOBAL_PROPERTY_FILES"}
          />
        </div>
        {/* Aquí se puede agregar el contenido del documento */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => handleEligible(true)}
          >
            Elegible
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setShowRejectionReasonModal(true)}
          >
            No elegible
          </button>

          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
      {showRejectionReasonModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              Motivo de No Elegibilidad
            </h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Escribe el motivo por el cual el predio no es elegible..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={5}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowRejectionReasonModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (!rejectionReason.trim()) {
                    toast.error("Debes ingresar una razón");
                    return;
                  }
                  handleEligible(false, rejectionReason);
                  setShowRejectionReasonModal(false);
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente principal que muestra la lista de campañas
export default function LegalAdmon() {
  const { properties, fetchProperties } = useFetchProperties();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const { user } = useAuth();

  // Estados para paginación y búsqueda
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLegal, setFilterLegal] = useState("");

  const navigate = useNavigate();

  async function logOut() {
    await Auth.signOut();
    localStorage.removeItem("role"); // Eliminar el rol del localStorage
    window.location.href = "/"; // Redirigir a la página principal
  }

  const handleOpenModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleToggleAssign = async (property) => {
    const propertyVerificationID = property?.propertyFeatures?.items.find(
      (feature) => feature.featureID === "GLOBAL_PROPERTY_FILES"
    ).verifications.items[0].id;

    if (property.userLegal !== null) {
      if (property.userLegalID === user.id) {
        // Si el usuario legal es el mismo que el usuario logueado, desasignar
        try {
          await API.graphql(
            graphqlOperation(updateProperty, {
              input: {
                id: property.id,
                userLegalID: null, // Desasignar el usuario legal
              },
            })
          );

          const notificationData = {
            userOriginID: user.id, // Usuario que hace la asignación
            userID: property.userID, // Dueño del predio
            message: `El revisor legal ya no está asignado a tu predio '${property.name}'.`,
            type: "PROPERTY",
            resourceID: property.id, // ID del predio
            isRead: false,
          };

          await API.graphql(
            graphqlOperation(createNotification, { input: notificationData })
          );

          toast.success(`Predio desasignado`);
          fetchProperties();
        } catch (error) {
          toast.error("Error al actualizar el estado del predio");
        }
        console.log("Desasignar predio:", property.id, "del legal:", user.id);
        return; // Salir de la función después de desasignar
      } else {
        toast.error("El predio pertenece a otro legal");
        return;
      }
    }

    // Si no hay usuario legal, asignar el usuario
    try {
      await API.graphql(
        graphqlOperation(updateProperty, {
          input: {
            id: property.id,
            userLegalID: user.id,
          },
        })
      );

      await API.graphql(
        graphqlOperation(updateVerification, {
          input: {
            id: propertyVerificationID,
            userVerifierID: user.id,
          },
        })
      );

      const notificationData = {
        userOriginID: user.id, // Usuario que hace la asignación
        userID: property.userID, // Dueño del predio
        message: `Se ha asignado un revisor legal a tu predio '${property.name}' para revisar la documentación.`,
        type: "PROPERTY",
        resourceID: property.id, // ID del predio
        isRead: false,
      };

      await API.graphql(
        graphqlOperation(createNotification, { input: notificationData })
      );

      toast.success(`Predio asignado`);
      fetchProperties();
    } catch (error) {
      toast.error("Error al actualizar el estado del predio");
    }
    console.log("Asignar predio:", property.id, "al legal:", user.id);
  };

  let filteredProperties = properties.filter(
    (property) => filterStatus === "" || property.status === filterStatus
  );

  if (filterStatus !== "") {
    filteredProperties = properties.filter(
      (property) => property.status === filterStatus
    );
  }

  // Filtrar por legal asignado
  if (filterLegal !== "") {
    filteredProperties = filteredProperties.filter(
      (property) => property.userLegalID === filterLegal
    );
  }

  // Filtrar por nombre de predio (buscador)
  const searchFilteredProperties = filteredProperties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const totalRows = searchFilteredProperties.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage) || 1;
  const paginatedProperties = searchFilteredProperties.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Resetear página si cambia el filtro, búsqueda o cantidad por página
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, filterLegal, searchTerm, rowsPerPage]);

  // Obtener lista única de legales asignados
  const uniqueLegals = [
    ...new Set(
      properties
        .filter((property) => property.userLegalID)
        .map((property) => property.userLegalID)
    ),
  ];

  console.log("properties", properties);
  return (
    <>
      {/* <HeaderNavbar logOut={logOut} /> */}
      <NewHeaderNavbar />

      {/* 📌 Listado de predios */}
      <section className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📌 Listado de predios
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Card de Filtros */}
          <div className="bg-white rounded-t-2xl shadow-lg border border-gray-100 p-6 lg:col-span-1 order-1 lg:order-1 h-[400px] lg:h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <h3 className="font-bold text-gray-800 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              🔍 Filtros y Búsqueda
            </h3>
            
            <div className="space-y-4">
              {/* Buscador */}
              <div>
                <label
                  htmlFor="searchInput"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Buscar predio:
                </label>
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Nombre del predio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
                />
              </div>
              
              {/* Filtro por Estado */}
              <div>
                <label
                  htmlFor="statusFilter"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Estado:
                </label>
                <select
                  id="statusFilter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
                >
                  <option value="">Todos los estados</option>
                  {Object.keys(stateMapper).map((key) => (
                    <option key={key} value={key}>
                      {stateMapper[key].label.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Filtro por Legal */}
              <div>
                <label
                  htmlFor="legalFilter"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Legal:
                </label>
                <select
                  id="legalFilter"
                  value={filterLegal}
                  onChange={(e) => setFilterLegal(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
                >
                  <option value="">Todos los legales</option>
                  <option value="null">Sin asignar</option>
                  {uniqueLegals.map((legalId) => {
                    const legal = properties.find(
                      (p) => p.userLegalID === legalId
                    )?.userLegal;
                    return (
                      <option key={legalId} value={legalId}>
                        {(legal?.name || `Legal ${legalId}`).toUpperCase()}
                      </option>
                    );
                  })}
                </select>
              </div>
              
              {/* Información de resultados */}
              <div className="pt-4 border-t border-gray-200 mt-6">
                <p className="text-sm text-gray-600 font-medium">
                  Mostrando {searchFilteredProperties.length} de{" "}
                  {properties.length} predios
                </p>
              </div>
            </div>
          </div>
          {properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg border border-gray-200 lg:col-span-3 order-2 lg:order-2">
              <img
                src={vacio}
                className="w-32 h-32 mb-6 opacity-60"
                alt="Sin propiedades"
              />
              <p className="text-gray-500 text-lg font-medium">
                😔 No hay propiedades disponibles.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-t-2xl shadow-xl border border-gray-100 lg:col-span-3 order-2 lg:order-2 h-[400px] lg:h-[600px] flex flex-col">
              {/* Paginación */}
              <div className="flex flex-col rounded-t-2xl md:flex-row md:items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 text-end">Filas por página:</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    {[5, 10, 15, 20, 30, 50].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <button
                    className="px-3 py-1 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-50 hover:bg-gray-100 transition-all duration-200 disabled:hover:bg-transparent"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                  <span className="text-sm font-medium text-gray-700 px-3 py-1 bg-white rounded-lg border border-gray-200">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    className="px-3 py-1 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-50 hover:bg-gray-100 transition-all duration-200 disabled:hover:bg-transparent"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto bg-white flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <th className="text-left px-2 py-1 font-semibold text-xs"></th>
                      <th className="text-left px-2 py-1 font-semibold text-xs">Predio</th>
                      <th className="text-left px-2 py-1 font-semibold text-xs">Descripción</th>
                      <th className="text-left px-2 py-1 font-semibold text-xs">Campaña</th>
                      <th className="text-left px-2 py-1 font-semibold text-xs">Fecha de inscripción</th>
                      <th className="text-left px-2 py-1 font-semibold text-xs">Área (m2)</th>
                      <th className="text-left px-2 py-1 font-semibold text-xs">Departamento</th>
                      <th className="text-left px-2 py-1 font-semibold text-xs">Legal</th>
                      <th className="text-left px-2 py-1 font-semibold text-xs">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProperties.map((property, idx) => (
                      <tr
                        key={property.id}
                        className={`text-xs transition-all duration-200 uppercase border-b border-gray-100 hover:bg-blue-50 hover:shadow-sm ${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-25"
                        }`}
                      >
                        <td className="px-3 py-2">
                          <div className="flex justify-between items-center w-full gap-2">
                            {/* Columna 3: Ver Detalles */}
                            <div className="flex justify-center flex-1">
                              <button
                                onClick={() =>
                                  navigate(`/property/${property.id}`)
                                }
                                className="border border-yellow-500 bg-yellow-500 text-white rounded-lg p-1 text-xs hover:bg-yellow-600 hover:shadow-md active:bg-yellow-700 transition-all duration-200 flex items-center justify-center w-7 h-7 transform hover:scale-105"
                                aria-label="Detalles"
                                data-tooltip-id={`tooltip-details-${property.id}`}
                                data-tooltip-content="Ver detalles del predio"
                              >
                                <FaInfoCircle size={13} />
                              </button>
                              <div className="hidden md:block">
                                <ReactTooltip
                                  id={`tooltip-details-${property.id}`}
                                  place="top"
                                  effect="solid"
                                />
                              </div>
                            </div>

                            {/* Columna 2: Revisar Documentación */}
                            <div className="flex justify-center flex-1">
                              {(() => {
                                const canValidate =
                                  property.userLegalID === user.id &&
                                  property.status !== "APPROVED";
                                return (
                                  <>
                                    <button
                                      className={`border border-blue-500 bg-blue-500 text-white rounded-lg p-1 text-xs transition-all duration-200 flex items-center justify-center w-7 h-7 ${canValidate ? 'hover:bg-blue-600 hover:shadow-md active:bg-blue-700 transform hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
                                      onClick={() => canValidate && handleOpenModal(property)}
                                      aria-label="Revisar documentación"
                                      data-tooltip-id={`tooltip-validate-${property.id}`}
                                      data-tooltip-content={canValidate ? "Revisar documentación del predio" : "No tienes permisos para revisar documentación"}
                                      disabled={!canValidate}
                                    >
                                      <FaEye size={13} />
                                    </button>
                                    <div className="hidden md:block">
                                      <ReactTooltip
                                        id={`tooltip-validate-${property.id}`}
                                        place="top"
                                        effect="solid"
                                      />
                                    </div>
                                  </>
                                );
                              })()}
                            </div>

                            {/* Columna 1: Asignar/Desasignar */}
                            <div className="flex justify-center flex-1">
                              {(() => {
                                const canAssign =
                                  property.userLegalID === null &&
                                  property.status !== "REJECTED" &&
                                  property.status !== "APPROVED";
                                const canUnassign =
                                  property.userLegalID === user.id &&
                                  property.status !== "REJECTED" &&
                                  property.status !== "APPROVED";

                                if (canAssign) {
                                  return (
                                    <>
                                      <button
                                        className="border border-green-500 bg-green-500 text-white rounded-lg p-1 text-xs hover:bg-green-600 hover:shadow-md active:bg-green-700 transition-all duration-200 flex items-center justify-center w-7 h-7 transform hover:scale-105"
                                        onClick={() =>
                                          handleToggleAssign(property)
                                        }
                                        aria-label="Asignar predio"
                                        data-tooltip-id={`tooltip-assign-${property.id}`}
                                        data-tooltip-content="Asignar predio a mí para revisión legal"
                                      >
                                        <FaUserPlus size={13} />
                                      </button>
                                      <div className="hidden md:block">
                                        <ReactTooltip
                                          id={`tooltip-assign-${property.id}`}
                                          place="top"
                                          effect="solid"
                                        />
                                      </div>
                                    </>
                                  );
                                } else if (canUnassign) {
                                  return (
                                    <>
                                      <button
                                        className="border border-red-500 bg-red-500 text-white rounded-lg p-1 text-xs hover:bg-red-600 hover:shadow-md active:bg-red-700 transition-all duration-200 flex items-center justify-center w-7 h-7 transform hover:scale-105"
                                        onClick={() =>
                                          handleToggleAssign(property)
                                        }
                                        aria-label="Desasignar predio"
                                        data-tooltip-id={`tooltip-unassign-${property.id}`}
                                        data-tooltip-content="Desasignar predio de mi revisión legal"
                                      >
                                        <FaUserMinus size={13} />
                                      </button>
                                      <div className="hidden md:block">
                                        <ReactTooltip
                                          id={`tooltip-unassign-${property.id}`}
                                          place="top"
                                          effect="solid"
                                        />
                                      </div>
                                    </>
                                  );
                                }
                                return <div className="w-7 h-7"></div>; // Espacio vacío para mantener alineación
                              })()}
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-1 min-w-36">{property.name}</td>
                        <td
                          className="px-2 py-1 max-w-xs truncate"
                          data-tooltip-id={`tooltip-description-${property.id}`}
                          data-tooltip-content={
                            property.description || "Sin descripción"
                          }
                        >
                          {property.description || "Sin descripción"}
                          <div className="hidden md:block">
                            <ReactTooltip
                              id={`tooltip-description-${property.id}`}
                              place="top"
                              effect="solid"
                              style={{
                                maxWidth: 300,
                                whiteSpace: "pre-line",
                                wordBreak: "break-word",
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-2 py-1 min-w-36">
                          {property.campaign?.name || "-"}
                        </td>
                        <td className="px-2 py-1 min-w-28">
                          {property.createdAt ? new Date(property.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '-'}
                        </td>
                        <td className="px-2 py-1 min-w-20">
                          {getPropertyArea(property)}
                        </td>
                        <td className="px-2 py-1">
                          {property.department || "-"}
                        </td>
                        <td className="px-2 py-1 min-w-36">
                          {(() => {
                            const name =
                              property.userLegal?.name || "Sin Asignar";
                            const badgeColor = property.userLegal?.name
                              ? "bg-blue-100 text-blue-700 border border-blue-400"
                              : "bg-gray-200 text-gray-700 border border-gray-400";
                            return (
                              <span
                                className={`inline-block px-1 py-0 rounded text-[10px] font-semibold whitespace-nowrap uppercase ${badgeColor}`}
                              >
                                {name}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="px-2 py-1 min-w-36">
                          {(() => {
                            const label =
                              stateMapper[property.status].label ||
                              "No disponible";
                            let badgeColor =
                              "bg-gray-300 text-gray-800 border border-gray-400";
                            let tooltipContent = "";
                            if (property.status === "APPROVED") {
                              badgeColor =
                                "bg-green-100 text-green-700 border border-green-400";
                              tooltipContent =
                                "Aprobado: El predio ha sido aprobado legalmente.";
                            } else if (
                              property.status === "REJECTED" ||
                              property.status === "NOT_SELECTABLE"
                            ) {
                              badgeColor =
                                "bg-red-100 text-red-700 border border-red-400";
                              tooltipContent =
                                "Rechazado/No seleccionable: El predio no cumple los requisitos legales.";
                            } else if (property.status === "PENDING") {
                              badgeColor =
                                "bg-yellow-100 text-yellow-700 border border-yellow-400";
                              tooltipContent =
                                "Pendiente: El predio está pendiente de revisión legal.";
                            } else if (property.status === "SELECTABLE") {
                              badgeColor =
                                "bg-blue-100 text-blue-700 border border-blue-400";
                              tooltipContent =
                                "Seleccionable: El predio es elegible para continuar el proceso.";
                            } else {
                              tooltipContent = label;
                            }
                            return (
                              <>
                                <span
                                  className={`inline-block px-1 py-0 rounded text-[10px] font-semibold whitespace-nowrap uppercase ${badgeColor}`}
                                  data-tooltip-id={`tooltip-status-${property.id}`}
                                  data-tooltip-content={tooltipContent}
                                >
                                  {label}
                                </span>
                                <div className="hidden md:block">
                                  <ReactTooltip
                                    id={`tooltip-status-${property.id}`}
                                    place="top"
                                    effect="solid"
                                  />
                                </div>
                              </>
                            );
                          })()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
      <DocumentationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={selectedProperty}
        fetchProperties={fetchProperties}
        user={user}
      />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export { DocumentationModal };
