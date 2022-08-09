import React from "react";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import HomePage from "./containers/Home";
import ListGames from "./containers/ListGames";
import login from "./assets/login.jpg";

function App() {
  return (
    <div className="App" style={{ background: `url(${login}) no-repeat fixed`, overflow: "hidden", width: "100%", backgroundSize: "cover", position: "absolute" }}>
      <div style={{ background: "rgb(1,1,6,0.8)", overflow: "hidden" }}>
        <NavBar />
        <HomePage />
        <section style={{ paddingLeft: 16, paddingRight: 16 }}>
          <ListGames />
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default App;
