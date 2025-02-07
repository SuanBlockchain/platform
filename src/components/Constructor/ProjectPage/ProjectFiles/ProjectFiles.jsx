import React, { useEffect, useState } from "react";

import { API, graphqlOperation } from "aws-amplify";

import PostulantFilesInfoCard from "./InfoCards/PostulantFilesInfoCard";
import ValidatorFilesInfoCard from "./InfoCards/ValidatorFilesInfoCard";
import MessagesHistoryCard from "./InfoCards/MessagesHistoryCard";
import { useProjectData } from "../../../../context/ProjectDataContext";
import { useAuth } from "../../../../context/AuthContext";
import { createVerificationComment } from "../../../../graphql/mutations";
import { convertAWSDatetimeToDate, capitalizeWords } from "../utils";
import { v4 as uuidv4 } from "uuid";

export default function ProjectFiles({ visible }) {
  const [isMessageCardActive, setIsMessageCardActive] = useState(false);
  const [selectedVerificationId, setSelectedVerificationId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isPostulant, setIsPostulant] = useState(false);
  const [isVerifier, setIsVerifier] = useState(false);
  const [isFileVerifier, setIsFileVerifier] = useState(false);
  const [isDocApproved, setIsDocApproved] = useState(false);
  const [messages, setMessages] = useState([]);

  const { user } = useAuth();
  const { projectData } = useProjectData();

  useEffect(() => {
    if (user && projectData) {
      if (projectData.projectPostulant.id === user.id) setIsPostulant(true);
      if (projectData.projectVerifiers.includes(user.id)) setIsVerifier(true);
    }
  }, [user, projectData]);

  const handleMessageButtonClick = async (fileIndex, type) => {
    const file = type === 'productFeature'? projectData.projectFiles[fileIndex] :  projectData.projectPropertyFiles[fileIndex]
    setIsMessageCardActive(!isMessageCardActive);
    setSelectedVerificationId(file.verification.id);
    setIsDocApproved(file.isApproved);
    setIsFileVerifier(file.verification.verifierID === user?.id ? true : false);
    setMessages(file.verification.messages);
  };

  const handleSendMessageButtonClick = async () => {
    const localMessage = {
      id: uuidv4(),
      comment: newMessage,
      createdAt: await convertAWSDatetimeToDate(Date.now()),
      isCommentByVerifier: user.role === "validator" ? true : false,
      userName: await capitalizeWords(user.name),
      elapsedTime: "Hace un momento",
    };
    const updateMessages = [...messages, localMessage];
    setMessages(updateMessages);

    const newVerificationComment = {
      verificationID: selectedVerificationId,
      comment: newMessage,
      isCommentByVerifier: user.role === "validator" ? true : false,
    };

    await API.graphql(
      graphqlOperation(createVerificationComment, {
        input: newVerificationComment,
      })
    );

    setNewMessage("");
  };

  const handleSendMessage = async (message, verificationID) => {
    const localMessage = {
      id: uuidv4(),
      comment: message,
      createdAt: await convertAWSDatetimeToDate(Date.now()),
      isCommentByVerifier: user.role === "validator" ? true : false,
      userName: await capitalizeWords(user.name),
      elapsedTime: "Hace un momento",
    };
    const updateMessages = [...messages, localMessage];
    setMessages(updateMessages);

    const newVerificationComment = {
      verificationID: verificationID,
      comment: message,
      isCommentByVerifier: user.role === "validator" ? true : false,
    };

    await API.graphql(
      graphqlOperation(createVerificationComment, {
        input: newVerificationComment,
      })
    );
  };

  return (
    <>
      {visible && (
        <div className="row row-cols-1 row-cols-xl-2 g-4">
          <div className={isMessageCardActive ? "col" : "col-12 col-xl-12 mb-5"}>
            <PostulantFilesInfoCard
              projectFiles={projectData.projectFiles}
              propertyFiles={projectData.projectPropertyFiles}
              handleMessageButtonClick={handleMessageButtonClick}
              setIsDocApproved={setIsDocApproved}
              isVerifier={isVerifier}
              isPostulant={isPostulant}
              handleSendMessage={handleSendMessage}
            />
          </div>
          {isMessageCardActive && (
            <div className="col">
              <MessagesHistoryCard
                className="scale-up-ver-top"
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessageButtonClick={handleSendMessageButtonClick}
                isPostulant={isPostulant}
                isFileVerifier={isFileVerifier}
                isDocApproved={isDocApproved}
              />
            </div>
          )}
          {/* <div className="col-12 col-xl-12">
      <ValidatorFilesInfoCard
        projectValidatorFiles={projectData.projectFilesValidators.projectValidatorDocuments}
        isVerifier={isVerifier}
        isPostulant={isPostulant}
      />
    </div> */}
        </div>
      )}
    </>
  );
}
