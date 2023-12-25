import { Container } from "@mui/material";
import Profile from "../components/user/Profile";
const ProfilePage = () => {
  return (
    <Container maxWidth="md" sx={{ paddingY: 3 }}>
      <Profile />
    </Container>
  );
};
export default ProfilePage;
