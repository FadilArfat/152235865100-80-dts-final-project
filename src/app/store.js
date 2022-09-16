import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import userReducer from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  games: gameReducer,
  user: userReducer,
});

const persisConfig = {
  key: "root",
  storage,
  blacklist: ["games"],
};

const persistedReducer = persistReducer(persisConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
