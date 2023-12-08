"use client";
import { useState } from "react";
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
  Tooltip,
  MenuItem,
  Divider,
} from "@mui/material";
import { School } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const router = useRouter();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserMenu = (link) => {
    router.push(link);
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box
            component={Link}
            href="/"
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
              href="/all-gk"
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
              href="/all-subject"
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

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" sx={{ width: 30, height: 30 }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", paddingY: "0" }}
              disableGutters
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
              open={Boolean(anchorElUser)}
              onClose={() => handleUserMenu("/")}
            >
              <MenuItem onClick={() => handleUserMenu("/user/profile")}>
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleUserMenu("/user/add-gk")}>
                <Typography textAlign="center">Add GK</Typography>
              </MenuItem>

              <MenuItem onClick={() => handleUserMenu("/user/add-subject")}>
                <Typography textAlign="center">Add Subject</Typography>
              </MenuItem>

              <Divider />
              <MenuItem onClick={() => handleUserMenu("/user/logout")}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
