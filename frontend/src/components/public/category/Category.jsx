import React from "react";
import { NavLink } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const Category = ({ category }) => {
  return (
    <ListGroup className="my-2">
      <ListGroup.Item as={NavLink} to={`${category._id}`}>
        {category.title}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Category;
