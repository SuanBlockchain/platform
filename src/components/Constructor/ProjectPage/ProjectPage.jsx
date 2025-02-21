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
import {
  HorizontalList,
  StatusBubble,
  MenuBar,
  DaysLeft,
} from "suan-components-lib";
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
      console.log("Producto actualizado:", response);
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
            <div className="my-4">-</div>
            <div className="flex space-x-4 mb-4">
              <div className="flex-col">
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                  <div className="flex-1 flex-col p-4 bg-white rounded-3xl rounded-tl-none">
                    <p className="text-2xl font-semibold">
                      {projectData.projectInfo.title}
                    </p>
                    <hr />
                    <div className="space-y-4">
                      <section>
                        <p className="text-sm mb-0 fw-bold">
                          Fecha de creación:
                        </p>
                        <p className="text-sm mb-0">
                          {projectData.projectInfo.createdAt}
                        </p>
                      </section>
                      {/* Token Name */}
                      <section>
                        <div className="flex justify-between p-3 bg-black rounded-2xl rounded-tl-none">
                          <p className="flex-none text-xl text-white font-semibold mb-0">
                            Tokenomics:
                          </p>
                          <p className="flex-1 text-xl text-center text-white font-bold mb-0">
                            SUAN-B138E 07BDFDD
                          </p>
                        </div>
                      </section>
                      {/* Validadores */}
                      <section>
                        <h2 className="text-lg font-bold mb-2">Validadores</h2>
                        <div>
                          <div className="h-0.5 w-full bg-black"></div>
                          <div className="flex flex-wrap gap-4 text-xs">
                            {projectData.projectVerifierNames.map(
                              (pvn, index) => {
                                return (
                                  <div className="flex flex-col items-center">
                                    <div className="h-4 w-0.5 bg-black"></div>
                                    <div className="from-green-600 to-green-800 bg-gradient-to-b text-white font-semibold rounded-full rounded-tl-none px-4 py-2 shadow-md hover:scale-125 transition-transform">
                                      {pvn}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </section>
                    </div>

                    {/* <section>
                      <HorizontalList
                        validators={[
                          "Moxie Validador",
                          "Carlos Validador",
                          "Santiago Validador",
                        ]}
                      />
                    </section> */}
                  </div>
                  <div className="flex-1 flex-col p-4 bg-white rounded-3xl rounded-tr-none">
                    <div className="flex space-x-2 mb-2">
                      <div className="bg-black text-white text-xs font-medium rounded-lg px-4 py-2">
                        En Prefactibilidad
                      </div>
                      <div className="bg-[#53d232] text-white text-xs font-medium rounded-lg px-4 py-2">
                        Validador asignado
                      </div>
                      {/* <StatusBubble /> */}
                    </div>
                    <p className="text-2xl font-semibold">
                      Descripción del proyecto
                    </p>
                    <hr />
                    <div className="h-56 overflow-y-auto px-4">
                      <p className="text-xs mb-0 text-wrap text-gray-500 leading-3">
                        Lorem Ipsum es simplemente el texto de relleno de las
                        imprentas y archivos de texto. Lorem Ipsum ha sido el
                        texto de relleno estándar de las industrias desde el año
                        1500, cuando un impresor (N. del T. persona que se
                        dedica a la imprenta) desconocido usó una galería de
                        textos y los mezcló de tal manera que logró hacer un
                        libro de textos especimen. No sólo sobrevivió 500 años,
                        sino que tambien ingresó como texto de relleno en
                        documentos electrónicos, quedando esencialmente igual al
                        original. Fue popularizado en los 60s con la creación de
                        las hojas "Letraset", las cuales contenian pasajes de
                        Lorem Ipsum, y más recientemente con software de
                        autoedición, como por ejemplo Aldus PageMaker, el cual
                        incluye versiones de Lorem Ipsum.Lorem Ipsum es
                        simplemente el texto de relleno de las imprentas y
                        archivos de texto. Lorem Ipsum ha sido el texto de
                        relleno estándar de las industrias desde el año 1500,
                        cuando un impresor (N. del T. persona que se dedica a la
                        imprenta) desconocido usó una galería de textos y los
                        mezcló de tal manera que logró hacer un libro de textos
                        especimen. No sólo sobrevivió 500 años, sino que tambien
                        ingresó como texto de relleno en documentos
                        electrónicos, quedando esencialmente igual al original.
                        Fue popularizado en los 60s con la creación de las hojas
                        "Letraset", las cuales contenian pasajes de Lorem Ipsum,
                        y más recientemente con software de autoedición, como
                        por ejemplo Aldus PageMaker, el cual incluye versiones
                        de Lorem Ipsum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden h-full lg:flex p-4 bg-white rounded-3xl rounded-tr-none"></div>
            </div>
            {/* Menu Bar */}
            {/* <div className="flex w-full items-center bg-[#151515] p-8 rounded-3xl rounded-tr-none">
              <div className="flex items-center">
                <button className="flex items-center px-8 py-2 bg-[#2a2a2a] text-gray-300 rounded-xl rounded-tr-none hover:bg-[#727272] hover:text-white transition-colors focus:ring-2 focus:ring-yellow-400"></button>
              </div>
            </div> */}
            <MenuBar
              items={[
                {
                  label: "Detalles",
                  onClick: () => {},
                },
                {
                  icon: (
                    <svg
                      className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-10"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 12l-3 -2" />
                      <path d="M12 7v5" />
                    </svg>
                  ),
                  label: "Validación",
                  onClick: () => {},
                },
                {
                  label: "Sistema de datos",
                  onClick: () => {},
                },
                {
                  label: "Configuración",
                  onClick: () => {},
                },
              ]}
            />
            <div className="flex-col rounded-[40px] rounded-tr-none p-8 bg-[#FF5800] text-white mt-4">
              <p className="text-xl font-semibold mb-0">Hola, {user?.name}</p>
              <p className="text-sm">
                Podras realizar ajustes a la información del proyecto durante
                los primeros 20 dias despues de su postulación. Posterior a esto
                se congelan los cambios a menos que exista solicitud formal y se
                abra manualmente en casos excepcionales.
              </p>
              <DaysLeft size="sm" daysLeft="20" />
            </div>
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
                    <section>
                      <p className="fs-6 mb-0 fw-bold">
                        Pertenece a la campaña:
                      </p>
                      <p className="fs-6 mb-0">{campaign.name}</p>
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
