import React, { useState, useEffect } from "react";
import styles from "./LoginRegisterForm.module.css";
import { Grid, Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, db, googleSignIn, loginDenganEmailDanPassword, registerDenganEmailDanPassword, resetPassword } from "../authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleButton } from "react-google-button";
import bg from "../assets/login.jpg";
import logo from "../assets/logo.png";
import { doc, setDoc } from "firebase/firestore";

const LoginOrRegisterForm = ({ loginOrRegister }) => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  console.log(loading);

  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const textFieldEmailOnChangeHandler = (event) => {
    setCredential({
      ...credential,
      email: event.target.value,
    });
  };

  const textFieldPasswordOnChangeHandler = (event) => {
    setCredential({
      ...credential,
      password: event.target.value,
    });
  };

  const loginHandler = async () => {
    try {
      await loginDenganEmailDanPassword(credential.email, credential.password);
    } catch (error) {
      console.log(error);
    }
  };

  const registerHandler = async () => {
    try {
      await registerDenganEmailDanPassword(credential.email, credential.password);
      await setDoc(doc(db, "favorites", auth.currentUser.uid), { uid: auth.currentUser.uid, game: [], email: credential.email });
    } catch (error) {
      console.log(error);
    }
  };

  const buttonLoginOrRegisterOnClickHandler = () => {
    if (loginOrRegister === "login") {
      loginHandler();
    } else {
      registerHandler();
    }
  };

  const buttonResetPasswordHandler = async () => {
    await resetPassword(credential.email);
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  return (
    <div style={{ width: "100%", backgroundImage: `url(${bg})`, backgroundSize: "cover", position: "absolute" }}>
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "50%",
            xl: "50%",
          },
          background: {
            xs: "none",
            sm: "none",
            md: "rgb(255,255,255)",
            xl: "rgb(255,255,255)",
          },
        }}
      >
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
          <Box className={styles.boxy} component="form" noValidate>
            <img src={`${logo}`} alt="logo" style={{ width: { xs: "40vh", sm: "40vh", md: "50vh", xl: "50vh" } }} />
            <Typography variant="body1" sx={{ textAlign: "center", marginTop: "20px", color: "gray" }}>
              {loginOrRegister === "login" ? "Welcome to Gaming And Chill" : "Register Page"}
            </Typography>

            <TextField label="Email" type="email" variant="standard" size="small" value={credential.email} onChange={textFieldEmailOnChangeHandler} />

            <TextField label="password" type="Password" variant="standard" size="small" value={credential.password} onChange={textFieldPasswordOnChangeHandler} />

            {loading ? (
              <Typography variant="caption" display="block">
                Initializing...
              </Typography>
            ) : null}
            <Button variant="contained" color="error" size="small" onClick={buttonLoginOrRegisterOnClickHandler}>
              {loginOrRegister === "login" ? "Login" : "Register Account"}
            </Button>

            {loginOrRegister === "login" ? (
              <Button variant="text" size="small" onClick={buttonResetPasswordHandler}>
                Forgot Password?
              </Button>
            ) : null}

            <Typography varian="body1" textAlign={"center"}>
              Or
            </Typography>

            <GoogleButton style={{ alignItems: "center", justifyContent: "center", margin: "auto" }} onClick={handleGoogleSignIn} />
            {loginOrRegister === "login" ? (
              <Link to="/register">
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  or do you want Register ?
                </Typography>
              </Link>
            ) : (
              <Link to="/login">
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  or do you want Login ?
                </Typography>
              </Link>
            )}
          </Box>
        </Grid>
      </Box>
    </div>
  );
};

export default LoginOrRegisterForm;
