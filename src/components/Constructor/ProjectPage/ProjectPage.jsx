import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Auth } from "aws-amplify";
// Sections
import ProjectDetails from "./ProjectDetails/ProjectDetails";
import ProjectFiles from "./ProjectFiles/ProjectFiles";
import ProjectSettings from "./ProjectSettings/ProjectSettings";

// Components
import MiniInfoCard from "../../common/MiniInfoCard";

// Contexts
import { useProjectData } from "context/ProjectDataContext";
import { useAuth } from "context/AuthContext";
import { S3ClientProvider } from "context/s3ClientContext";
import { fetchProjectDataByProjectID } from "./api";
import { formatNumberWithThousandsSeparator } from "./utils";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";
import ProjectFileManager from "./ProjectFileManager/ProjectFileManager";
import FinanceCard from "./ProjectFiles/InfoCards/FinanceFilesCard";
import { getProjectProgress } from "services/getProjectProgress";
import { HourGlassIcon } from "components/common/icons/HourGlassIcon";
import { API, graphqlOperation } from "aws-amplify";
import ProjectAnalysis from "./ProjectAnalysis/ProjectAnalysis";
import AlertMessage from "./AlertMessage";
import { FiEdit3 } from "react-icons/fi";
import TimelineProject from "./TimeLineProject";
// Mostrar si tiene asignado validador
// Tiempo restante para verificar

const GET_PRODUCT_QUERY = `
  query MyQuery($id: ID!) {
    getProduct(id: $id) {
      id
      name
      campaign {
        name
        id
        available
      }
      campaignID
    }
  }
`;

export default function ProjectPage() {
  const { id } = useParams();
  const { projectData, handleProjectData } = useProjectData();
  const { user } = useAuth();

  const [progressObj, setProgressObj] = useState(null);
  const [activeSection, setActiveSection] = useState("details");
  const [autorizedUser, setAutorizedUser] = useState(false);
  const [isPostulant, setIsPostulant] = useState(false);
  const [isVerifier, setIsVerifier] = useState(false);
  const [isAdmon, setIsAdmon] = useState(false);
  const [isAnalyst, setIsAnalyst] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editableTitle, setEditableTitle] = useState("");
  const [campaign, setCampaign] = useState(null);
  const [userGroup, setUserGroup] = useState("");
  const projectStatusMapper = {
    draft: "En borrador",
    verified: "Verificado",
    on_verification: "En verificación",
    in_blockchain: "En blockchain",
    in_equilibrium: "En equilibrio",
    Prefactibilidad: "En Prefactibilidad",
    Factibilidad: "En Factibilidad",
    "Documento de diseño del proyecto": "En diseño de documento del proyecto",
    "Validación externa": "En validación externa",
    "Registro del proyecto": "Registrado",
  };

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
  if (!projectData || !progressObj) return;

  const {
    projectInfo,
    geodataInfo,
    technicalInfo,
    financialInfo,
    ownerAcceptsConditions,
    projectOnMarketplace,
  } = progressObj.sectionsStatus || {};

  console.log("🧠 Evaluando paso actual según reglas nuevas:", {
    campaignAvailable: campaign?.available,
    projectInfo,
    geodataInfo,
    technicalInfo,
    financialInfo,
    technicalFreeze: projectData.isTechnicalFreeze,
    financialFreeze: projectData.isFinancialFreeze,
    ownerAcceptsConditions,
    projectOnMarketplace,
  });

  let step = 2; // 🔵 Paso 2 por defecto: esperando cierre de campaña

  // 🟠 Paso 3: Campaña cerrada pero falta info
  if (
    campaign?.available === false &&
    (!projectInfo || !geodataInfo || !technicalInfo || !financialInfo)
  ) {
    step = 3;
  }

  // 🟡 Paso 4: Datos congelados, pero condiciones no aceptadas
  if (
    projectData.isTechnicalFreeze &&
    projectData.isFinancialFreeze &&
    !ownerAcceptsConditions
  ) {
    step = 4;
  }

  // 🟢 Paso 5: Proyecto publicado
  if (projectOnMarketplace) {
    step = 5;
  }

  setCurrentStep(step);
}, [projectData, progressObj, campaign?.available]);


  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.idToken.payload[
          "cognito:groups"
        ] || [""];
        setUserGroup(groups[0]);
      } catch (error) {
        console.error("Error fetching user groups: ", error);
      }
    };

    fetchUserGroups();
    const fetchProjectData = async () => {
      await handleProjectData({ pID: id });
    };
    if (id) {
      fetchProjectData();
    }
  }, [id]);

  useEffect(() => {
    if (projectData && user) {
      const verifiers = projectData.projectVerifiers;
      const postulant = projectData.projectPostulant.id;
      const authorizedUsers =
        projectData.projectInfo.projectAge < 20
          ? [...verifiers, postulant]
          : [...verifiers];
      setAutorizedUser(authorizedUsers.includes(user.id));
      setIsPostulant(postulant === user.id);
      setIsVerifier(verifiers.includes(user.id));
      setIsAdmon(user?.role === "admon");
      setIsAnalyst(user?.role === "analyst");
    }
  }, [projectData, user]);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const result = await API.graphql(
          graphqlOperation(GET_PRODUCT_QUERY, { id })
        );
        const campaignData = result?.data?.getProduct?.campaign;
        setCampaign(campaignData); // Actualiza el estado con la campaña asociada
      } catch (error) {
        console.error("Error fetching campaign data: ", error);
      }
    };

    if (id) {
      fetchCampaignData();
    }
  }, [id]);

  useEffect(() => {
    if (projectData && user) {
      const progress = async () => {
        try {
          const obj = await getProjectProgress(
            projectData?.projectInfo.id,
            user.subrole
          );
          setProgressObj(obj);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      progress();
    }
  }, [projectData, user]);

  useEffect(() => {
    if (projectData?.projectInfo?.title) {
      setEditableTitle(projectData.projectInfo.title);
    }
  }, [projectData]);

  const updateProduct = async (productId, newName) => {
    try {
      const mutation = `
        mutation UpdateProduct($input: UpdateProductInput!) {
          updateProduct(input: $input) {
            id
            name
          }
        }
      `;
      const input = {
        id: productId,
        name: newName,
      };
      const response = await API.graphql(graphqlOperation(mutation, { input }));
      return response;
    } catch (error) {
      console.error("Error actualizando el producto:", error);
      throw error;
    }
  };

  const checkDuplicateProjectName = async (name) => {
    try {
      const query = `
        query GetProjectsByName($name: String!) {
          listProducts(filter: { name: { eq: $name } }) {
            items {
              id
              name
            }
          }
        }
      `;
      const response = await API.graphql(graphqlOperation(query, { name }));
      return response.data.listProducts.items; // Devuelve los proyectos que coincidan
    } catch (error) {
      console.error("Error verificando nombres duplicados:", error);
      throw error;
    }
  };

  return (
    <S3ClientProvider>
      <div>
        {projectData ? (
          <div className="container-sm">
            <div className="mb-5">
              <NewHeaderNavbar></NewHeaderNavbar>
            </div>
            <div className="my-2">-</div>
            <div>
              <div className="pt-3 px-4 mb-4 mt-4 border rounded shadow">
                <div className="row gy-2">
                  <header className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      {isEditingTitle ? (
                        <div className="d-flex align-items-center gap-2">
                          <input
                            type="text"
                            className="form-control fs-3"
                            value={editableTitle}
                            onChange={(e) => setEditableTitle(e.target.value)}
                          />
                          <button
                            className="btn btn-success"
                            onClick={async () => {
                              try {
                                if (editableTitle.trim() === "") {
                                  toast.error(
                                    "El título no puede estar vacío."
                                  );
                                  return;
                                }
                                const duplicates =
                                  await checkDuplicateProjectName(
                                    editableTitle
                                  );
                                if (
                                  duplicates.length > 0 &&
                                  duplicates[0].id !==
                                    projectData.projectInfo.id
                                ) {
                                  toast.error(
                                    "El nombre del proyecto ya existe. Elige otro."
                                  );
                                  setEditableTitle(
                                    projectData.projectInfo.title
                                  );
                                  return;
                                }

                                await updateProduct(
                                  projectData.projectInfo.id,
                                  editableTitle
                                );
                                await handleProjectData({
                                  pID: projectData.projectInfo.id,
                                });
                                toast.success(
                                  "Título actualizado exitosamente"
                                );
                              } catch (error) {
                                console.error(
                                  "Error actualizando el título:",
                                  error
                                );
                                toast.error(
                                  "Error al actualizar el título. Intenta nuevamente."
                                );
                              } finally {
                                setIsEditingTitle(false);
                              }
                            }}
                          >
                            Confirmar
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setEditableTitle(projectData.projectInfo.title);
                              setIsEditingTitle(false);
                            }}
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="fs-3 mb-0">{editableTitle}</p>
                          {isPostulant && (
                            <button
                              className="bg-transparent border-0 p-0"
                              onClick={() => setIsEditingTitle(true)}
                              title="Editar título"
                            >
                              <FiEdit3 size={20} color="gray" />
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {projectData.projectInfo.status && (
                        <div className="bg-blue-500 text-xs text-white font-bold px-4 py-2 rounded-md text-nowrap h-8">
                          {projectStatusMapper[projectData.projectInfo.status]}
                        </div>
                      )}
                      <div
                        className={`${
                          projectData.projectVerifiers?.length > 0
                            ? "bg-green-600"
                            : "bg-red-500"
                        } text-xs text-white font-bold px-4 py-2 rounded-md text-nowrap h-8`}
                      >
                        {projectData.projectVerifiers?.length > 0
                          ? "Consultor asignado"
                          : "Sin consultor"}
                      </div>
                    </div>
                  </header>

                  <section>
                    <p className="fs-6 mb-0 fw-bold">Fecha de creación:</p>
                    <p className="fs-6 mb-0">
                      {projectData.projectInfo.createdAt}
                    </p>
                  </section>
                  <section>
                    <p className="fs-6 mb-0 fw-bold">Descripción:</p>
                    <p className="fs-6 mb-0">
                      {projectData.projectInfo.description}
                    </p>
                  </section>
                  {campaign && (
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div>
                        <p className="fs-6 mb-0 fw-bold">
                          Pertenece a la campaña:
                        </p>
                        <p className="fs-6 mb-0">{campaign.name}</p>
                      </div>
                      <div className="w-75">
                        <TimelineProject
                          currentStep={currentStep}
                          onStepChange={(step) => setCurrentStep(step)}
                        />
                      </div>
                    </div>
                  )}

                  {projectData.projectInfo.token.actualPeriodTokenAmount &&
                    projectData.projectInfo.token.actualPeriodTokenPrice && (
                      <section>
                        <p className="fs-6 mb-0 fw-bold">Tokenomics:</p>
                        <div className="d-flex">
                          {/* {projectData.projectInfo.token.name && (
                        <MiniInfoCard
                          label="Nombre del token"
                          value={projectData.projectInfo.token.name}
                          className="me-2 bg-dark text-white"
                        />
                      )} */}
                          {projectData.projectInfo.token
                            .actualPeriodTokenAmount && (
                            <MiniInfoCard
                              label="Cantidad de tokens"
                              value={formatNumberWithThousandsSeparator(
                                projectData.projectInfo.token.totalTokenAmount
                              )}
                              className="me-2 bg-dark text-white"
                            />
                          )}
                          {projectData.projectInfo.token
                            .actualPeriodTokenPrice && (
                            <MiniInfoCard
                              label="Valor del token"
                              value={
                                projectData.projectInfo.token
                                  .actualPeriodTokenPrice +
                                " " +
                                projectData.projectInfo.token.currency
                              }
                              className="me-2 bg-dark text-white"
                            />
                          )}
                        </div>
                      </section>
                    )}
                  <section>
                    <div className="flex gap-2">
                      <div
                        className={`${
                          projectData.projectInfo.isActive
                            ? "bg-green-600"
                            : "bg-red-500"
                        } text-xs text-white font-bold px-4 py-2 rounded-md text-nowrap`}
                      >
                        {projectData.projectInfo.isActive
                          ? "Publicado en marketplace"
                          : "No publicado en marketplace"}
                      </div>
                    </div>
                  </section>
                  {projectData.projectVerifierNames.length > 0 && (
                    <section>
                      <p className="fs-6 mb-0 fw-bold">Consultores:</p>
                      <div className="flex gap-2">
                        {projectData.projectVerifierNames.map((pvn, index) => {
                          return (
                            <div
                              className="bg-blue-500 text-xs text-white font-bold px-4 py-2 rounded-md"
                              key={index}
                            >
                              Consultor {index + 1}: {pvn}
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  )}
                </div>

                <ul className="font-medium flex flex-wrap gap-2 mt-4 pl-0 justify-center md:justify-start">
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
                      {(autorizedUser || isPostulant || isAdmon) &&
                        (!progressObj?.sectionsStatus.projectInfo ||
                          !progressObj?.sectionsStatus.geodataInfo) && (
                          <HourGlassIcon className="text-danger ms-2" />
                        )}
                    </a>
                  </li>
                  {/* {(isVerifier || isAdmon || isPostulant) && !isAnalyst && (
                    <li>
                      <a
                        href="#files"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection("files");
                        }}
                        className={`${
                          activeSection === "files"
                            ? "text-black border-t border-r border-l border-gray-400  rounded-t-md"
                            : "text-blue-500"
                        } flex py-2 px-3`}
                      >
                        Validación
                        {(autorizedUser || isPostulant || isAdmon) &&
                          !progressObj?.sectionsStatus.validationsComplete && (
                            <HourGlassIcon className="text-danger ms-2" />
                          )}
                      </a>
                    </li>
                  )} */}

                  {(isVerifier || isAdmon || isAnalyst) && (
                    <li>
                      <a
                        href="#file_manager"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection("file_manager");
                        }}
                        className={`${
                          activeSection === "file_manager"
                            ? "text-black border-t border-r border-l border-gray-400  rounded-t-md"
                            : "text-blue-500"
                        } flex py-2 px-3`}
                      >
                        Sistema de datos
                      </a>
                    </li>
                  )}

                  {(isVerifier || isAdmon) && (
                    <li>
                      <a
                        href="#settings"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection("settings");
                        }}
                        className={`${
                          activeSection === "settings"
                            ? "text-black border-t border-r border-l border-gray-400  rounded-t-md"
                            : "text-blue-500"
                        } py-2 px-3 flex`}
                      >
                        Configuración
                        {(autorizedUser || isAdmon) &&
                          (!progressObj?.sectionsStatus.technicalInfo ||
                            !progressObj?.sectionsStatus.financialInfo) && (
                            <HourGlassIcon className="text-danger ms-2" />
                          )}
                      </a>
                    </li>
                  )}

                  {user?.id &&
                    (isPostulant || isVerifier || isAdmon) &&
                    projectData.isFinancialFreeze &&
                    projectData.isTechnicalFreeze && (
                      <li>
                        <a
                          href="#finance"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveSection("finance");
                          }}
                          className={`${
                            activeSection === "finance"
                              ? "text-black border-t border-r border-l border-gray-400  rounded-t-md"
                              : "text-blue-500"
                          } flex py-2 px-3`}
                        >
                          Finanzas
                          {(autorizedUser || isPostulant || isAdmon) &&
                            !progressObj?.sectionsStatus
                              .ownerAcceptsConditions && (
                              <HourGlassIcon className="text-danger ms-2" />
                            )}
                        </a>
                      </li>
                    )}
                  {(isAdmon || isAnalyst) && (
                    <li>
                      <a
                        href="#analysis"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection("analysis");
                        }}
                        className={`${
                          activeSection === "analysis"
                            ? "text-black border-t border-r border-l border-gray-400  rounded-t-md"
                            : "text-blue-500"
                        } flex py-2 px-3`}
                      >
                        Análisis
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <AlertMessage />
              <ProjectDetails visible={activeSection === "details"} />
              <ProjectFileManager
                visible={activeSection === "file_manager"}
                userGroup={userGroup}
              />
              {/* <ProjectFiles visible={activeSection === "files"} /> */}
              <FinanceCard visible={activeSection === "finance"} />
              <ProjectSettings
  visible={activeSection === "settings" && (isVerifier || isAdmon)}
  campaign={campaign}
              />
              <ProjectAnalysis
                visible={activeSection === "analysis"}
              ></ProjectAnalysis>
            </div>
            <ToastContainer></ToastContainer>
          </div>
        ) : (
          <p>Loading or no data available</p>
        )}
      </div>
    </S3ClientProvider>
  );
}
