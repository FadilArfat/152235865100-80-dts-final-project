import React from "react";
import { Box, Card, CardMedia, CardContent, Typography, Button, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import mature from "../platforms/mature.png";
import teen from "../platforms/teen.png";
import rating_pending from "../platforms/rating-pending.png";
import everyone from "../platforms/everyone.png";
import everyone_10 from "../platforms/everyone-10+.png";
import early_childhood from "../platforms/early-childhood.png";
import android from "../platforms/android.svg";
import ios from "../platforms/ios.svg";
import linux from "../platforms/linux.svg";
import mac from "../platforms/mac.svg";
import nintendo from "../platforms/nintendo.svg";
import pc from "../platforms/pc.svg";
import playstation from "../platforms/playstation.svg";
import sega from "../platforms/sega.svg";
import web from "../platforms/web.svg";
import xbox from "../platforms/xbox.svg";

// Di sini kita mengetahui bahwa nantinya CardMovie akan menerima
// suatu data dari ListMovie, maka kita langsung saja
// menerima props di sini
const CardGame = ({ propsGame }) => {
  let esrb = "";

  if (propsGame.esrb_rating.name === "Mature") {
    esrb = mature;
  } else if (propsGame.esrb_rating.name === "Teen") {
    esrb = teen;
  } else if (propsGame.esrb_rating.name === "Rating Pending") {
    esrb = rating_pending;
  } else if (propsGame.esrb_rating.name === "Everyone") {
    esrb = everyone;
  } else if (propsGame.esrb_rating.name === "Everyone 10+") {
    esrb = everyone_10;
  } else if (propsGame.esrb_rating.name === "Early Childhood") {
    esrb = early_childhood;
  }

  const a = propsGame.parent_platforms.map((h) => h.platform.slug);
  const b = a.map((c) => c);
  const pla = "";

  return (
    <Card sx={{ width: "fit-content", background: "none" }}>
      <Box className="boxy" sx={{ display: "flex", flexDirection: "column", alignItems: "start", height: "fit-content", background: "rgb(23,26,33)" }}>
        <CardMedia component="img" className="zoom" image={propsGame.background_image} alt={propsGame.name} sx={{ width: "40vh" }} />
        <img style={{ zIndex: 2, position: "absolute", padding: "5px 0px 0px 5px" }} src={esrb} alt={`${propsGame.esrb_rating.name}`} />

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
          <Typography component="div" variant="body1" sx={{ textAlign: "center", color: "white", fontWeight: "bold" }}>
            {propsGame.name}
          </Typography>
          <Rating value={propsGame.rating} precision={0.5} readOnly />

          <Link to={`/DetailGame/${propsGame.id}`}>
            <Button variant="contained">Details</Button>
          </Link>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CardGame;
