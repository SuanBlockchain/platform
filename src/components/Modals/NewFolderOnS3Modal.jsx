import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useProjectData } from "context/ProjectDataContext";
import { Storage } from "aws-amplify";
import { AddFolderIcon } from "components/common/icons/AddFolderIcon";
import FormGroup from "components/common/FormGroup";
import { makeFolderOnS3 } from "utilities/makeFolderOnS3";
import { useS3Client } from "context/s3ClientContext";
import { notify } from "utilities/notify";
export default function NewFolderOnS3Modal(props) {
  const { uploadRoute } = props;
  const { s3Client, bucketName } = useS3Client();
  const [showModal, setShowModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const { refresh } = useProjectData();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

    setNewFolderName("");
  };

  const handleCreateFolderOnS3 = async (folderName) => {
    const folderPath = `projects/${uploadRoute}/${folderName}/`;
    let result;
    try {
      result = await makeFolderOnS3(s3Client, bucketName, folderPath);
      
    } catch (error) {
      console.log(error)
    } finally{
      notify({type: result.status, msg: result.msg})
    }

    refresh();
    closeModal();
  };

  return (
    <div>
      <button
        className="p-2 text-white bg-blue-600 rounded-md"
        onClick={openModal}
      >
        <AddFolderIcon />
      </button>

      <Modal show={showModal} onHide={closeModal} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo directorio</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormGroup
            type="block"
            inputType="text"
            inputSize="md"
            label="Nombre"
            inputValue={newFolderName}
            onChangeInputValue={(e) => setNewFolderName(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <button
            className="p-2 text-white bg-slate-700 rounded-md"
            onClick={closeModal}
          >
            Cerrar
          </button>
          <button
            className="p-2 text-white bg-blue-600 rounded-md"
            onClick={() => handleCreateFolderOnS3(newFolderName)}
          >
            Crear
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
