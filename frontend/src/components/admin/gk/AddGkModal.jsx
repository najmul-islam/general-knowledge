import React, { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import JoditEditor from "jodit-react";
import { Modal, Button, Form } from "react-bootstrap";
import { useGetAllSubjectQuery } from "../../../redux/api/publicApi";
import { useCreateGkMutation } from "../../../redux/api/adminApi";
// validationSchema: yup.object({
//   name: yup.string().required("Required!"),
//   email: yup.string().email("Invalid email format").required("Required"),
//   channel: yup.string().required("Required"),
// }),

const initialValues = {
  subject: "",
  question: "",
  answer: "",
  qna: "",
  table: "",
};

const AddGkModal = ({ onHide, show }) => {
  const editor = useRef(null);
  const { data, isLoading, isError, error } = useGetAllSubjectQuery();
  const [createGk] = useCreateGkMutation();
  const formik = useFormik({
    initialValues,
    onSubmit: (values, action) => {
      createGk({ ...values });
      action.resetForm({
        values: {
          ...values,
          question: initialValues.question,
          answer: initialValues.answer,
          qna: initialValues.qna,
        },
      });
    },
    validationSchema: yup.object({
      // category: yup.string().required("you most be select a category"),
      // title: yup.string().required("Required!"),
    }),
  });

  if (isLoading) return <h4>Loading...</h4>;
  if (isError) return <pre>{error.error}</pre>;
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Gk</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select a Subject</Form.Label>
            <Form.Select
              type="select"
              name="subject"
              id="subject"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
            >
              <option value="">Select a Subject</option>
              {data.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.title}
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
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              name="question"
              id="question"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.question}
            />

            {/* {formik.touched.question && formik.errors.question ? (
              <Form.Text className="text-danger">
                {formik.errors.question}
              </Form.Text>
            ) : null} */}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              type="text"
              name="answer"
              id="answer"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.answer}
            />
            {/* {formik.touched.question && formik.errors.question ? (
              <Form.Text className="text-danger">
                {formik.errors.question}
              </Form.Text>
            ) : null} */}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>QnA</Form.Label>
            <Form.Control
              type="text"
              name="qna"
              id="qna"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.qna}
            />
            {/* {formik.touched.qna && formik.errors.qna ? (
              <Form.Text className="text-danger">
                {formik.errors.qna}
              </Form.Text>
            ) : null} */}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Table</Form.Label>
            <JoditEditor
              ref={editor}
              value={formik.values.table}
              tabIndex={1}
              config={{
                buttons: [
                  "bold",
                  "superscript",
                  "subscript",
                  "table",
                  "symbols",
                  "left",
                  "source",
                  "fullsize",
                  "preview",
                ],
                readonly: false,
                toolbarAdaptive: false,
              }}
              onBlur={(newTable) => formik.setFieldValue("table", newTable)}
              onChange={formik.handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
        <Button type="submit" onClick={formik.handleSubmit}>
          Add Gk
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddGkModal;
