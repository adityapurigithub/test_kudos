import {
  Box,
  Button,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { BiLogOut } from "react-icons/bi";
import { FaHandsHelping } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { RiHeartAddLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isMD = useMediaQuery("(min-width:600px)");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      className="navbar"
      borderRadius={2}
      fontSize={{ md: "1.5rem", xs: "1rem" }}
      color="white"
      sx={{ padding: { md: 2, xs: 1 } }}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
      zIndex={2}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <FaHandsHelping size={30} />
        KudoSpot
      </Box>

      {pathname !== "/" &&
        (isMD ? (
          <Stack direction="row" gap={{ md: 2, xs: 1 }}>
            <Button
              variant="contained"
              color="warning"
              onClick={() => navigate("/analytics")}
            >
              <MdAnalytics size={20} />
              <span style={{ marginLeft: 10 }}>Analytics</span>
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/give-kudos")}
            >
              <RiHeartAddLine size={20} />
              <span style={{ marginLeft: 10 }}>Give Kudos</span>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              <BiLogOut size={20} />
              <span style={{ marginLeft: 10 }}>Logout</span>
            </Button>
          </Stack>
        ) : (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <HiOutlineMenu size={25} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  navigate("/analytics");
                  handleMenuClose();
                }}
              >
                <MdAnalytics size={20} style={{ marginRight: 10 }} />
                Analytics
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/give-kudos");
                  handleMenuClose();
                }}
              >
                <RiHeartAddLine size={20} style={{ marginRight: 10 }} />
                Give Kudos
              </MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                  handleMenuClose();
                }}
              >
                <BiLogOut size={20} style={{ marginRight: 10 }} />
                Logout
              </MenuItem>
            </Menu>
          </>
        ))}
    </Box>
  );
};

export default Navbar;
