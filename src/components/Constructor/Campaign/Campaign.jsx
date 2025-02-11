import React, { useEffect, useState } from "react";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";
import { useNavigate, useParams } from "react-router";
import Card from "components/common/Card";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { getCampaign } from "utilities/customQueries";
import { FiEdit3 } from "react-icons/fi";
import PropertiesTable from "./PropertiesTable";
import ModalEditCampaign from "./ModalEditCampaign";
import ModalEndCampaign from "./ModalEndCampaign";
import ModalAcceptProperty from "./ModalAcceptProperty";
import ModalLogin from "./ModalLogin";
import ModalNewProperty from "./ModalNewProperty";
import { toast, ToastContainer } from "react-toastify";
import { formatArea } from "../ProjectPage/mappers";
import { onUpdateProperty } from "graphql/subscriptions";
import { WindowFullscreen } from "react-bootstrap-icons";
import ModalEditImage from "./ModalEditImage";
import Imagen from "../../common/_images/Campaña.png";


export default function Campaign() {
  const [campaign, setCampaign] = useState(null);
  const [editable, setEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [showModalNewProperty, setShowModalNewProperty] = useState(false);
  const [showModalEndCampaign, setShowModalEndCampaign] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false)
  const [projectVerifiers, setProjectVerifiers] = useState([]);
  const [showModalEditImage, setShowModalEditImage] = useState(false);
  const [registeredProperties, setRegisteredProperties] = useState(0);
  const [chosenProperties, setChosenProperties] = useState(0);
  const [totalChosenProperties, setTotalChosenProperties] = useState(0);

  const handleCloseNewProperty = () => setShowModalNewProperty(false);
  const handleShowNewProperty = () => setShowModalNewProperty(true);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleShowEditImage = () => setShowModalEditImage(true);
const handleCloseEditImage = () => setShowModalEditImage(false);

  const handleCloseEndCampaign = () => setShowModalEndCampaign(false);
  const handleShowEndCampaign = () => setShowModalEndCampaign(true);
  const handleCloseLogin = () => setShowModalLogin(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleClickSeeProject = async (id) =>{
    try {
      await Auth.currentAuthenticatedUser()
      navigate(`/project/${id}`)
    } catch (error) {
      setShowModalLogin(true)
    }
  }
  const fetchCampaign = async () => {
    try {
      const data = await API.graphql(graphqlOperation(getCampaign, { id }));

      console.log(data.data.getCampaign);
      setCampaign(data.data.getCampaign);
      const campaign = data.data.getCampaign;
      const product = campaign.products.items[0];

      const projectVerifiers = product?.userProducts?.items
        .filter((up) => up.user?.role === "validator")
        .map((userProduct) => {
          return { id: userProduct.user.id, name: userProduct.user.name };
        });
      console.log("campaign", campaign);
      setRegisteredProperties(campaign.properties.items.length);
      setChosenProperties(
        campaign.properties.items.filter((camp) => camp.status === "APPROVED")
          .length
      );
      // Inicializamos la suma total
      let totalDArea = 0;

      // Recorremos cada propiedad
      campaign.properties.items
        .filter((camp) => camp.status === "APPROVED")
        .forEach((property) => {
          // Obtenemos las características de cada propiedad
          const features = property.propertyFeatures?.items || [];

          // Filtramos las características que tienen `featureID` igual a "D_area"
          const dAreaFeatures = features.filter(
            (feature) => feature.featureID === "D_area"
          );

          // Sumamos los valores de estas características
          dAreaFeatures.forEach((feature) => {
            totalDArea += parseFloat(feature.value) || 0; // Convertimos `value` a número para evitar errores
          });
        });

      setTotalChosenProperties(formatArea(totalDArea));

      const isAuthorResult = await isAuthor([
        data?.data?.getCampaign?.userID,
        ...projectVerifiers?.map((pv) => pv.id),
      ]);
      setEditable(isAuthorResult);
      setProjectVerifiers(projectVerifiers);
    } catch (error) {
      console.error("Error fetching campaign:", error);
    }
  };
  useEffect(() => {
    fetchCampaign();
  }, []);
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateProperty)
    ).subscribe({
      next: () => {
        fetchCampaign();
      },
      error: (err) => console.error("Error in subscription", err),
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [campaign?.id]);

  const isAuthor = async (ids) => {
    try {
      const userLogged = await Auth.currentAuthenticatedUser();
      setUserLogged(userLogged);

      // Verificar si el ID del usuario autenticado está en el array de IDs
      if (userLogged && ids.includes(userLogged.attributes.sub)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  if (!campaign) return null;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  };
  const redirectToLoginPage = (id) => {
    const redirectArray = ["campaign", id];
    window.sessionStorage.setItem("redirect_after_login", JSON.stringify(redirectArray));
    navigate("/login");
  };  
  return (
    <div className="container mx-auto px-4">
      <div className="mb-24">
        <NewHeaderNavbar />
      </div>
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <Card.Body className="p-6">
          <article className="flex flex-col lg:flex-row gap-8">
          <div className="relative w-full lg:w-1/2 flex justify-center items-center">
  <img
    src={
      campaign.images && JSON.parse(campaign.images).length > 0
        ? JSON.parse(campaign.images)[0] 
        : Imagen 
    }
    alt="Imagen de la campaña"
    className="object-cover w-full h-auto rounded-lg shadow-md"
  />
  {editable && (
    <button
      onClick={handleShowEditImage}
      className="absolute top-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl transition"
    >
      <FiEdit3 size={28} /> {/* Ícono más grande */}
    </button>
  )}
</div>


            <section className="w-full lg:w-1/2 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-4">
                  {campaign.name}
                  {editable && (
                    <FiEdit3
                      onClick={handleShow}
                      className="text-gray-600 hover:text-gray-800 transition cursor-pointer"
                    />
                  )}
                </h1>
                <p className="text-lg text-gray-500 mb-2">
                  Hasta{" "}
                  <span className="font-semibold">
                    {formatDate(campaign.endDate)}
                  </span>
                </p>
                <p className="text-md text-gray-600 mb-6">
                  {campaign.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-100 p-6 rounded-lg shadow-md">
                {[
                  { label: "Predios Inscritos", value: registeredProperties },
                  { label: "Predios Elegidos", value: chosenProperties },
                  { label: "Área Total Elegida", value: totalChosenProperties },
                ].map(({ label, value }, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow border border-gray-200 text-center"
                  >
                    <h2 className="text-lg font-semibold text-gray-700">
                      {label}
                    </h2>
                    <p
                      className="mt-3 font-extrabold text-blue-600"
                      style={{
                        fontSize: `clamp(1rem, ${Math.min(
                          4 / `${value}`.length,
                          1.5
                        )}rem, 2.5rem)`,
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        maxWidth: "100%",
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                {campaign.available ? (
                  <button
                    onClick={() => 
                      editable
                        ? handleShowEndCampaign()
                        : userLogged
                        ? handleShowNewProperty()
                        : redirectToLoginPage(campaign.id)
                    }
                    className={`w-full lg:w-3/6 py-3 font-semibold rounded-md text-white shadow-md transition-all duration-300 ${
                      editable
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {editable ? "Cerrar convocatoria ahora" : "Postular predio"}
                  </button>
                ) : (
                  <>
                    <div className="bg-gray-400 py-3 font-semibold text-white text-center rounded-md shadow-md">
                      Convocatoria cerrada
                    </div>
                    <button
                      onClick={() =>
                        handleClickSeeProject(campaign.products.items[0].id)
                      }
                      className="w-full lg:w-3/6 mt-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition-all"
                    >
                      Ver proyecto
                    </button>
                  </>
                )}
              </div>
            </section>
          </article>

          {projectVerifiers.length > 0 && (
            <section className="mt-8">
              <h3 className="text-md font-semibold text-[#74742c] mb-4">
  Validador de la campaña
</h3>

              <div className="flex flex-wrap gap-3">
                {projectVerifiers.map((pvn, index) => (
                  <div
                    key={index}
                      className="bg-[#74742c] text-white text-sm font-medium px-4 py-2 rounded-md shadow"
                  >
                    Consultor {index + 1}: {pvn.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {campaign.properties.items.length > 0 && userLogged && (
            <>
              <h2 className="text-2xl text-gray-700 font-semibold mt-10 mb-6">
                Predios postulados
              </h2>
              <PropertiesTable editable={editable} />
            </>
          )}
        </Card.Body>
      </Card>

      <ModalEditCampaign
        showModal={showModal}
        handleClose={handleClose}
        campaign={campaign}
        fetchCampaign={fetchCampaign}
      />
      <ModalEndCampaign
        campaign={campaign}
        fetchCampaign={fetchCampaign}
        showModalEndCampaign={showModalEndCampaign}
        handleCloseEndCampaign={handleCloseEndCampaign}
      />
      <ModalNewProperty
        showModal={showModalNewProperty}
        handleClose={handleCloseNewProperty}
        campaignId={campaign.id}
        productId={campaign.products.items[0].id}
        fetchCampaign={fetchCampaign}
      />
      <ModalLogin
        showModal={showModalLogin} 
        handleClose={handleCloseLogin}
      />
      <ModalEditImage
  show={showModalEditImage}
  handleClose={handleCloseEditImage}
  campaignId={campaign.id}
  fetchCampaign={fetchCampaign}
/>

      <ToastContainer />
    </div>
  );
}
