import { Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="body3" sx={{ color: "white" }}>
        Copyright &copy; {new Date().getFullYear()} DTS-FINAL-PROJECT
        <a href="https://github.com/FadilArfat" style={{ color: "black", fontWeight: "bold" }}>
          {" "}
          Fadil
        </a>
      </Typography>
    </div>
  );
};

export default Footer;
