import React, { useEffect, useState } from "react";
import PostulantInfoCard from "./InfoCards/PostulantInfoCard";
import ProjectInfoCard from "./InfoCards/ProjectInfoCard";
import OwnerInfoCard from "./InfoCards/OwnerInfoCard";
import ActualUseAndPotentialInfoCard from "./InfoCards/ActualUseAndPotentialInfoCard";
import EcosystemInfoCard from "./InfoCards/EcosystemInfoCard";
import PropertyInfoCard from "./InfoCards/PropertyInfoCard";
import RelationsInfoCard from "./InfoCards/RelationsInfoCard";
import GeodataInfoCard from "./InfoCards/GeodataInfoCard";
import { useProjectData } from "../../../../context/ProjectDataContext";
import UseRestrictionsInfoCard from "./InfoCards/UseRestrictionsInfoCard";
import { useAuth } from "context/AuthContext";
import { getProjectProgress } from "services/getProjectProgress";
import { CheckIcon } from "components/common/icons/CheckIcon";
import { HourGlassIcon } from "components/common/icons/HourGlassIcon";
import CadastralRecordsInfoCard from "./InfoCards/CadastralRecordsInfoCard";
import PropertiesTable from "./InfoCards/PropertiesTable";

export default function ProjectDetails({ visible }) {
  const { projectData } = useProjectData();
  const [autorizedUser, setAutorizedUser] = useState(false);
  const [isPostulant, setIsPostulant] = useState(false);
  const [isVerifier, setIsVerifier] = useState(false);
  const { user } = useAuth();

  const [totalArea, setTotalArea] = useState(0);
  const [latLngCentroid, setLatLngCentroid] = useState(null);
  const [progressChange, setProgressChange] = useState(false);
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
      setTotalArea(projectData.projectInfo.area)
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
          console.log(obj, "progress");
          setProgressObj(obj);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      progress();
    }
  }, [projectData, progressChange]);

  return (
    <>
      {visible && (
        <div className="row row-cols-1 row-cols-xl-2 g-4">
          <div className="col">
            <ProjectInfoCard
              autorizedUser={autorizedUser}
              setProgressChange={setProgressChange}
              totalArea={totalArea}
              tooltip={
                (autorizedUser || isPostulant) &&
                (progressObj?.sectionsStatus.projectInfo ? (
                  <CheckIcon className="text-success" />
                ) : (
                  <HourGlassIcon className="text-danger" />
                ))
              }
            />
          </div>
          <div className="col">
            <GeodataInfoCard
              autorizedUser={autorizedUser}
              setProgressChange={setProgressChange}
              setLatLngCentroid={setLatLngCentroid}
              tooltip={
                (autorizedUser || isPostulant) &&
                (progressObj?.sectionsStatus.geodataInfo ? (
                  <CheckIcon className="text-success" />
                ) : (
                  <HourGlassIcon className="text-danger" />
                ))
              }
            />
          </div>
          {/* <div className="col-12 col-xl-12">
            <CadastralRecordsInfoCard
              autorizedUser={autorizedUser}
              setProgressChange={setProgressChange}
              totalArea={totalArea}
              latLngCentroid={latLngCentroid}
              setTotalArea={setTotalArea}
              tooltip={
                (autorizedUser || isPostulant) &&
                (progressObj?.sectionsStatus.predialInfo ? (
                  <CheckIcon className="text-success" />
                ) : (
                  <HourGlassIcon className="text-danger" />
                ))
              }
            />
          </div>
          <div className="col">
            <OwnerInfoCard
              autorizedUser={autorizedUser}
              setProgressChange={setProgressChange}
              tooltip={
                (autorizedUser || isPostulant) &&
                (progressObj?.sectionsStatus.ownersInfo ? (
                  <CheckIcon className="text-success" />
                ) : (
                  <HourGlassIcon className="text-danger" />
                ))
              }
            />
          </div>
          <div className="col">
            <PostulantInfoCard autorizedUser={autorizedUser} />
          </div>
          <div
            className={
              projectData.projectUses?.replaceUse.types.length > 0 ||
              projectData.projectUses?.actualUse.types.length > 0
                ? "col-12 col-lg-12"
                : "col-12"
            }
          >
            <ActualUseAndPotentialInfoCard autorizedUser={autorizedUser} />
          </div>
          <div
            className={
              projectData.projectUses?.replaceUse.types.length > 0 ||
              projectData.projectUses?.actualUse.types.length > 0
                ? "col-12 col-lg-12"
                : "col-12"
            }
          >
            <UseRestrictionsInfoCard autorizedUser={autorizedUser} />
          </div>
          <div className="col-12 col-lg-12">
            <EcosystemInfoCard autorizedUser={autorizedUser} />
          </div>
          <div className="col">
            <PropertyInfoCard autorizedUser={autorizedUser} />
          </div>
          <div className="col mb-5">
            <RelationsInfoCard autorizedUser={autorizedUser} />
          </div> */}
          <div className="col-12 col-xl-12">
            <PropertiesTable />
          </div>
        </div>
      )}
    </>
  );
}
