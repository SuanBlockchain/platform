import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
        console.log("campaignData", campaignData);
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
                    <p className="fs-3 mb-0">{projectData.projectInfo.title}</p>
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
                  <section>
                    <p className="fs-6 mb-0 fw-bold">Pertenece a la campaña:</p>
                    <p className="fs-6 mb-0">
                      {campaign.name}
                    </p>
                  </section>
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
                      <p className="fs-6 mb-0 fw-bold">Validadores:</p>
                      <div className="flex gap-2">
                        {projectData.projectVerifierNames.map((pvn, index) => {
                          return (
                            <div
                              className="bg-blue-500 text-xs text-white font-bold px-4 py-2 rounded-md text-nowrap "
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
                      {(autorizedUser || isPostulant || isAdmon) &&
                        (!progressObj?.sectionsStatus.projectInfo ||
                          !progressObj?.sectionsStatus.geodataInfo) && (
                          <HourGlassIcon className="text-danger ms-2" />
                        )}
                    </a>
                  </li>
                  {(isVerifier || isAdmon || isPostulant) && !isAnalyst && (
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
                  )}

                  {(isVerifier || isAdmon) && !isAnalyst && (
                    <>
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
                    </>
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
                  {(isVerifier || isAdmon || isAnalyst) && (
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
              <ProjectFiles visible={activeSection === "files"} />
              <FinanceCard visible={activeSection === "finance"} />
              <ProjectSettings
                visible={
                  activeSection === "settings" && (isVerifier || isAdmon)
                }
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
