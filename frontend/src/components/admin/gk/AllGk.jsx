import React, { useState } from "react";
import { useGetAllGkQuery } from "../../../redux/api/publicApi";
import { Row, Col, Table, Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import AddGkModal from "./AddGkModal";

const AllGk = () => {
  const { data, isLoading, isError, error } = useGetAllGkQuery();
  const [gkModalShow, setGkModalShow] = useState(false);
  if (isLoading) return <h4>Loading...</h4>;
  if (isError) return <pre>{error.error}</pre>;

  return (
    <>
      <Row className="py-3">
        <Col sm="auto">
          <Button onClick={() => setGkModalShow(true)}>Add Gk</Button>
        </Col>
      </Row>
      <Row>
        <h2 className="text-center">General Knowledge </h2>
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
              {data.map((gk) => {
                if (gk?.question) {
                  return (
                    <tr key={gk._id}>
                      <td>{gk._id}</td>
                      <td>{gk.question}</td>
                      <td>
                        <BiEdit />
                      </td>
                      <td>
                        <MdDelete />
                      </td>
                      {/* <td>{category.description}</td> */}
                    </tr>
                  );
                }

                if (gk?.qna) {
                  return (
                    <tr key={gk._id}>
                      <td>{gk._id}</td>
                      <td>{gk.qna}</td>
                      <td>
                        <BiEdit />
                      </td>
                      <td>
                        <MdDelete />
                      </td>
                      {/* <td>{category.description}</td> */}
                    </tr>
                  );
                }

                if (gk?.table) {
                  return (
                    <tr key={gk._id}>
                      <td>{gk._id}</td>
                      <td>{gk.table}</td>
                      <td>
                        <BiEdit />
                      </td>
                      <td>
                        <MdDelete />
                      </td>
                      {/* <td>{category.description}</td> */}
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <AddGkModal show={gkModalShow} onHide={() => setGkModalShow(false)} />
    </>
  );
};

export default AllGk;
