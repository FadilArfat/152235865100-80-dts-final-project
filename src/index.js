import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import ProtectedComponent from "./components/ProtectedComponent";
import DetailGame from "./containers/DetailGame";
import WishList from "./containers/WishList";
import Utama from "./containers/Utama";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "./components/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedComponent />}>
              <Route path="DetailGame/:gameId" element={<DetailGame />} />
              <Route path="wishlist" element={<WishList />} />

              <Route path="/" element={<App />}>
                <Route path="UpcomingGames" element={<App />} />
                <Route path="NewGames" element={<App />} />
                <Route path=":name" element={<App />} />
              </Route>
            </Route>

            <Route
              path="home"
              element={
                <div>
                  <Navbar />
                  <Utama />
                </div>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
