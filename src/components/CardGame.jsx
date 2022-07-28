import React from "react";
import { Box, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const CardGame = ({ propsGame }) => {
  return (
    <Card sx={{ width: "fit-content", background: "none" }}>
      <Box className="boxy" sx={{ display: "flex", flexDirection: "column", alignItems: "start", height: "fit-content", background: "rgb(23,26,33)" }}>
        <CardMedia component="img" className="zoom" image={propsGame.background_image} alt={propsGame.name} sx={{ width: "40vh" }} />
        {propsGame.esrb_rating ? (
          <img style={{ zIndex: 2, position: "absolute", padding: "5px 0px 0px 5px" }} src={require(`../platforms/${propsGame.esrb_rating?.slug}.png`)} alt="mature" />
        ) : (
          <img style={{ zIndex: 2, position: "absolute", padding: "5px 0px 0px 5px" }} src={require(`../platforms/null.png`)} alt="belum" />
        )}

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 1,
            width: "100%",
          }}
        >
          <ul style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "baseline" }}>
            {propsGame.parent_platforms &&
              propsGame.parent_platforms.map((platform) => {
                const { id, slug } = platform.platform;
                return (
                  <li key={id}>
                    <img style={{ width: "20px" }} src={require(`../platforms/${slug}.svg`)} alt={id} />
                  </li>
                );
              })}
          </ul>
          <Typography component="div" variant="body1" sx={{ textAlign: "center", color: "white", fontWeight: "bold", maxWidth: "30vh" }}>
            {propsGame.name}
          </Typography>
          {/* <Rating value={propsGame.rating} precision={0.5} readOnly /> */}

          <Link to={`/DetailGame/${propsGame.id}`}>
            <Button variant="contained">Details</Button>
          </Link>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CardGame;
