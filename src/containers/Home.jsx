import React, { useEffect } from "react";
import { Box } from "@mui/material";
import styles from "./Home.module.css";
import logo from "../assets/logo.png";
import { Link, Navigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../authentication/firebase";
import { useDispatch } from "react-redux";
import { addUserData } from "../app/userSlice";

const Home = () => {
  const user = auth.currentUser;
  const dispatch = useDispatch();
  console.log("user now => ", user);

  useEffect(() => {
    const getData = async () => {
      try {
        onSnapshot(doc(db, "favorites", user?.uid), (doc) => dispatch(addUserData(doc.data())));
      } catch (error) {
        <Navigate to="/login" replace={true} />;
        console.log(error);
      }
    };
    getData();
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
