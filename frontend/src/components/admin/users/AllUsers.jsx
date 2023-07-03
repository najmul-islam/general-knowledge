import React from "react";
import { useGetAllUserQuery } from "../../../redux/api/adminApi";
import { Row, Col, Table, Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

const AllUsers = () => {
  const { data, isLoading, isError, error } = useGetAllUserQuery();
  const users = useGetAllUserQuery();
  if (isLoading) return <h4>Loading...</h4>;
  if (isError) return <pre>{error.error}</pre>;
  //   console.log(data.users);
  //   console.log(error);
  const handleDelete = (id) => {
    console.log(id);
  };
  return (
    <Row>
      <Col>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>role</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role.toLowerCase()}</td>
                <td>
                  <BiEdit />
                </td>
                <td
                  className="mx-auto cursor-pointer"
                  onClick={() => handleDelete(user._id)}
                >
                  <MdDelete />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AllUsers;
