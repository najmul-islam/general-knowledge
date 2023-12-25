import { Container } from "@mui/material";
import CreateSubject from "../components/user/CreateSubject";

const SubjectCreatePage = () => {
  return (
    <Container maxWidth="md" sx={{ paddingY: 3 }}>
      <CreateSubject />
    </Container>
  );
};
export default SubjectCreatePage;
