import { Container } from "@mui/material";
import Search from "../components/public/search/Search";
const SearchPage = () => {
  return (
    <Container maxWidth="md" sx={{ paddingY: 3 }}>
      <Search />
    </Container>
  );
};
export default SearchPage;
