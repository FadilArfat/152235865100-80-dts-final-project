import React from "react";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import HomePage from "./containers/Home";
import ListGames from "./containers/ListGames";
import login from "./assets/login.jpg";

function App() {
  return (
    <div className="App" style={{ background: `url(${login}) no-repeat fixed`, width: "100%", backgroundSize: "cover", position: "absolute", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <NavBar />
        <HomePage />
        <section style={{ paddingLeft: 16, paddingRight: 16 }}>
          <ListGames />
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default App;
