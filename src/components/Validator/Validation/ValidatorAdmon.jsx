import React, { useState } from "react";
import useUserCampaigns from "hooks/useUserCampaigns";
import vacio from "../../views/_images/caja-vacia-gris.png";
import { getImagesCategories, getYearFromAWSDatetime  } from "components/Constructor/ProjectPage/utils";
import HeaderNavbar from "components/Investor/Navbars/HeaderNavbar";
import {  Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";


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
          <span className="bg-[#74742c] text-white text-xs font-medium px-2 py-1 rounded">
  {getYearFromAWSDatetime(campaign?.products?.items?.[0]?.createdAt)}
</span>
<span className="bg-[#74742c] text-white text-xs font-medium px-2 py-1 rounded">
  {campaign?.products?.items?.[0]?.categoryID}
</span>

          </div>
          <h3 className="text-lg font-bold mb-2">{campaign?.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{campaign?.description}</p>
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

// Componente principal que muestra la lista de campañas
export default function ValidatorAdmon() {
  const { userCampaigns } = useUserCampaigns();
  const [isShowProductDocuments, setIsShowProductDocuments] = useState(true);
  const [isShowUsers, setIsShowUsers] = useState(false);
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


  return (
    <>
      <HeaderNavbar logOut={logOut} changeHeaderNavBarRequest={changeHeaderNavBarRequest} />

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
        <div key={campaign.id} className="transform transition-transform hover:scale-105">
          <CampaignCard campaign={campaign} />
        </div>
      ))}
    </div>
  </div>
          </div>

        )}
      </section>
    </>
  );
}
