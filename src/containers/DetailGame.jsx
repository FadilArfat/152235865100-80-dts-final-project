import rawg from "../apis/rawg";

import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography, Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Trailers from "../components/Trailers";

const DetailGame = () => {
  const [games, setGames] = useState([]);
  let params = useParams();

  useEffect(() => {
    const GameID = params.gameId;

    const fetchDataGames = async () => {
      try {
        // Gunakan instance rawg di sini
        const responseDariRAWG = await rawg.get(
          // Nah di sini kita tidak perlu menuliskan terlalu panjang lagi
          `/games/${GameID}`
        );
        // Jangan lupa set statenya
        // Perhatikan di sini responseDarirawg ada .data (response schema axios)
        setGames(responseDariRAWG.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataGames();
  }, [params.gameId]);

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "black",
        backgroundImage: games.background_image_additional !== null ? `url(${games.background_image_additional})` : `url(${games.background_image})`,
        height: "150vh",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        marginTop: 0,
      }}
    >
      <div style={{ background: "linear-gradient(180deg, rgba(34,193,195,0) 0%, rgba(0,0,0,1) 82%)", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        <Navbar />
        <Card className="boxy" sx={{ background: "rgba(79, 79, 79, 0.5)", position: "relative", marginTop: 0, height: "100vh" }}>
          <Box className="boxy" sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Box sx={{ width: "30%" }}>
              <CardMedia component="img" sx={{ height: "50vh", objectFit: "cover", width: "50vh" }} image={`${games.background_image}`} alt={games.title} />
              <Typography variant="body1" sx={{ color: "white", fontWeight: "bolder" }}>
                Get It now :
              </Typography>
              {games.stores?.length > 0 ? (
                <ul style={{ color: "white" }}>
                  {games.stores &&
                    games.stores.map((store) => {
                      const { id, name, domain } = store.store;
                      return (
                        <li key={id}>
                          <a href={domain}>{name}</a>
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                  Sorry We Couldn't Find Any Stores
                </Typography>
              )}
            </Box>
            <Box sx={{ width: "70%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: 1,
                  color: "white",
                }}
              >
                <Typography component="div" sx={{ fontWeight: "bold" }} variant="h3">
                  {games.name}
                </Typography>
                <ul style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "baseline" }}>
                  {games.parent_platforms &&
                    games.parent_platforms.map((platform) => {
                      const { id, slug } = platform.platform;
                      return (
                        <li key={id}>
                          <img style={{ width: "20px" }} src={require(`../platforms/${slug}.svg`)} alt={id} />
                        </li>
                      );
                    })}
                </ul>

                <Typography variant="body2">
                  Developer:{" "}
                  {games.developers?.map((developer) => {
                    const { name } = developer;
                    return <Typography variant="body2">{name}</Typography>;
                  })}
                </Typography>
                <Typography variant="body2">Release date: {games.released}</Typography>
                <Typography variant="body2">Playtime : {games.playtime > 0 ? `${games.playtime} Hours` : "Unknown"}</Typography>
                <Typography variant="body2">
                  Website :{" "}
                  {games.website ? (
                    <Typography variant="body2">
                      <a href={games.website}>{games.website}</a>
                    </Typography>
                  ) : (
                    <Typography variant="body2">There are no website for this game</Typography>
                  )}
                </Typography>
                <Rating name="half-rating-read" value={games.metacritic / 2} precision={0.5} readOnly />

                <Typography variant="body2">
                  Description : <br /> {games.description?.replace(/<\/?[^>]+(>|$)/g, "")}
                </Typography>
              </CardContent>
            </Box>
          </Box>
        </Card>

        {games.screenshots_count > 0 ? <Trailers /> : ""}

        <Footer sta="black" />
      </div>
    </div>
  );
};

export default DetailGame;
