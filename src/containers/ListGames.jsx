// di sini kita import apis/rawg.js
import rawg from "../apis/rawg";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import "./ListGames.css";
import CardGame from "../components/CardGame";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Jumbotron from "../components/Jumbotron";

const ListGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchDatGames = async () => {
      try {
        // Gunakan instance rawg di sini
        const responseDariRAWG = await rawg.get("/games");
        // Jangan lupa set statenya
        // Perhatikan di sini responseDarirawg ada .data (response schema axios)
        setGames(responseDariRAWG.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDatGames();
  }, []);

  const settings = {
    autoplay: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const settings_too = {
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gray container">
      <Slider {...settings_too}>
        {games.map((game) => {
          return <Jumbotron key={game.id} propsGame={game} />;
        })}
      </Slider>

      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {games.map((game) => {
          return <CardGame key={game.id} propsGame={game} />;
        })}
      </Box>
    </div>
  );
};

export default ListGames;
