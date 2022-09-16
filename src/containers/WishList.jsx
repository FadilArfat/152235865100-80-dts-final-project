import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, CircularProgress, Typography } from "@mui/material";
import login from "../assets/login.jpg";
import CardWishList from "../components/CardWishList";
import WishListContext from "../context/WishListCnotext";
import { useSelector } from "react-redux";
import { getUserData } from "../app/userSlice";

const WishList = (props) => {
  const list = useSelector(getUserData);
  const [loading] = useState(false);

  return (
    <div style={{ background: `url(${login}) no-repeat fixed`, overflow: "hidden", width: "100%", backgroundSize: "cover", position: "absolute" }}>
      <div style={{ background: "rgb(1,1,6,0.8)", overflow: "hidden" }}>
        <Navbar />
        <Box className="container" style={{ paddingTop: "5rem", minHeight: "100vh" }}>
          <Typography variant="h3" sx={{ color: "white" }}>
            WishList
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
            <WishListContext.Provider value={{ getUserData, list }}>
              {list.game?.length === 0 ? (
                <Typography sx={{ color: "white" }} variant="h3">
                  You do not have wish yet
                </Typography>
              ) : (
                ""
              )}
              {loading === true ? (
                <CircularProgress />
              ) : (
                list.game?.map((propsGame) => {
                  return <CardWishList key={propsGame.id} propsGame={propsGame} />;
                })
              )}
            </WishListContext.Provider>
          </Box>
        </Box>

        <Footer />
      </div>
    </div>
  );
};

export default WishList;
