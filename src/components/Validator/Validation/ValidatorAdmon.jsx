import React, { useState } from "react";
import useUserCampaigns from "hooks/useUserCampaigns";
import vacio from "../../views/_images/caja-vacia-gris.png";
import {
  getImagesCategories,
  getYearFromAWSDatetime,
} from "components/Constructor/ProjectPage/utils";
import HeaderNavbar from "components/Investor/Navbars/HeaderNavbar";
import { API, Auth, graphqlOperation } from "aws-amplify";
import useFetchProperties from "hooks/useFetchProperties";
import { createNotification, createUserProduct, updateProperty } from "graphql/mutations";
import { formatArea } from "components/Constructor/ProjectPage/mappers";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { stateMapper } from "utilities/propertyStateMapper";
import { useAuth } from "context/AuthContext";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// Componente para representar una campaña individual
const CampaignCard = ({ campaign }) => {
  let campaignImages = [];
  try {
    campaignImages = campaign?.images ? JSON.parse(campaign.images) : [];
  } catch (error) {
    console.error("Error al parsear las imágenes de la campaña:", error);
  }

  const campaignImage =
    campaignImages.length > 0
      ? campaignImages[0]
      : getImagesCategories(campaign?.products?.items?.[0]?.categoryID);

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          className="h-40 w-full object-cover"
          src={campaignImage}
          alt="Imagen de la campaña"
        />
        <div className="p-4">
          <div className="flex space-x-2 mb-2">
            <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
              {getYearFromAWSDatetime(
                campaign?.products?.items?.[0]?.createdAt
              )}
            </span>
            <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
              {campaign?.products?.items?.[0]?.categoryID}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2">{campaign?.name}</h3>
       <p
  data-tooltip-id={`tooltip-${campaign?.id}`}
  data-tooltip-content={campaign?.description}
  className="text-gray-600 text-sm mb-4 line-clamp-4 leading-relaxed cursor-pointer"
>
  {campaign?.description}
</p>

<ReactTooltip
  id={`tooltip-${campaign?.id}`}
  place="top"
  style={{
    maxWidth: '300px',
    whiteSpace: 'pre-wrap',
    fontSize: '0.85rem',
  }}
/>

          <div className="flex justify-between items-center mt-3 space-x-4">
          <a
  href={`campaign/${campaign?.id}`}
  className="flex-1 inline-block bg-[#74742c] text-white text-sm px-4 py-2 rounded hover:bg-[#5f5f23] text-center"
>
  📢 Ver Campaña
</a>

            <a
              href={`project/${campaign?.products?.items?.[0]?.id}`}
              className="flex-1 inline-block bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-600 text-center"
            >
              📂 Ver Proyecto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const getPropertyArea = (property) => {
  const areaFeature = property.propertyFeatures?.items.find(
    (feature) => feature?.featureID === "D_area"
  );
  if (!areaFeature) return "No disponible";
  return formatArea(areaFeature?.value) || "No disponible";
};

// Componente para el modal de asignación de campaña
const CampaignAssignModal = ({ isOpen, onClose, campaigns, onAssign }) => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleAssign = () => {
    if (selectedCampaign) {
      onAssign(selectedCampaign);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Asignar a Campaña</h2>
        <select
          className="border rounded p-2 mb-4 w-full"
          onChange={(e) => setSelectedCampaign(e.target.value)}
          value={selectedCampaign || ""}
        >
          <option value="" disabled>
            Selecciona una campaña
          </option>
          {campaigns.map((campaign) => (
            <option key={campaign.id} value={campaign.id}>
              {campaign.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleAssign}
          >
            Asignar
          </button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal que muestra la lista de campañas
export default function ValidatorAdmon() {
  const { userCampaigns } = useUserCampaigns();
  const { properties, fetchProperties } = useFetchProperties();
  const [isShowProductDocuments, setIsShowProductDocuments] = useState(true);
  const [isShowUsers, setIsShowUsers] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { user } = useAuth();

  const navigate = useNavigate();

  async function logOut() {
    await Auth.signOut();
    localStorage.removeItem("role"); // Eliminar el rol del localStorage
    window.location.href = "/"; // Redirigir a la página principal
  }

  // 🔹 Función para cambiar la vista en el Navbar
  function changeHeaderNavBarRequest(pRequest) {
    if (pRequest === "product_documents") {
      setIsShowProductDocuments(true);
      setIsShowUsers(false);
    }
    if (pRequest === "users") {
      setIsShowProductDocuments(false);
      setIsShowUsers(true);
    }
  }

  const filteredProperties = properties.filter(
    (property) => property.campaign === null
  );
  console.log("properties", properties);
  console.log("userCampaigns", userCampaigns);

  const handleAssignCampaign = async (campaignId) => {

    const selectedCampaign = userCampaigns.find(campaign => campaign.id === campaignId);
    if (!selectedCampaign) {
      toast.error("No se encontró la campaña seleccionada.");
      return;
    }

    const productID = selectedCampaign.products?.items?.[0]?.id || null;
    if (!productID) {
      toast.error("No se encontró un producto asociado a la campaña.");
      return;
    }

    if (!productID) {
      toast.error("No se encontró un producto asociado a la campaña.");
      return;
    }

    if (!selectedProperty) {
      toast.error("No se ha seleccionado ningún predio.");
      return;
    }

    if (selectedProperty.status !== "SELECTABLE") {
      toast.error("El predio aún no es elegible.");
      return;
    }

    try {
      await API.graphql(
        graphqlOperation(updateProperty, {
          input: {
            id: selectedProperty.id,
            campaignID: campaignId,
            productID: productID
          },
        })
      );

      const notificationData = {
        userOriginID: user.id,  // Usuario que asigna la campaña
        userID: selectedProperty.userID,  // Dueño del predio
        message: `Tu predio ha sido asignado a la campaña: ${selectedCampaign.name}`, 
        type: "CAMPAING",
        resourceID: campaignId,  // ID de la campaña
        isRead: false,
      };
      await API.graphql(graphqlOperation(createNotification, { input: notificationData }));

      toast.success(`Predio asignado a campaña exitosamente`);
      fetchProperties();
    } catch (error) {
      toast.error("Error al actualizar el estado del predio");
    }
    console.log(
      "Asignar a campaña predio:",
      selectedProperty.id,
      "con ID de campaña:",
      campaignId
    );
    // Aquí puedes agregar la lógica para asignar la propiedad a la campaña
  };

  console.log("selectedProperty", selectedProperty)
  console.log("userCampaigns", userCampaigns)
  return (
    <>
      <NewHeaderNavbar
        logOut={logOut}
        changeHeaderNavBarRequest={changeHeaderNavBarRequest}
      />

      {/* 📌 Sección principal */}
      <section className="max-w-6xl mx-auto py-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📌 Mis Campañas
        </h2>

        {userCampaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-gray-100 rounded-lg shadow-md">
            <img src={vacio} className="w-40 h-40 mb-4" alt="Sin campañas" />
            <p className="text-gray-600 text-lg mb-6">
              😔 No tienes campañas aún. ¡Crea la primera ahora!
            </p>
            <button
              onClick={() => navigate("/new_campaign")}
              className="bg-blue-500 text-white text-lg px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
               Crear Campaña
            </button>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              Mis Campañas
            </h2>

            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {userCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="transform transition-transform hover:scale-105"
                  >
                    <CampaignCard campaign={campaign} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 📌 Propiedades sin campaña */}
      <section className="max-w-6xl mx-auto py-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📌 Predios sin campaña
        </h2>

        {filteredProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-gray-100 rounded-lg shadow-md">
            <img src={vacio} className="w-40 h-40 mb-4" alt="Sin propiedades" />
            <p className="text-gray-600 text-lg mb-6">
              😔 No hay propiedades disponibles.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-left px-4 py-2">Nombre</th>
                  <th className="text-left px-4 py-2">Descripción</th>
                  <th className="text-left px-4 py-2">Área</th>
                  <th className="text-left px-4 py-2">Departamento</th>
                  <th className="text-left px-4 py-2">Estado</th>
                  <th className="text-left px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{property.name}</td>
                    <td className="px-4 py-2">
                      {property.description || "Sin descripción"}
                    </td>
                    <td className="px-4 py-2">
                      {getPropertyArea(property) || "No disponible"}
                    </td>
                    <td className="px-4 py-2">
                      {property.department || "No disponible"}
                    </td>
                    <td className="px-4 py-2">
                      {stateMapper[property.status].label || "No disponible"}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        className="border border-blue-500 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                        onClick={() => {
                          setSelectedProperty(property);
                          setIsModalOpen(true);
                        }}
                      >
                        Asignar a Campaña
                      </button>
                      <button
                        onClick={() => navigate(`/property/${property.id}`)}
                        className="border border-yellow-500 bg-yellow-500 text-white rounded-md px-4 py-2 hover:bg-yellow-600 active:bg-yellow-700"
                      >
                        Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Modal para asignar campaña */}
      <CampaignAssignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        campaigns={userCampaigns}
        onAssign={handleAssignCampaign}
      />
      <ToastContainer position="bottom-right" />
    </>
  );
}
