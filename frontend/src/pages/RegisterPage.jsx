import { Container } from "@mui/material";
import Register from "../components/auth/Register";

const RegisterPage = () => {
  return (
    <Container maxWidth="md" sx={{ paddingY: 3 }}>
      <Register />
    </Container>
  );
};
export default RegisterPage;
