import React from "react";
import { Col, Row } from "react-bootstrap";
import { useGetAllGkQuery } from "../../../redux/api/publicApi";
import Gk from "./Gk";

const AllGk = () => {
  const { data, isLoading } = useGetAllGkQuery();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Row>
      <Col>
        {data.map((gk) => (
          <Gk key={gk._id} gk={gk} />
        ))}
      </Col>
    </Row>
  );
};

export default AllGk;
