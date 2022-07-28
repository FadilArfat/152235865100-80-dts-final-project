import React from "react";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import HomePage from "./containers/Home";
import ListGames from "./containers/ListGames";

function App() {
  return (
    <div className="App" style={{ background: "red" }}>
      <NavBar />
      <HomePage />
      <section style={{ paddingLeft: 16, paddingRight: 16 }}>
        <ListGames />
      </section>
      <Footer />
    </div>
  );
}

export default App;
