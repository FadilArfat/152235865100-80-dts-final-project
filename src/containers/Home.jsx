import React from "react";
import { Box } from "@mui/material";
import styles from "./Home.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Box className={styles.container} sx={{ marginTop: "4rem" }}>
        <Link to={"/"}>
          <img src={logo} alt="logo" style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }} />
        </Link>
      </Box>
    </>
  );
};

export default Home;
