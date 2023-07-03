import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../components/public/header/NavBar";
import Footer from "../components/public/others/Footer";

const PublicLayout = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <Container as="main" className="min-vh-100">
        <Outlet />
      </Container>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default PublicLayout;
