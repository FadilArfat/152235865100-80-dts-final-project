import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
  gamesDetail: [],
};

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    addGames: (state, { payload }) => {
      state.games = payload;
    },
    addGamesDetail: (state, { payload }) => {
      state.gamesDetail = payload;
    },
  },
});

export const { addGames, addGamesDetail } = gameSlice.actions;
export const getAllGames = (state) => state.games.games;
export const getGamesDetail = (state) => state.games.gamesDetail;
export default gameSlice.reducer;
