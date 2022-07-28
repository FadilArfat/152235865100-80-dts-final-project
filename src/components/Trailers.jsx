import rawg from "../apis/rawg";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

const Trailers = () => {
  const [movies, setMovies] = useState([]);
  let params = useParams();

  useEffect(() => {
    const GameID = params.gameId;
    const fetchDataGames = async () => {
      try {
        const responseDariRAWG = await rawg.get(`/games/${GameID}/screenshots`);

        setMovies(responseDariRAWG.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataGames();
  }, [params.gameId]);

  const settings_too = {
    autoplay: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div style={{ width: "100%", height: "50vh", background: "black" }}>
      {movies.next === null ? (
        <div className="container_too" style={{ marginTop: "10px", background: "black", height: "fit-content" }}>
          <Box sx={{ background: "black", justifyContent: "center", alignItems: "baseline", margin: "5px", height: "30vh" }}>
            <Slider {...settings_too}>
              {movies.results?.map((link) => {
                return (
                  <Typography
                    className="zoom_ss"
                    variant="h1"
                    sx={{
                      marginTop: "0px",
                      paddingTop: { md: "300px", xs: "50px" },
                      backgroundSize: "cover",
                      paddingBottom: "-10px",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "black",
                      color: "whitesmoke",
                      backgroundImage: `url(${link.image})`,

                      width: "100%",
                      borderRadius: "5px",
                    }}
                  >
                    {" "}
                  </Typography>
                );
              })}
            </Slider>
          </Box>
        </div>
      ) : (
        <Typography variant="h1" sx={{ color: "white", textAlign: "center" }}>
          No Picture Found
        </Typography>
      )}
    </div>
  );
};

export default Trailers;
