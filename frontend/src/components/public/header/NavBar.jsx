import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Navbar, Form, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            {/* সাধারণ জ্ঞান */}
            Home
          </Navbar.Brand>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="search"
              className="me-2"
              aria-label="Search"
              // style={{ width: "400px" }} style={{ width: "110px" }}
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <Button
            as={NavLink}
            to="/category"
            variant="outline-success"
            className="fw-semibold d-none d-sm-block"
          >
            Table of contents
          </Button>

          <Button
            as={NavLink}
            to="/category"
            variant="outline-success"
            className="fw-semibold d-block d-sm-none"
          >
            Index
          </Button>
          {/* <Nav>
            <Nav.Link as={NavLink} to="/category">
               সুচিপত্র 
              Table of contents
            </Nav.Link>
          </Nav> */}
        </Container>
      </Navbar>

      <Container>
        <Row className="py-2 align-items-center justify-content-between">
          <Col xs="auto">
            <Button
              variant="outline-primary"
              onClick={() => (pathname === "/" ? null : navigate(-1))}
            >
              <FaChevronLeft />
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" onClick={() => navigate(+1)}>
              <FaChevronRight />
            </Button>
          </Col>
        </Row>
      </Container>

      {/* <Container>{pathname === "/" ? null : <BreadCrumbs />}</Container> */}
    </>
  );
};

export default NavBar;
