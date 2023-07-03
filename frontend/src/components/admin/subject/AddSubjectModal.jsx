import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Modal, Button, Form } from "react-bootstrap";
import {
  useGetAllCategoryQuery,
  useGetAllSubcategoryQuery,
} from "../../../redux/api/publicApi";
import { useCreateSubjectMutation } from "../../../redux/api/adminApi";
// validationSchema: yup.object({
//   name: yup.string().required("Required!"),
//   email: yup.string().email("Invalid email format").required("Required"),
//   channel: yup.string().required("Required"),
// }),

const initialValues = {
  category: "",
  subcategory: "",
  title: "",
  description: "",
};

const AddSubjectModal = ({ onHide, show }) => {
  const [createSubject] = useCreateSubjectMutation();
  const {
    data: categories,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    error: categoryError,
  } = useGetAllCategoryQuery();
  const {
    data: subcategories,
    isLoading: isSubcategoryLoading,
    isError: isSubcategoryError,
    error: subcategoryError,
  } = useGetAllSubcategoryQuery();
  const formik = useFormik({
    initialValues,
    onSubmit: (values, action) => {
      const { category, subcategory, title, description } = values;
      createSubject({
        category: category === "" ? null : category,
        subcategory: subcategory === "" ? null : subcategory,
        title,
        description,
      });

      action.resetForm({
        values: {
          ...values,
          title: initialValues.title,
          description: initialValues.description,
        },
      });
    },
    validationSchema: yup.object({
      // category: yup.string().required("you most be select a category"),
      title: yup.string().required("Required!"),
    }),
  });

  if (isCategoryLoading || isSubcategoryLoading) return <h4>Loading...</h4>;

  if (isCategoryError || isSubcategoryError)
    return <pre>{categoryError.error || subcategoryError.error}</pre>;

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
          Add Subject
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select a category</Form.Label>
            <Form.Select
              type="select"
              name="category"
              id="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            >
              <option>Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </Form.Select>
            {/* {formik.touched.category && formik.errors.category ? (
              <Form.Text className="text-danger">
                {formik.errors.category}
              </Form.Text>
            ) : null} */}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select a subcategory</Form.Label>
            <Form.Select
              type="select"
              name="subcategory"
              id="subcategory"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subcategory}
            >
              <option>Select a subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.title}
                </option>
              ))}
            </Form.Select>
            {/* {formik.touched.category && formik.errors.category ? (
              <Form.Text className="text-danger">
                {formik.errors.category}
              </Form.Text>
            ) : null} */}
          </Form.Group>
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
          Add Sub Category
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSubjectModal;
