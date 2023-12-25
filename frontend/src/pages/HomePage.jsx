import { Container } from "@mui/material";
import AllGk from "../components/public/gk/AllGk";

const HomePage = () => {
  return (
    <Container maxWidth="md" sx={{ paddingY: 3 }}>
      <AllGk />
    </Container>
  );
};
export default HomePage;
