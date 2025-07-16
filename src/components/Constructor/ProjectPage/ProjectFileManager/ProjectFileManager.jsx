import React, { useContext } from "react";
import { useProjectData } from "../../../../context/ProjectDataContext";
import FileManager from "./FileManager";
const dic = {
  analyst: ['analista'],
  validator: ['otros', 'consultor'],
  marketplace_admin: ['imagenes'],
  owner: ['otros'],
  admon: ['*']
}
export default function ProjectFileManager({ visible, userGroup }) {
  const { projectData } = useProjectData();
  const foldersToShow = userGroup !== '' && dic[userGroup]
  if(!projectData) return null
  return (
    <>
      {visible && (
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-full">
            <FileManager rootFolder={projectData.projectInfo.id} foldersToShow={foldersToShow} userGroup={userGroup}/>
          </div>
        </div>
      )}
    </>
  );
}
