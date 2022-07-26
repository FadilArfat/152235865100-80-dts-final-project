import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./Home.module.css";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <>
      <Box className={styles.container}>
        <Typography
          variant="h3"
          sx={{ color: "whitesmoke", textAlign: "center", backgroundImage: `url(${logo})`, backgroundRepeat: "no-repeat", marginLeft: "auto", marginRight: "auto", width: "60%", height: "15vh", paddingBottom: "5vh" }}
        ></Typography>
      </Box>
    </>
  );
};

export default Home;
