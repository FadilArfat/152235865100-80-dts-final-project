import React from "react";
import { Box } from "@mui/material";
import styles from "./Home.module.css";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <>
      <Box className={styles.container}>
        <img src={logo} alt="logo" style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }} />
      </Box>
    </>
  );
};

export default Home;
