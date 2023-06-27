// di sini kita import apis/rawg.js
import rawg from "../apis/rawg";

import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import "./ListGames.css";
import CardGame from "../components/CardGame";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Jumbotron from "../components/Jumbotron";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addGames, getAllGames } from "../app/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import "../App.css";
import { motion } from "framer-motion";

const ListGames = () => {
  //process.env.REACT_APP_RAWG_KEY
  const api_key = process.env.REACT_APP_RAWG_KEY;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [showJumbotron, setShowJumbotron] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const games = useSelector(getAllGames);
  const dispatch = useDispatch();
  let params = useParams();

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

  const navigate = useNavigate();
  const genre = [
    { name: "upcoming", filter: `&dates=${currentDate},${nextYear}` },
    { name: "new games", filter: `&dates=${lastYear},${currentDate}` },
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
    { name: "search", filter: `&search=${search}` },
  ];

  let ye = "";
  genre?.map((isi) => {
    if (isi.name === params.name) {
      return (ye = isi.filter);
    }
    return "";
  });

  const fetchDatGames = async (search) => {
    try {
      setLoading(true);
      const responseDariRAWG = await rawg.get(
        `https://api.rawg.io/api/games?key=${api_key}${search}${ye}&page=${currentPage}`
      );
      const gameArray = await Promise.all(responseDariRAWG.data.results);
      setTotalPages(responseDariRAWG.data.count);
      dispatch(addGames(gameArray));

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const changeGendre = (page) => {
    fetchDatGames();
    setCurrentPage(page);
  };

  const handleSeacrh = () => {
    fetchDatGames();
    setCurrentPage(1);
    navigate("search");
    setShowJumbotron(false);
  };

  useEffect(() => {
    fetchDatGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ye, currentPage]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings_too = {
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // console.log(games.map((game) => game.name));
  return (
    <div className="container bg-gray-100">
      <div className="bg-gray-50 border-2 p-2 mb-4 rounded-lg flex flex-col md:flex-row justify-center md:justify-between items-center">
        <motion.input
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          viewport={{ once: true }}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-50 w-full md:w-3/4 py-2 px-3 text-gray-800 rounded-lg focus:outline-none mb-3 md:mb-0"
          type="text"
          placeholder="input game name"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSeacrh();
            }
          }}
        />

        <button
          onClick={handleSeacrh}
          className="p-2 rounded-md text-gray-500 bottom-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-emerald-900"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        viewport={{ once: true }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "100%",

            color: "black",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
          className="bg-gray-100"
        >
          {isMobile ? (
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ color: "black" }}
              >
                Genres
              </InputLabel>
              <Select
                value={params.name}
                onChange={(e) => changeGendre(1, e.target.value)}
                style={{ color: "white" }}
                label="Gendres"
                id="demo-simple-select-label"
                labelId="demo-simple-select-label"
              >
                {genre.map(({ name }) => (
                  <MenuItem key={name} value={name}>
                    {name !== "search" ? name : null}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            genre.slice(0, -1).map(({ name }) => (
              <Link key={name} to={name} className="text-center">
                <div className="mx-2 my-1 bg-red-500 py-1 px-2 rounded-md">
                  <button
                    className="text-white"
                    onClick={(e) => changeGendre(1)}
                  >
                    {name !== "search" ? name : null}
                  </button>
                </div>
              </Link>
            ))
          )}
        </Toolbar>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
      >
        <Slider {...settings_too}>
          {loading === true ? (
            <Skeleton height={400} />
          ) : (
            showJumbotron &&
            (games.length === 0 ? (
              <p>Games not found</p>
            ) : (
              games?.map((game) => {
                return <Jumbotron key={game.id} propsGame={game} />;
              })
            ))
          )}
        </Slider>
      </motion.div>
      {loading === true ? (
        <Skeleton style={{ marginTop: "10px" }} width={270} height={30} />
      ) : (
        <Typography
          variant="h4"
          sx={{
            color: "black",
            fontWeight: "bolder",
            marginTop: "5%",
            marginBottom: "1rem",
          }}
        >
          List of Games
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {games?.map((game) => (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            viewport={{ once: true }}
          >
            <CardGame key={game.id} propsGame={game} />
          </motion.div>
        ))}
      </Box>
      {totalPages && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => {
              setCurrentPage(selected + 1);
              fetchDatGames();
            }}
            containerClassName={"pagination"}
            pageLinkClassName={"page-num"}
            previousLinkClassName={"page-num"}
            nextLinkClassName={"page-num"}
            activeClassName={"active"}
            forcePage={currentPage - 1}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ListGames;
