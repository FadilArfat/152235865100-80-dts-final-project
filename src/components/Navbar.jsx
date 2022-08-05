import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { keluarDariAplikasi } from "../authentication/firebase";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();

  const buttonLogoutOnClickHandler = async () => {
    await keluarDariAplikasi();
    navigate("/login");
  };

  return (
    <Box className={styles.grow}>
      <AppBar sx={{ background: "rgb(23,26,33)" }} position="sticky">
        <Toolbar sx={{ width: "90%", margin: "0 5% 0 5%" }}>
          <Link to="/" style={{ display: "flex", flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Gaming and Chill
            </Typography>
          </Link>
          <Button color="inherit" onClick={buttonLogoutOnClickHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
