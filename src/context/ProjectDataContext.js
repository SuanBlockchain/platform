import { fetchProjectDataByProjectID } from "components/Constructor/ProjectPage/api";
import React, { useContext, useEffect, useState } from "react";

const ProjectDataContext = React.createContext();

export function useProjectData() {
  return useContext(ProjectDataContext);
}

export function ProjectDataProvider({ children }) {
  const [projectData, setProjectData] = useState(null);
  const [projectID, setProjectID] = useState(null);

  const handleProjectData = async ({ pID }) => {
    if (!pID) {
      console.error("Page parameter is missing.");
      return;
    }
 
    setProjectID(pID);
    await fetchProjectData(pID);
  };

  const fetchProjectData = async (pID = null) => {
    const project_id = projectID || pID;
    if (project_id) {
      const data = await fetchProjectDataByProjectID(project_id);
      setProjectData(data);

      return data;
    }
    setProjectData(null);
    return null;
  };

  const handleUpdateContextProjectData = async (data) => {
  
    fetchProjectData();
    return;
  };

  const handleUpdateContextProjectInfo = async (data) => {

    fetchProjectData();
    return;
  };

  const handleUpdateContextProjectOwners = async (data) => {
    fetchProjectData();
    return;
  };

  const handleUpdateContextProjectCadastralRecordsData = async (data) => {
    
   
    fetchProjectData();
    return;

  };

  const handleUpdateContextProjectRestrictions = async (data) => {
    

    fetchProjectData();
    return;

  };

  const handleUpdateContextProjectRelations = async (data) => {
    
   
    fetchProjectData();
    return;

  };

  const handleUpdateContextProjectEcosystem = async (data, obj = null) => {
    
    
    fetchProjectData();
    return;

  };

  const handleUpdateContextProjectInfoLocation = async (data) => {
    
   
    fetchProjectData();
    return;

  };

  const handleUpdateContextVerifiers = async (data) => {
    
   
    fetchProjectData();
    return;

  };

  const handleUpdateContextDocumentStatus = async (fileIndex, data) => {
    
 
    fetchProjectData();
    return;

  };

  const handleUpdateContextProjectFile = async (docID, data) => {

    fetchProjectData();
    return;

  };

  const handleSetContextProjectFile = async (updatedProjectFiles) => {
    fetchProjectData();
    return;
  };

  const handleUpdateContextProjectTokenData = async (data) => {
    fetchProjectData();
    return;
  };

  const handleUpdateContextFileVerification = async (fileIndex, data) => {
    fetchProjectData();
    return;
  };

  const handleUpdateContextProjectFileValidators = async (data) => {
    fetchProjectData();
    return;
  };

  const refresh = async () => {
    fetchProjectData();
    return;
  };

  const contextProps = {
    projectData,
    handleProjectData,
    fetchProjectData,
    handleUpdateContextProjectOwners,
    handleUpdateContextProjectCadastralRecordsData,
    handleUpdateContextProjectData,
    handleUpdateContextDocumentStatus,
    handleUpdateContextProjectFile,
    handleSetContextProjectFile,
    handleUpdateContextProjectTokenData,
    handleUpdateContextFileVerification,
    handleUpdateContextProjectInfo,
    handleUpdateContextProjectInfoLocation,
    handleUpdateContextProjectRestrictions,
    handleUpdateContextProjectRelations,
    handleUpdateContextProjectEcosystem,
    handleUpdateContextVerifiers,
    handleUpdateContextProjectFileValidators,
    refresh,
  };

  return (
    <ProjectDataContext.Provider value={contextProps}>
      {children}
    </ProjectDataContext.Provider>
  );
}
