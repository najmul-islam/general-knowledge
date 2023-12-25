import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/header/Header";
const PublicLayout = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};
export default PublicLayout;
