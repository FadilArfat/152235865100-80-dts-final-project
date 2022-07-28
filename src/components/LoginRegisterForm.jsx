import React, { useState, useEffect } from "react";
import styles from "./LoginRegisterForm.module.css";
import { Grid, Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, googleSignIn, loginDenganEmailDanPassword, registerDenganEmailDanPassword, resetPassword } from "../authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleButton } from "react-google-button";
import Footer from "./Footer";
import bg from "../assets/login.jpg";
import logo from "../assets/logo.png";

const LoginOrRegisterForm = ({ loginOrRegister }) => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

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

  const loginHandler = () => {
    loginDenganEmailDanPassword(credential.email, credential.password);
  };

  const registerHandler = () => {
    registerDenganEmailDanPassword(credential.email, credential.password);
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
    <div style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
        <Box className={styles.boxy} component="form" noValidate>
          <img src={`${logo}`} alt="logo" style={{ width: "40vh" }} />
          <Typography variant="body1">{loginOrRegister === "login" ? "Login Page" : "Register Page"}</Typography>

          <TextField label="Email" type="email" variant="filled" size="small" value={credential.email} onChange={textFieldEmailOnChangeHandler} />

          <TextField label="password" type="Password" variant="filled" size="small" value={credential.password} onChange={textFieldPasswordOnChangeHandler} />

          {loading ? (
            <Typography variant="caption" display="block">
              Initializing...
            </Typography>
          ) : null}
          <Button variant="outlined" size="small" onClick={buttonLoginOrRegisterOnClickHandler}>
            {loginOrRegister === "login" ? "Login" : "Register Account"}
          </Button>

          {loginOrRegister === "login" ? (
            <Button variant="outlined" size="small" onClick={buttonResetPasswordHandler}>
              Reset Password
            </Button>
          ) : null}

          <Typography varian="body1" textAlign={"center"}>
            Or
          </Typography>

          <GoogleButton style={{ alignItems: "center", justifyContent: "center", margin: "auto" }} onClick={handleGoogleSignIn} />
          {loginOrRegister === "login" ? (
            <Link to="/register">
              <Typography variant="body1">or do you want Register ?</Typography>
            </Link>
          ) : (
            <Link to="/login">
              <Typography variant="body1">or do you want Login ?</Typography>
            </Link>
          )}
        </Box>
      </Grid>
      <Footer />
    </div>
  );
};

export default LoginOrRegisterForm;
