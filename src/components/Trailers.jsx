import rawg from "../apis/rawg";

import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const Trailers = () => {
  const [movies, setMovies] = useState([]);
  let params = useParams();

  useEffect(() => {
    const GameID = params.gameId;

    const fetchDataGames = async () => {
      try {
        const responseDariRAWG = await rawg.get(`/games/${GameID}/movies`);

        setMovies(responseDariRAWG.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataGames();
  }, [params.gameId]);

  return (
    <div>
      <Card className="boxy" sx={{ background: "rgba(79, 79, 79, 0.5)" }}>
        <Box className="boxy" sx={{ display: "flex", flexDirection: "row", width: "max-content" }}>
          <CardContent
            sx={{
              display: "flex",
              gap: 1,
              width: "max-content",
              color: "white",
            }}
          >
            {movies.results?.map((link) => {
              return (
                <div>
                  <Typography variant="body1">{link.name}</Typography>
                  <video width="320" height="240" poster={link.preview} controls>
                    <source src={link.data.max} type="video/mp4"></source>
                  </video>
                </div>
              );
            })}
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};

export default Trailers;
