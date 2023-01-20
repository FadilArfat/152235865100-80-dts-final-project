import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, CircularProgress, Typography, Avatar } from "@mui/material";
import login from "../assets/login.jpg";
import CardWishList from "../components/CardWishList";
import WishListContext from "../context/WishListCnotext";
import { useSelector } from "react-redux";
import { getUserData } from "../app/userSlice";
import { db, storage } from "../authentication/firebase";
import { ref,getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { BiBookHeart } from "react-icons/bi";

const WishList = (props) => {
  const list = useSelector(getUserData);
  const [loading] = useState(false);
  const [visible, setVisible] = useState(false)

  const handleSumbmit = async (e) => {
    let file = e.target.files[0];
    let fileRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log("upload is " + progress + '% done');
      getDownloadURL(fileRef).then((url) => {
        updateDoc(
        doc(db, "favorites", list.uid),
        {
            images: url
        },
      ); 
      })
      setVisible(false)
    })
  };

  return (
    <div style={{ background: `url(${login}) no-repeat fixed`, overflow: "hidden", width: "100%", backgroundSize: "cover", position: "absolute" }}>
      <div style={{ background: "rgb(1,1,6,0.8)", overflow: "hidden" }}>
        <Navbar />
        <Box className="container" style={{ paddingTop: "5rem", minHeight: "100vh" }}>
        <Box className="container" style={{ display: "flex", alignContent: "center", alignItems: "center" }}>

        <Box sx={{ display: "block", width: {sm: 100, xs: 50},
        height: {sm: 100, xs: 50}, justifyContent: "center", alignItems: "center", alignContent: "center", marginTop: {sm: "0rem", xs: "2rem"} }}>
          <Avatar alt="Remy Sharp" src={list.images === null || "" ?  "/static/images/avatar/1.jpg" : list.images } sx={{ width: {
            sm: 86,
            xs: 41
          }, height: {
            sm: 86,
            xs: 41
          },'&:hover': {
          backgroundColor:"#2196f3",
          opacity: [0.9, 0.8, 0.7],
        },}} onClick={() => setVisible(true)}/>

              <input id="files" style={{ visibility: "hidden" }} type="file" accept="image/png, image/gif, image/jpeg" onChange={handleSumbmit} />
              <label style={{ visibility: visible === false ? "hidden" : "visible", backgroundColor: "white", padding: "3px", marginRight: "1rem", marginLeft: "1rem", marginTop: "0" }} for="files">Upload</label>
        </Box>
          

{list.email === null ? (
  <Typography  sx={{ color: "white",typography: { sm: 'h3', xs: 'h5' },marginTop: {sm: "0rem", xs: "2rem"} }}>
            User
          </Typography>
) : (
  <Typography sx={{ color: "white",typography: { sm: 'h3', xs: 'h5' },marginTop: {sm: "0rem", xs: "2rem"} }}>
            {list.email}
          </Typography>
)}

        </Box>
         <Box sx={{ display: "flex",justifyContent: "center", alignItems: "center", alignContent: "center" }}>
         <BiBookHeart style={{color: "white" }} size={54} />
            <Typography sx={{ color: "white",fontWeight: "bolder",textDecoration: "underline", textAlign: "center",typography: { sm: 'h3', xs: 'h5' } }}>
            WishList
          </Typography>
          </Box>
          
          <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
            <WishListContext.Provider value={{ getUserData, list }}>
              {list.game?.length === 0 ? (
                <Typography sx={{ color: "whitesmoke" }} variant="h5">
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
