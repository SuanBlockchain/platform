import React from "react";
// Import hooks
import useUserProjects from "hooks/useUserProjects";
import useUserProperties from "hooks/useUserProperties";
import useUserCampaigns from "hooks/useUserCampaigns";
// Import utilities
import { getImagesCategories, getYearFromAWSDatetime } from "../ProjectPage/utils";
// Import placeholder image
import vacio from "../../views/_images/caja-vacia-gris.png";

// Status color mapping
const statusColor = {
  PENDING: "bg-gray-600",
  APPROVED: "bg-green-600",
  REJECTED: "bg-red-600",
} 
const statusEs = {
  PENDING: "Pendiente",
  APPROVED: "Aprobado",
  REJECTED: "Rechazado",
} 
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
        <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded" style={{backgroundColor:"#74742c"}}>
          {getYearFromAWSDatetime(campaign?.products?.items?.[0]?.createdAt)}
        </span>
        <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded" style={{backgroundColor:"#74742c"}}>
          {campaign?.products?.items?.[0]?.categoryID}
        </span>
      </div>
      <h3 className="text-lg font-bold mb-2">{campaign?.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{campaign?.description}</p>
      <div className="flex justify-between items-center mt-3 space-x-4">
        <a
          href={`campaign/${campaign?.id}`}
          className="inline-block bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600"
          style={{backgroundColor:"#74742c"}}
        >
          Ver Campaña
        </a>
        <a
    href={`project/${campaign?.products?.items?.[0]?.id}`}
    className="inline-block bg-[#4DBC5E] text-white text-sm px-4 py-2 rounded hover:bg-green-600"
  >
    Ver Proyecto
  </a>
      </div>
    </div>
  </div>
</div>

  );
};

// Property card component
const PropertyCard = ({ property }) => (
  <div className="p-4">
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{property?.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{property?.campaign?.name}</p>
        <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-[#9a9a56] text-white text-xs font-medium px-2 py-1 rounded w-fit">
  {getYearFromAWSDatetime(property?.createdAt)}
</span>
<span className="bg-[#9a9a56] text-white text-xs font-medium px-2 py-1 rounded w-fit">
  Vinculado a campaña
</span>

          <span className={`${statusColor[property.status]} text-white text-xs font-medium px-2 py-1 rounded w-fit`}>
            {statusEs[property.status]}
          </span>
        </div>
        <a
  href={`property/${property?.id}`}
  className="w-full inline-flex bg-[#74742c] text-white text-sm justify-center font-bold px-4 py-2 rounded hover:bg-[#5f5f23]"
>
  Ver más
</a>

      </div>
    </div>
  </div>
);

// Project card component
const ProjectCard = ({ project }) => (
  <div className="p-4">
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        className="h-40 w-full object-cover"
        src={getImagesCategories(project?.product?.categoryID)}
        alt="Imagen del proyecto"
      />
      <div className="p-4">
        <div className="flex space-x-2 mb-2">
          <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
            {getYearFromAWSDatetime(project?.product?.createdAt)}
          </span>
          <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
            {project?.product?.categoryID}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2">{project?.product?.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{project?.product?.description}</p>
        <a
          href={`project/${project?.product?.id}`}
          className="inline-block bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600"
        >
          Ver más
        </a>
      </div>
    </div>
  </div>
);

// Main component
export default function ProductsList() {
  const { userProjects } = useUserProjects();
  const { userProperties } = useUserProperties();
  const { userCampaigns } = useUserCampaigns();
  
  const projectsWithoutCampaigns = userProjects.filter(
    (project) => project.product && !project.product.campaign
  );

  const userProjectsFiltered = projectsWithoutCampaigns.filter(
    (project) => project.product?.isActiveOnPlatform
  );

  

  console.log("userCampaigns",userCampaigns)
  console.log("userProjects",userProjects)
  console.log("userProperties",userProperties)

  return (
    <>
     {/*
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Tus Campañas</h2>
        {userCampaigns.length === 0 ? (
          <div className="py-12 text-center">
            <img
              src={vacio}
              className="w-32 h-32 mx-auto mb-4"
              alt="Sin campañas"
            />
            <p className="text-gray-500 mb-4">
              No tienes campañas aún. Para crear la primera, da click en Crear Campaña.
            </p>
            <a
              href="/new_campaign"
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600"
              style={{backgroundColor:"#74742c"}}
            >
              Crear Campaña
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </section>
      */}

 {userProperties.length > 0 && (
  <section className="mt-8">
    {/* Contenedor estilizado */}
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Título con mayor peso y espaciado */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
         Tus Predios Postulados
      </h2>

      {/* Contenedor con efecto "tarjeta" para mayor estética */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userProperties.map((property) => {
          console.log("Property:", property); // Depuración de la propiedad
          return <PropertyCard key={property.id} property={property} />;
        })}
      </div>
    </div>
  </section>
)}


      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center"></h2>
        {userProjectsFiltered.length === 0 ? (
          <div></div>
          /* <div className="py-12 text-center">
            <img
              src={vacio}
              className="w-32 h-32 mx-auto mb-4"
              alt="Sin proyectos"
            />
            <p className="text-gray-500 mb-4">
              No tienes proyectos aún. Para crear el primero, da click en Postular Proyecto.
            </p>
            <a
              href="/new_project"
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600"
            >
              Postular Proyecto
            </a>
          </div> */
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProjectsFiltered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
