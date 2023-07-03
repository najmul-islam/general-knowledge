import React from "react";
import { Row, Col } from "react-bootstrap";

const Devider = ({ width, color }) => {
  return (
    <Row xs={width} className="justify-content-center pt-2 pb-3">
      <Col className={`border-top border-2 border-${color} rounded`}></Col>
    </Row>
  );
};

export default Devider;
