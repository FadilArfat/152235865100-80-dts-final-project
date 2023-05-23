import React from "react";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import HomePage from "./containers/Home";
import ListGames from "./containers/ListGames";

function App() {
  return (
    <div className="App bg-gray-100">
      <div style={{ flex: 1 }}>
        <NavBar />
        <HomePage />
        <section style={{ paddingLeft: 16, paddingRight: 16 }}>
          <ListGames />
        </section>
      </div>

      <Footer sta={"rgba(0,0,0,0.8)"} />
    </div>
  );
}

export default App;
