import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";

export default configureStore({
  reducer: {
    games: gameReducer,
  },
});
