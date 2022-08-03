import axios from "axios";

// Di sini kita membuat instance dari axios
const rawgInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    // TODO: Jangan lupa masukkan API_KEY yang benarnya di sini yah !
    key: process.env.REACT_APP_RAWG_KEY,
  },
});

// Jangan lupa diexport karena akan digunakan di tempat lainnya
export default rawgInstance;
