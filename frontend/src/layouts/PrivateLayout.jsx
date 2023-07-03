import React, { useEffect } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import NavBar from "../components/admin/navbar/NavBar";
import Footer from "../components/public/others/Footer";

const PrivateLayout = ({ roles = [] }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return !roles.length || roles.includes(user?.role) ? (
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
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateLayout;
