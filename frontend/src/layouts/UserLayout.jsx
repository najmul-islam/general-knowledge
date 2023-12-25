import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/header/Header";
import { useSelector } from "react-redux";

const UserLayout = ({ roles = [] }) => {
  const { user } = useSelector((state) => state.auth);

  return !roles.length || roles.includes(user?.role) ? (
    <Box>
      <Header />
      <Outlet />
    </Box>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default UserLayout;
