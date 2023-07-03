import React, { useState } from "react";
import { useGetAllSubjectQuery } from "../../../redux/api/publicApi";
import { Row, Col, Table, Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import AddSubjectModal from "./AddSubjectModal";

const AllSubject = () => {
  const { data, isLoading, isError, error } = useGetAllSubjectQuery();
  const [subjectModalShow, setSubjectModalShow] = useState(false);
  if (isLoading) return <h4>Loading...</h4>;
  if (isError) return <pre>{error.error}</pre>;
  return (
    <>
      <Row className="py-3">
        <Col sm="auto">
          <Button onClick={() => setSubjectModalShow(true)}>Add Subject</Button>
        </Col>
      </Row>
      <Row>
        <h2 className="text-center">Subject</h2>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>title</th>
                {/* <th>description</th> */}
                <th>edit</th>
                <th>delete</th>
              </tr>
            </thead>

            <tbody>
              {data.map((subject) => (
                <tr key={subject._id}>
                  <td>{subject._id}</td>
                  <td>{subject.title}</td>
                  <td>
                    <BiEdit />
                  </td>
                  <td>
                    <MdDelete />
                  </td>
                  {/* <td>{category.description}</td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <AddSubjectModal
        show={subjectModalShow}
        onHide={() => setSubjectModalShow(false)}
      />
    </>
  );
};

export default AllSubject;
