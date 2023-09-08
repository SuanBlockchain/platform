import React, { useContext, useState } from "react";

const ProjectDataContext = React.createContext();

export function useProjectData() {
  return useContext(ProjectDataContext);
}

export function ProjectDataProvider({ children }) {
  const [projectData, setProjectData] = useState({});

  const handleProjectData = async (data) => {
    setProjectData(data);
  };

  const handleUpdateContextDocumentStatus = async (fileIndex, data) => {
    setProjectData((prevData) => ({
      ...prevData,
      projectFiles: prevData.projectFiles.map((file, index) => {
        if (index === fileIndex) {
          return {
            ...file,
            ...data,
          };
        } else {
          return file;
        }
      }),
    }));
  };

  const handleUpdateContextProjectTokenData = async (data) => {
    setProjectData((prevData) => ({
      ...prevData,
      projectInfo: {
        ...prevData.projectInfo,
        token: { ...prevData.projectInfo.token, ...data },
      },
    }));
  };

  const handleUpdateContextFileVerification = async (fileIndex, data) => {
    setProjectData((prevData) => ({
      ...prevData,
      projectFiles: prevData.projectFiles.map((file, index) => {
        if (index === fileIndex) {
          console.log("data", data)
          return {
            ...file,
            verification: { ...data },
          };
        } else {
          return file;
        }
      }),
    }));
  };

  const contextProps = {
    projectData,
    handleProjectData,
    handleUpdateContextDocumentStatus,
    handleUpdateContextProjectTokenData,
    handleUpdateContextFileVerification,
  };

  return (
    <ProjectDataContext.Provider value={contextProps}>
      {children}
    </ProjectDataContext.Provider>
  );
}
