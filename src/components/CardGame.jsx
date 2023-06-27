import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CardGame = ({ propsGame }) => {
  return (
    <Card
      sx={{
        width: "fit-content",
        background: "white",
        marginLeft: "0.1rem",
        marginRight: "0.1rem",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        className="zoom"
        image={propsGame.background_image}
        alt={propsGame.name}
        sx={{ width: "40vh" }}
      />
      {propsGame.esrb_rating ? (
        <img
          style={{
            zIndex: 2,
            position: "absolute",
            padding: "5px 0px 0px 5px",
            top: "5px", // Adjust the top positioning as needed
            left: "5px", // Adjust the left positioning as needed
          }}
          src={require(`../platforms/${propsGame.esrb_rating?.slug}.png`)}
          alt="mature"
        />
      ) : (
        <img
          style={{
            zIndex: 2,
            position: "absolute",
            top: "5px", // Adjust the top positioning as needed
            left: "5px", // Adjust the left positioning as needed
            padding: "5px 0px 0px 5px",
          }}
          src={require(`../platforms/null.png`)}
          alt="belum"
        />
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
        <ul
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "baseline",
          }}
        >
          {propsGame.parent_platforms &&
            propsGame.parent_platforms.map((platform) => {
              const { id, slug } = platform.platform;
              return (
                <li key={id}>
                  <img
                    style={{ width: "20px" }}
                    src={require(`../platforms/${slug}.svg`)}
                    alt={id}
                  />
                </li>
              );
            })}
        </ul>
        <Typography
          component="div"
          variant="body1"
          sx={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            maxWidth: "30vh",
          }}
        >
          {propsGame.name}
        </Typography>
        {/* <Rating value={propsGame.rating} precision={0.5} readOnly /> */}

        <Link to={`/DetailGame/${propsGame.id}`}>
          <button className="py-1 px-2  rounded-md text-gray-100 bg-red-600">
            Details
          </button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CardGame;
