import { useState } from "react";
import { logout } from "../../redux/features/auth/authSlice";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  Divider,
  Stack,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AddCircleOutlineRounded,
  School,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCreate, setAnchorElCreate] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenCreateMenu = (event) => {
    setAnchorElCreate(event.currentTarget);
  };

  const handleUserMenu = (link) => {
    if (link === "/user/logout") {
      dispatch(logout());
      navigate("/");
    }
    navigate(link);
    setAnchorElUser(null);
  };

  const handleCreateMenu = (link) => {
    navigate(link);
    setAnchorElCreate(null);
  };

  return (
    <AppBar position="sticky" sx={{ boxShadow: 0 }}>
      <Container maxWidth="md">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <School sx={{ mr: 1 }} />

            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GK
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button
              component={Link}
              to="/all-gk"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textAlign: "center",
              }}
            >
              All Gk
            </Button>
            <Button
              component={Link}
              to="/all-subject"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textAlign: "center",
              }}
            >
              All Subject
            </Button>
          </Box>

          {user ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <SearchBox />
              <Box>
                <IconButton onClick={handleOpenCreateMenu} sx={{ p: 0 }}>
                  <AddCircleOutlineRounded
                    sx={{ width: 26, height: 26, color: "white" }}
                  />
                </IconButton>

                <Menu
                  sx={{ mt: "45px", paddingY: "0", width: "300px" }}
                  anchorEl={anchorElCreate}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  open={Boolean(anchorElCreate)}
                  onClose={() => handleCreateMenu()}
                >
                  <MenuItem onClick={() => handleCreateMenu("/user/gk/create")}>
                    Create GK
                  </MenuItem>

                  <MenuItem
                    onClick={() => handleCreateMenu("/user/subject/create")}
                  >
                    <Typography textAlign="center">Create Subject</Typography>
                  </MenuItem>
                </Menu>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.name} sx={{ width: 24, height: 24 }} />
                </IconButton>

                <Menu
                  sx={{ mt: "45px", paddingY: "0" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  slotProps={{
                    paper: { sx: { width: 250 } },
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={() => handleUserMenu()}
                >
                  <MenuItem onClick={() => handleUserMenu("/user/profile")}>
                    Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => handleUserMenu("/user/my-gk")}>
                    <Typography textAlign="center">My Gk</Typography>
                  </MenuItem>

                  <MenuItem onClick={() => handleUserMenu("/user/my-subject")}>
                    <Typography textAlign="center">My Subject</Typography>
                  </MenuItem>

                  <MenuItem onClick={() => handleUserMenu("/user/bookmerk")}>
                    <Typography textAlign="center">Bookmerks</Typography>
                  </MenuItem>

                  <Divider />
                  <MenuItem onClick={() => handleUserMenu("/user/logout")}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} alignItems="center">
              <SearchBox />

              <Button
                component={Link}
                to="/login"
                variant="outlined"
                startIcon={<AccountCircleOutlined />}
                sx={{
                  width: "102px",
                  color: "#fff",
                }}
              >
                Login
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
