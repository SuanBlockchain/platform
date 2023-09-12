import React, { useEffect, useState } from "react";

import { API, graphqlOperation } from "aws-amplify";

import FilesInfoCard from "./InfoCards/FilesInfoCard";
import MessagesHistoryCard from "./InfoCards/MessagesHistoryCard";
import { useProjectData } from "../../../../context/ProjectDataContext";
import { useAuth } from "../../../../context/AuthContext";
import { createVerificationComment } from "../../../../graphql/mutations";
import { convertAWSDatetimeToDate, capitalizeWords } from "../utils";
import { v4 as uuidv4 } from "uuid";

export default function ProjectFiles() {
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
      if (user.role === "validator") setIsVerifier(true);
    }
  }, [user, projectData]);

  const handleMessageButtonClick = async (fileIndex) => {
    const file = projectData.projectFiles[fileIndex];
    setIsMessageCardActive(!isMessageCardActive);
    setSelectedVerificationId(file.verification.id);
    setIsDocApproved(file.isApproved);
    setIsFileVerifier(file.verification.verifierID === user?.id ? true : false)
    setMessages(file.verification.messages);
  };

  const handleSendMessageButtonClick = async () => {
    const localMessage = {
      id: uuidv4(),
      comment: newMessage,
      createdAt: await convertAWSDatetimeToDate(Date.now()),
      isCommentByVerifier: false,
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

  return (
    <div className="row row-cols-1 row-cols-xl-2 g-4">
      <div className={isMessageCardActive ? "col" : "col-12 col-xl-12"}>
        <FilesInfoCard
          projectFiles={projectData.projectFiles}
          handleMessageButtonClick={handleMessageButtonClick}
          setIsDocApproved={setIsDocApproved}
          isVerifier={isVerifier}
          isPostulant={isPostulant}
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
    </div>
  );
}