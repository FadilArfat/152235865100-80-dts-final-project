import React from "react";
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { keluarDariAplikasi } from "../authentication/firebase";
import { BiBookHeart, BiLogOut } from "react-icons/bi";

import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { getUserData } from "../app/userSlice";

const Navbar = () => {
  let navigate = useNavigate();
  const list = useSelector(getUserData);

  const buttonLogoutOnClickHandler = async () => {
    await keluarDariAplikasi();
    navigate("/login");
  };

  return (
    <Box className={styles.grow}>
      <AppBar sx={{ background: "rgb(23,26,33)" }} position="fixed">
        <Toolbar sx={{ width: "90%", margin: "0 5% 0 5%" }}>
          <Link to="/" style={{ display: "flex", flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bolder", textShadow: "text-shadow: -10px 1px 2px #000000" }}>
              GAMING <span style={{ color: "red", background: "white" }}>AND</span> CHILL
            </Typography>
          </Link>
          <div style={{ marginRight: "20px", display: "flex", alignItems: "baseline" }}>
            <Button onClick={() => navigate("/wishlist")} sx={{ flexGrow: 1, color: "white" }}>
              <BiBookHeart style={{ marginRight: "5px" }} size={14} />
              WishList
            </Button>
          </div>
          <Button color="inherit" onClick={buttonLogoutOnClickHandler} sx={{ background: "red" }}>
            <BiLogOut />
            Logout
          </Button>
          <Avatar alt="Remy Sharp" src={list.images === null || "" ?  "/static/images/avatar/1.jpg" : list.images }    sx={{ width: 26, height: 26, marginLeft: "1rem"}}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
