import React, { useContext } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../authentication/firebase";
import WishListContext from "../context/WishListCnotext";

const CardWishList = ({ propsGame }) => {
  const user = auth.currentUser;
  const docRef = doc(db, "favorites", user?.uid);
  const { getUserData, list } = useContext(WishListContext);

  const handleDelete = async (passedId, e) => {
    try {
      const copy = list.game?.filter((obj) => obj.id !== passedId);
      await updateDoc(docRef, { game: copy });
      getUserData();
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
    alert(`${passedId} Berhasil dihapus`);
  };

  return (
    <Card sx={{ width: "fit-content", background: "none" }}>
      <Box
        className="boxy bg-red-600"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          height: "100%",
          borderRadius: "16px",
        }}
      >
        <CardMedia
          component="img"
          className="zoom"
          image={propsGame?.background_image}
          alt={propsGame?.name}
          sx={{ width: "40vh" }}
        />

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 1,
            width: "100%",
          }}
        >
          <Typography
            component="div"
            variant="body1"
            sx={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              maxWidth: "30vh",
            }}
          >
            {propsGame?.name}
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
              width: "100%",
            }}
          >
            <Link to={`/DetailGame/${propsGame?.id}`}>
              <button className="py-2 px-6 text-red-600 bg-gray-100 rounded-sm shadow-xl hover:bg-gray-200 hover:text-red-700">
                Details
              </button>
            </Link>
            <Button
              variant="contained"
              color="error"
              onClick={(e) => handleDelete(propsGame.id, e)}
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CardWishList;
