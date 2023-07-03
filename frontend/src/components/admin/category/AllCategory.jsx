import React, { useState } from "react";
import { useGetAllCategoryQuery } from "../../../redux/api/publicApi";
import { useEditCategoryMutation } from "../../../redux/api/adminApi";
import { Row, Col, Button, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

const AllCategory = () => {
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");
  const [editCategory, setEditCategory] = useState({});
  const { data, isLoading, isError, error } = useGetAllCategoryQuery();
  // const [editCategory] = useEditCategoryMutation();
  const [addCategoryModalShow, setAddCategoryModalShow] = useState(false);
  const [editCategoryModalShow, setEditCategoryModalShow] = useState(false);
  const [deleteCategoryModalShow, setDeleteCategoryModalShow] = useState(false);

  const handleEdit = (category) => {
    setDeleteCategoryModalShow(true);
    setEditId(category._id);
    setEditCategory(category);
  };

  const handleDelete = (id) => {
    setDeleteCategoryModalShow(true);
    setDeleteId(id);
  };

  if (isLoading) return <h4>Loading...</h4>;
  if (isError) return <pre>{error.error}</pre>;

  return (
    <>
      <Row className="py-3">
        <Col sm="auto">
          <Button onClick={() => setAddCategoryModalShow(true)}>
            Add Category
          </Button>
        </Col>
      </Row>
      <Row>
        <h2 className="text-center">Categorys</h2>
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
              {data.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.title}</td>
                  <td onClick={() => handleEdit(category)}>
                    <BiEdit />
                  </td>
                  <td onClick={() => handleDelete(category._id)}>
                    <MdDelete />
                  </td>
                  {/* <td>{category.description}</td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <AddCategoryModal
        show={addCategoryModalShow}
        onHide={() => setAddCategoryModalShow(false)}
      />
      <EditCategoryModal
        category={editCategory}
        show={editCategoryModalShow}
        onHide={() => setEditCategoryModalShow(false)}
      />
      <DeleteCategoryModal
        id={deleteId}
        show={deleteCategoryModalShow}
        onHide={() => setDeleteCategoryModalShow(false)}
      />
    </>
  );
};

export default AllCategory;
