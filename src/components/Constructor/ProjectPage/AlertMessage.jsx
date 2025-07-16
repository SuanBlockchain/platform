import React, { useEffect, useState } from "react";
import { useProjectData } from "../../../context/ProjectDataContext";
import { useAuth } from "context/AuthContext";
import { getProjectProgress } from "services/getProjectProgress";
import { CheckIcon } from "components/common/icons/CheckIcon";
import { HourGlassIcon } from "components/common/icons/HourGlassIcon";
import { marketplaceURLMapper } from "./mappers";

export default function AlertMessage({ visible }) {
  const { projectData } = useProjectData();
  const [autorizedUser, setAutorizedUser] = useState(false);
  const [isPostulant, setIsPostulant] = useState(false);
  const [isVerifier, setIsVerifier] = useState(false);
  const { user } = useAuth();

  const [progressObj, setProgressObj] = useState(null);

  useEffect(() => {
    if (user && projectData) {
      const verifiers = projectData?.projectVerifiers;
      const postulant = projectData?.projectPostulant?.id;
      const authorizedUsers =
        projectData?.projectInfo.projectAge < 20
          ? [...verifiers, postulant]
          : [...verifiers];
      setAutorizedUser(
        authorizedUsers.includes(user.id) || user.role === "admon"
      );
      setIsPostulant(postulant === user.id);
      setIsVerifier(verifiers.includes(user.id));
    }
  }, [user, projectData]);

  useEffect(() => {
    if (user && projectData.projectInfo) {
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
  }, [projectData]);

  return (
    <div className={`row row-cols-1 row-cols-xl-2 g-4 mb-4`}>
      {autorizedUser &&
        !(user?.role === "validator" || user?.role === "admon") && (
          <div className="col-12 col-xl-12">
            <div className="p-4 bg-[#fff3cd] rounded">
              <h3 className="text-2xl">Hola, {user?.name}</h3>
              <p>
                Podras realizar ajustes a la información del proyecto durante
                los primeros 20 dias despues de su postulación. Posterior a esto
                se congelan los cambios a menos que exista solicitud formal y se
                abra manualmente en casos excepcionales.
              </p>
              <hr />
              <p className="mb-0">
                {20 - parseInt(projectData?.projectInfo.projectAge)} Dias
                restantes
              </p>
            </div>
          </div>
        )}

      {(autorizedUser || isPostulant) && progressObj && (
        <div className="col-12 col-xl-12">
          <div className="p-4 bg-[#fff3cd] rounded">
            <h3 className="text-2xl">
              Estado de requerimientos para la publicación del proyecto{" "}
              <a
  href={
    marketplaceURLMapper?.[projectData?.projectInfo?.marketplaceID]?.[process.env.REACT_APP_ENV] ||
    process.env.REACT_APP_URL_MARKETPLACE || 
    "#"
  }
  target="_blank"
  rel="noreferrer"
>
  Marketplace
</a>

            </h3>
            <p>
              Para garantizar la transparencia, confiabilidad y calidad de los
              proyectos presentados, es necesario cumplir con las siguientes
              condiciones antes de que un proyecto pueda ser visualizado en el
              Marketplace para su comercialización:
            </p>
            <div className="row row-cols-2">
              {true && (
                <div>
                  <p className="mb-0">Requerimientos del postulante</p>
                  <ul className="pl-0">
                    <li className="font-bold flex">
                      (
                      {progressObj.sectionsStatus.projectInfo &&
                      progressObj.sectionsStatus.geodataInfo &&
                      progressObj.sectionsStatus.predialInfo ? (
                        <CheckIcon className="text-success" />
                      ) : (
                        <HourGlassIcon className="text-danger" />
                      )}
                      ) Completar información del proyecto
                    </li>
                    {/* <li className="font-bold flex">
                          (
                          {progressObj.sectionsStatus.ownersInfo ? (
                            <CheckIcon className="text-success" />
                          ) : (
                            <HourGlassIcon className="text-danger" />
                          )}
                          ) Completar información de titulares y certificados de
                          tradición
                        </li> */}
                    {/* <li className="font-bold flex">
                          (
                          {progressObj.sectionsStatus.geodataInfo ? (
                            <CheckIcon className="text-success" />
                          ) : (
                            <HourGlassIcon className="text-danger" />
                          )}
                          ) Completar ubicación geográfica
                        </li> */}
                    <li className="font-bold flex">
                      (
                      {progressObj.sectionsStatus.ownerAcceptsConditions ? (
                        <CheckIcon className="text-success" />
                      ) : (
                        <HourGlassIcon className="text-danger" />
                      )}
                      ) Aceptar condiciones financieras
                    </li>
                    {/* <li className="font-bold flex">
                          (
                          {progressObj.sectionsStatus.validationsComplete &&
                          progressObj.sectionsStatus.technicalInfo &&
                          progressObj.sectionsStatus.financialInfo ? (
                            <CheckIcon className="text-success" />
                          ) : (
                            <HourGlassIcon className="text-danger" />
                          )}
                          ) Revisión por parte de los validadores
                        </li>
                        <li className="font-bold flex">
                          (
                          {progressObj.sectionsStatus.tokenGenesis ? (
                            <CheckIcon className="text-success" />
                          ) : (
                            <HourGlassIcon className="text-danger" />
                          )}
                          ) Distribución de tokens del proyecto
                        </li> */}
                  </ul>
                </div>
              )}
              {true && (
                <div>
                  <p className="mb-0">
                    Estado de verificación del proyecto por parte del equipo de
                    Consultores SUAN.
                  </p>
                  <ul className="pl-0">
                    {/*  <li className="font-bold flex">
                      <p className="mb-0 flex">
                        (
                        {progressObj.sectionsStatus.validationsComplete ? (
                          <CheckIcon className="text-success" />
                        ) : (
                          <HourGlassIcon className="text-danger" />
                        )}
                        ) Validación de documentos
                      </p>
                    </li>*/}
                    <li className="font-bold flex">
                      <p className="mb-0 flex">
                        (
                        {progressObj.sectionsStatus.technicalInfo ? (
                          <CheckIcon className="text-success" />
                        ) : (
                          <HourGlassIcon className="text-danger" />
                        )}
                        ) Oficialización de información Técnica
                      </p>
                    </li>
                    <li className="font-bold flex">
                      <p className="mb-0 flex">
                        (
                        {progressObj.sectionsStatus.financialInfo ? (
                          <CheckIcon className="text-success" />
                        ) : (
                          <HourGlassIcon className="text-danger" />
                        )}
                        ) Oficialización de información Financiera
                      </p>
                    </li>
                    {/* <li className="font-bold flex">
                          (
                          {progressObj.sectionsStatus.ownerAcceptsConditions ? (
                            <CheckIcon className="text-success" />
                          ) : (
                            <HourGlassIcon className="text-danger" />
                          )}
                          ) Propietario acepta condiciones financieras
                        </li> */}
                    {/* <li className="font-bold flex">
                          <p className="mb-0 flex">
                            (
                            {progressObj.sectionsStatus.projectInfo &&
                            progressObj.sectionsStatus.geodataInfo ? (
                              <CheckIcon className="text-success" />
                            ) : (
                              <HourGlassIcon className="text-danger" />
                            )}
                            ) Completar información del proyecto
                          </p>
                        </li> */}
                    <li className="font-bold flex">
                      (
                      {progressObj.sectionsStatus.tokenGenesis ? (
                        <CheckIcon className="text-success" />
                      ) : (
                        <HourGlassIcon className="text-danger" />
                      )}
                      ) Distribución de tokens del proyecto
                    </li>
                    <li className="font-bold flex">
                      (
                      {progressObj.sectionsStatus.projectOnMarketplace ? (
                        <CheckIcon className="text-success" />
                      ) : (
                        <HourGlassIcon className="text-danger" />
                      )}
                      ) Proyecto visible en Marketplace
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <hr />
            <p className="mb-0">
              {progressObj.progressValue === 100
                ? "Este proyecto cumple la totalidad de los requerimientos"
                : "Este proyecto aún no cumple la totalidad de requerimientos para su publicación"}
            </p>
            {/* <hr />
            <div>
              <div>
                <ProgressBar
                  striped
                  variant="danger"
                  now={progressObj.progressValue}
                />
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
