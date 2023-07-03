import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useEditCategoryMutation } from "../../../redux/api/adminApi";
// validationSchema: yup.object({
//   name: yup.string().required("Required!"),
//   email: yup.string().email("Invalid email format").required("Required"),
//   channel: yup.string().required("Required"),
// }),

const EditCategoryModal = ({ category, id, onHide, show }) => {
  const [editCategory, { isLoading, isSuccess, isError, error }] =
    useEditCategoryMutation();

  const formik = useFormik({
    initialValues: {
      title: category?.title,
      description: category?.description,
    },
    onSubmit: async (values) => {
      await editCategory(id, { ...values });
    },
    validationSchema: yup.object({
      title: yup.string().required("Required!"),
    }),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category edited successfully");
    }
    if (isError) {
      toast.error(error.error);
    }
  }, [isLoading, isError, isSuccess, error]);

  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              id="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <Form.Text className="text-danger">
                {formik.errors.title}
              </Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="description"
              id="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
        <Button type="submit" onClick={formik.handleSubmit}>
          {isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : null}
          Add Category
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCategoryModal;
