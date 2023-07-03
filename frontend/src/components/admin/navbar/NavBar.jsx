import React from "react";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../../redux/features/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Home
          </Navbar.Brand>

          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="search"
              className="me-2"
              aria-label="Search"
              // style={{ width: "400px" }} style={{ width: "110px" }}
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          <Nav className="m-auto">
            <Nav.Link as={NavLink} to="category">
              Category
            </Nav.Link>
            <Nav.Link as={NavLink} to="subcategory">
              Subcategory
            </Nav.Link>
            <Nav.Link as={NavLink} to="subject">
              Subject
            </Nav.Link>
            <Nav.Link as={NavLink} to="gk">
              Gk
            </Nav.Link>

            <Nav.Link as={NavLink} to="users">
              Users
            </Nav.Link>
          </Nav>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="action">
              Action
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="another-action">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="something">
              Something
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}> Logout</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
