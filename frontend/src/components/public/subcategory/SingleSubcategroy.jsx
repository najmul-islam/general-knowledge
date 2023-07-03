import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useGetSingleSubcategoryQuery } from "../../../redux/api/publicApi";
import { Row, Card, ListGroup } from "react-bootstrap";
import Loading from "../others/Loading";
import Devider from "../others/Devider";

const SingleSubcategroy = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleSubcategoryQuery(id);
  console.log(data);
  if (isLoading) return <Loading />;
  if (isError) return <pre>error</pre>;
  return (
    <>
      <Row className="py-3">
        <Card>
          <Card.Body>
            <h3 className="text-center">
              {data.subcategory.title}{" "}
              {data.subcategory.title.includes("।") ? null : "।"}
            </h3>
            {data.subcategory.description === "" ? null : (
              <Devider width="2" color="secondary" />
            )}
            {data.subcategory.description === "" ? null : (
              <p className="text-center">
                {data.subcategory.description}{" "}
                {data.subcategory.description.includes("।") ? null : "।"}
              </p>
            )}
          </Card.Body>
        </Card>
      </Row>

      <Row>
        {/* {data.subcategory?.map((subcategory) => (
          <ListGroup key={subcategory._id} className="my-2">
            <ListGroup.Item
              as={NavLink}
              to={`/category/subcategory/${subcategory._id}`}
            >
              {subcategory.title}
            </ListGroup.Item>
          </ListGroup>
        ))} */}

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
      </Row>
    </>
  );
};

export default SingleSubcategroy;
