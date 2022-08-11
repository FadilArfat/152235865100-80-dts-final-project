import axios from "axios";

const rawgInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    //REACT_APP_RAWG_KEY
    //"8389aa7c48574208963de2cf90cabcaa"
    key: process.env.REACT_APP_RAWG_KEY,
  },
});

export default rawgInstance;
