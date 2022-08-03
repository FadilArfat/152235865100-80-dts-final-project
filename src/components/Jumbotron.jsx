import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const jumbotron = ({ propsGame }) => {
  return (
    <Box>
      <Link to={`/DetailGame/${propsGame.id}`}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { md: "80px", xs: "30px", sm: "30px" },
            marginTop: "0px",
            paddingTop: { md: "300px", xs: "50px" },
            fontWeight: "bold",
            backgroundSize: "cover",
            paddingBottom: "-10px",
            backgroundRepeat: "no-repeat",
            backgroundColor: "gray",
            color: "whitesmoke",
            backgroundImage: `url(${propsGame.background_image})`,
            height: {
              xs: "30vh",
              sm: "40vh",
              md: "80vh",
            },
            width: "100%",
            position: "relative",
            zIndex: -1,
            borderRadius: "5px",
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { md: "80px", xs: "30px", sm: "50px" }, position: "absolute", zIndex: 100, marginLeft: 5, marginTop: 8, textShadow: "-7px 3px 9px #000000", fontWeight: "bold" }}>
            {propsGame.name}
          </Typography>
        </Typography>
      </Link>
    </Box>
  );
};

export default jumbotron;
