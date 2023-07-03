import React, { useState } from "react";
import { useGetAllSubcategoryQuery } from "../../../redux/api/publicApi";
import { Row, Col, Table, Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import AddSubcategoryModal from "./AddSubcategoryModal";

const AllSubcategory = () => {
  const { data, isLoading, isError, error } = useGetAllSubcategoryQuery();
  const [subcategoryModalShow, setSubcategoryModalShow] = useState(false);
  if (isLoading) return <h4>Loading...</h4>;
  if (isError) return <pre>{error.error}</pre>;
  return (
    <>
      <Row className="py-3">
        <Col sm="auto">
          <Button onClick={() => setSubcategoryModalShow(true)}>
            Add Subcategory
          </Button>
        </Col>
      </Row>
      <Row>
        <h2 className="text-center">Sub Categorys</h2>
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
              {data.map((subcategory) => (
                <tr key={subcategory._id}>
                  <td>{subcategory._id}</td>
                  <td>{subcategory.title}</td>
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
      <AddSubcategoryModal
        show={subcategoryModalShow}
        onHide={() => setSubcategoryModalShow(false)}
      />
    </>
  );
};

export default AllSubcategory;
