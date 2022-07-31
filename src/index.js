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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="DetailGame/:gameId"
          element={
            <ProtectedComponent>
              <DetailGame />
            </ProtectedComponent>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedComponent>
              <App />
            </ProtectedComponent>
          }
        >
          <Route path="UpcomingGames" element={<App />} />
          <Route path="NewGames" element={<App />} />
          <Route path=":name" element={<App />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
