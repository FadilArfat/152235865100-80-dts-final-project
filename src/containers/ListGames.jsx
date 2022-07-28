// di sini kita import apis/rawg.js
import rawg from "../apis/rawg";

import React, { useEffect, useState } from "react";
import { Box, Button, Toolbar, Typography } from "@mui/material";

import "./ListGames.css";
import CardGame from "../components/CardGame";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Jumbotron from "../components/Jumbotron";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CircularProgress from "@mui/material/CircularProgress";

const ListGames = () => {
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

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

  const searching = `&search=${search}`;
  const upcoming = `&dates=${currentDate},${nextYear}`;
  const new_games = `&dates=${lastYear},${currentDate}`;
  const genre = [
    { name: "action", filter: `&genres=4` },
    { name: "indie", filter: `&genres=51` },
    { name: "adventure", filter: `&genres=3` },
    { name: "rpg", filter: `&genres=5` },
    { name: "strategy", filter: `&genres=10` },
    { name: "shooter", filter: `&genres=2` },
    { name: "casual", filter: `&genres=40` },
    { name: "simulation", filter: `&genres=14` },
    { name: "puzzle", filter: `&genres=11` },
    { name: "arcade", filter: `&genres=51` },
    { name: "platformer", filter: `&genres=83` },
    { name: "racing", filter: `&genres=1` },
    { name: "sports", filter: `&genres=15` },
    { name: "fighting", filter: `&genres=6` },
  ];

  const fetchDatGames = async (event) => {
    try {
      setLoading(true);
      const responseDariRAWG = await rawg.get(`https://api.rawg.io/api/games?key=bda281be14f1457c974da1e78f3cc6d5${event}`);
      setGames(responseDariRAWG.data.results);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDatGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings_too = {
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // console.log(games.map((game) => game.name));
  return (
    <div className="container" style={{ background: "rgb(46,46,46)", border: "5px solid white", borderRadius: "10px", padding: "10px" }}>
      <Toolbar sx={{ width: "100%", display: "flex", flexWrap: "wrap", maxWidth: "100%", background: "rgb(26,26,26,0.75)", color: "white", fontWeight: "bold", marginBottom: "40px" }}>
        <Button color="inherit" onClick={(e) => fetchDatGames(upcoming)}>
          Upcoming Games
        </Button>
        <Button color="inherit" onClick={(e) => fetchDatGames(new_games)}>
          New Games
        </Button>
        {genre.map(({ name, filter }) => {
          return (
            <Button color="inherit" onClick={(e) => fetchDatGames(filter)}>
              {name}
            </Button>
          );
        })}
      </Toolbar>
      <div style={{ alignItems: "baseline", display: "flex", marginBottom: "35px" }}>
        <input style={{ width: "90%", height: "6vh", background: "none", borderRadius: "5px", color: "white", border: "3px solid black" }} type="text" onChange={(e) => setSearch(e.target.value)} />

        <Button sx={{ marginLeft: "5px" }} variant="contained" onClick={(e) => fetchDatGames(searching)}>
          Search
        </Button>
      </div>
      <Slider {...settings_too}>
        {loading === true ? (
          <Skeleton height={500} />
        ) : (
          games.map((game) => {
            return <Jumbotron key={game.id} propsGame={game} />;
          })
        )}
      </Slider>
      {loading === true ? (
        <Skeleton style={{ marginTop: "100px" }} width={270} height={30} />
      ) : (
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bolder", marginTop: "5%", textDecoration: "underline" }}>
          List of Games
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {games.map((game) => {
          return loading === true ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <CardGame key={game.id} propsGame={game} />
          );
        })}
      </Box>
    </div>
  );
};

export default ListGames;
