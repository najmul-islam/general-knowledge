import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useSearchGkQuery } from "../../redux/features/gk/gkApi";
import { useNavigate } from "react-router-dom";

const SearchDiv = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBox = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      searchValue: "",
    },
    onSubmit: (values) => {
      if (values.searchValue !== "") {
        navigate(`/result?search=${values.searchValue.split(" ").join("-")}`);
      }
    },
  });

  return (
    <Box>
      <SearchDiv onSubmit={formik.handleSubmit}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          type="text"
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
          name="searchValue"
          value={formik.searchValue}
          onChange={formik.handleChange}
        />
      </SearchDiv>
    </Box>
  );
};
export default SearchBox;
