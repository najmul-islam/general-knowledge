import React, { useEffect } from "react";

import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { useDeleteCategoryMutation } from "../../../redux/api/adminApi";

const DeleteCategoryModal = ({ id, onHide, show }) => {
  const [deleteCateogory] = useDeleteCategoryMutation();
  const handleDelete = async (id) => {
    await deleteCateogory(id);
    toast.error("Category deleted");
    onHide();
  };

  return (
    <Modal
      onHide={onHide}
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title className="m-auto">Delete Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="text-center">Are you sure to delete this category?</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={() => handleDelete(id)}>
          Yes
        </Button>
        <Button variant="danger" onClick={onHide}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCategoryModal;
