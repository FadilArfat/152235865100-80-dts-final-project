// di sini kita import apis/rawg.js
import rawg from "../apis/rawg";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import "./ListGames.css";
import CardGame from "../components/CardGame";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Jumbotron from "../components/Jumbotron";

const ListGames = () => {
  const [games, setGames] = useState([]);

  //Getting the date to get the popular, upcoming and recent games
  const getCurrentMonth = function () {
    const month = new Date().getMonth() + 1;
    if (month < 10) {
      return `0${month}`;
    } else {
      return month;
    }
  };
  const getCurrentDay = function () {
    const day = new Date().getDate();
    if (day < 10) {
      return `0${day}`;
    } else {
      return day;
    }
  };
  const currentYear = new Date().getFullYear();
  const currentMonth = getCurrentMonth();
  const currentDay = getCurrentDay();
  const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
  const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

  useEffect(() => {
    const fetchDatGames = async () => {
      try {
        const responseDariRAWG = await rawg.get("/games", {
          params: {
            dates: `${lastYear},${currentDate}`,
            ordering: "-rating",
            page_size: 20,
          },
        });
        setGames(responseDariRAWG.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDatGames();
  }, []);

  const settings_too = {
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // console.log(games.map((game) => game.name));
  return (
    <div className="bg-gray container">
      <Slider {...settings_too}>
        {games.map((game) => {
          return <Jumbotron key={game.id} propsGame={game} />;
        })}
      </Slider>
      <Typography variant="h4" sx={{ color: "white", fontWeight: "bolder", marginTop: "5%", textDecoration: "underline" }}>
        Popular Games
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {games.map((game) => {
          return <CardGame key={game.id} propsGame={game} />;
        })}
      </Box>
    </div>
  );
};

export default ListGames;
