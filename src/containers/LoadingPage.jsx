import Loader from "../assets/loader.gif";
import React from "react";

const LoadingPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <img src={Loader} alt="loader" style={{ width: "300px" }} />
      <h1 style={{ fontWeight: "bolder" }}>Loading.....</h1>
    </div>
  );
};

export default LoadingPage;
