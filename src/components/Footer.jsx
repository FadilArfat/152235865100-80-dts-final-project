import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Footer = ({ sta }) => {
  const [color, setColor] = useState("");
  useEffect(() => {
    const ubahColor = () => {
      setColor(sta);
    };
    ubahColor();
  }, [sta]);
  return (
    <footer
      style={{ textAlign: "center", background: `${color}`, width: "100%" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body3" sx={{ color: "white" }}>
          Copyright &copy; {new Date().getFullYear()} DTS-FINAL-PROJECT
          <a
            href="https://github.com/FadilArfat"
            style={{ color: "red", fontWeight: "bold" }}
          >
            {" "}
            FXDL
          </a>
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="https://play.google.com/store/apps/details?id=com.projectpertama&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
            <img
              style={{ height: 50 }}
              alt="Get it on Google Play"
              src="https://play.google.com/intl/id/badges/static/images/badges/en_badge_web_generic.png"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
