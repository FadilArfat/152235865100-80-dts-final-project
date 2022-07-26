import rawg from "../apis/rawg";

import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
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
    <div style={{ backgroundImage: `url(${games.background_image_additional})`, height: "100vh", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <Navbar />
      <Card className="boxy" sx={{ background: "rgba(79, 79, 79, 0.5)" }}>
        {/* <Box>
        <Typography variant="h6">Component CardMovie</Typography>
      </Box> */}
        <Box className="boxy" sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          {/* 
          Card ada 2 tipe yang bisa dimasukkan sebagai isinya: 
          CardMedia dan CardContent 
        */}
          <CardMedia
            component="img"
            sx={{ height: "50vh", objectFit: "cover", width: "50vh" }}
            // Kita gunakan image berdasarkan prefix dari image rawg
            image={`${games.background_image}`}
            // image={games.poster_path}
            alt={games.title}
          ></CardMedia>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 1,
              color: "white",
            }}
          >
            <Typography component="div" sx={{ fontWeight: "bold" }} variant="body1">
              {games.name}
            </Typography>
            {/* 
            Karena ratingnya hanya menggunakan 5 bintang, dan rating dari
            JSON kita lebih dari 10, maka kita bagi 2

            Precision untuk menyatakan ratingnya itu dibuatkan gambarnya hingga
            per seberapanya? (0.1 = sampai 1 koma di belakang angka)
           */}

            <Typography variant="body2">Release date: {games.released}</Typography>
            <Typography variant="body2">Runtimes : {games.runtime} Minutes</Typography>
            <Typography variant="body2">
              Description : <br /> {games.description?.replace(/<\/?[^>]+(>|$)/g, "")}
            </Typography>
          </CardContent>
        </Box>
        <Box className="boxy" sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Typography variant="h6">Media</Typography>
        </Box>
      </Card>
      <Trailers />
      <Footer />
    </div>
  );
};

export default DetailGame;
