import React from "react";
import { Button, Image, Modal, Row } from "react-bootstrap";
import ModalProps from "../../../interfaces/ModalProps";
import "./ProfileModal.css";

const ProfileModal = ({ show, handleClose }: ModalProps) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} className="edit-profile-modal">
        <Modal.Header>
          <Modal.Title className="mx-auto">Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image
            src="https://res.cloudinary.com/dyy38u8x7/image/upload/v1682583555/cody-scott-milewski-vXgV5XUlTog-unsplash_jh6sfn.jpg"
            alt="profile-image"
            className="profile-image mx-auto"
          ></Image>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <span className="orange-btn" onClick={handleClose}>
            Save Changes
          </span>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModal;
