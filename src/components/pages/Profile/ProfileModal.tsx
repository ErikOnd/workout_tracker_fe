import React, { useState } from "react";
import { Image, Modal, Form } from "react-bootstrap";
import ModalProps from "../../../interfaces/ModalProps";
import "./ProfileModal.css";
import putUserData from "../../../services/putUserData";
import updateImage from "../../../services/updateImage";
import { RotatingLines } from "react-loader-spinner";

const ProfileModal = ({
  show,
  handleClose,
  userImage,
  userName,
  userId,
  reloadData,
}: ModalProps) => {
  const [newUserName, setNewUserName] = useState({ username: "" });
  const [newImage, setNewImage] = useState<File | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const saveAndUpdate = async () => {
    setIsLoading(true);
    newUserName && (await putUserData(newUserName));
    newImage && (await updateImage(newImage, userId));
    reloadData();
    setIsLoading(false);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="edit-profile-modal">
        <Modal.Header>
          <Modal.Title className="mx-auto">Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image
            src={userImage}
            alt="profile-image"
            className="profile-image mx-auto"
          ></Image>
          <div className="text-center">
            <div className="my-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setNewImage(file);
                  }
                }}
              />
            </div>
          </div>
          <div className="my-3">
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="modal-text">Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder={userName}
                onChange={(e) => {
                  setNewUserName({ username: e.target.value });
                }}
              />
            </Form.Group>
          </div>
          {isLoading && (
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <span className="orange-btn modal-text" onClick={saveAndUpdate}>
            Save Changes
          </span>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModal;
