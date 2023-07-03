import React from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { useGetSingleCategoryQuery } from "../../../redux/api/publicApi";
import Loading from "../others/Loading";
import Devider from "../others/Devider";

const SingleCategory = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSingleCategoryQuery(id);
  console.log(data);

  if (isLoading) return <Loading />;

  if (isError) return <pre>{error.error}</pre>;

  return (
    <>
      <Row className="py-3">
        <Col>
          <Card>
            <Card.Body>
              <h3 className="text-center">
                {data.category.title}{" "}
                {data.category.title.includes("।") ? null : "।"}
              </h3>
              {data.category.description === "" ? null : (
                <Devider width="2" color="secondary" />
              )}
              {data.category.description === "" ? null : (
                <p className="text-center">
                  {data.category.description}{" "}
                  {data.category.description.includes("।") ? null : "।"}
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          {data.subcategory?.map((subcategory) => (
            <ListGroup key={subcategory._id} className="my-2">
              <ListGroup.Item
                as={NavLink}
                to={`/category/subcategory/${subcategory._id}`}
              >
                {subcategory.title}
              </ListGroup.Item>
            </ListGroup>
          ))}

          {data.subject?.map((subject) => (
            <ListGroup key={subject._id} className="my-2">
              <ListGroup.Item
                as={NavLink}
                to={`/category/subject/${subject._id}`}
              >
                {subject.title}
              </ListGroup.Item>
            </ListGroup>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default SingleCategory;
