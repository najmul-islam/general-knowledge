import { Container } from "@mui/material";
import Login from "../components/auth/Login";

const LoginPage = () => {
  return (
    <Container maxWidth="md" sx={{ paddingY: 3 }}>
      <Login />
    </Container>
  );
};
export default LoginPage;
