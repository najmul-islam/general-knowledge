import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useGetSingleSubjectQuery } from "../../../redux/api/publicApi";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import { IoCheckboxOutline } from "react-icons/io5";
import Loading from "../others/Loading";
import Devider from "../others/Devider";

import Gk from "../gk/Gk";

const SingleSubject = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleSubjectQuery(id);
  if (isLoading) return <Loading />;
  if (isError) return <pre>Error</pre>;
  console.log(data);
  return (
    <>
      <Row className="py-3">
        <Col>
          <Card>
            <Card.Body>
              <h3 className="text-center">
                {data.subject.title}{" "}
                {data.subject.title.includes("।") ? null : "।"}
              </h3>
              {data.subject.description === "" ? null : (
                <Devider width="2" color="secondary" />
              )}
              {data.subject.description === "" ? null : (
                <p className="text-center">
                  {data.subject.description}{" "}
                  {data.subject.description.includes("।") ? null : "।"}
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          {data.gk.map((gk) => {
            if (gk?.question) {
              console.log("gk");
              return (
                <Card body key={gk._id} className="my-2">
                  <Card.Subtitle className="my-1">
                    প্রঃ {gk.question} {gk.question.includes("?") ? null : "?"}
                  </Card.Subtitle>
                  <Card.Text>
                    উঃ {gk.answer} {gk.answer.includes("।") ? null : "।"}
                  </Card.Text>
                </Card>
              );
            }

            if (gk?.qna) {
              return (
                <ListGroup.Item key={gk._id}>
                  <IoCheckboxOutline
                    className="fw-bold"
                    style={{ fontSize: "20px", marginRight: "5px" }}
                  />{" "}
                  {gk.qna} {gk.qna.includes("।") ? null : "।"}
                </ListGroup.Item>
              );
            }
          })}
        </Col>
      </Row>
    </>
  );
};

export default SingleSubject;
