import React, { useEffect } from "react";
import { Box } from "@mui/material";
import styles from "./Home.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../authentication/firebase";
import { useDispatch } from "react-redux";
import { addUserData } from "../app/userSlice";

const Home = () => {
  const user = auth.currentUser;
  let docRef = doc(db, "favorites", user?.uid);
  const dispatch = useDispatch();

  useEffect(() => {
    onSnapshot(docRef, (doc) => dispatch(addUserData(doc.data())));
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Box className={styles.container} sx={{ marginTop: "4rem" }}>
        <Link to={"/"}>
          <img src={logo} alt="logo" style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }} />
        </Link>
      </Box>
    </>
  );
};

export default Home;
