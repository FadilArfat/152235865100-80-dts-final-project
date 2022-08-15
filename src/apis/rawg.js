import axios from "axios";

const rawgInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    //REACT_APP_RAWG_KEY
    key: process.env.REACT_APP_RAWG_KEY,
  },
});

export default rawgInstance;
