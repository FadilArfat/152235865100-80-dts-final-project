import axios from "axios";

// Di sini kita membuat instance dari axios
const rawgInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    // TODO: Jangan lupa masukkan API_KEY yang benarnya di sini yah !
    key: "bda281be14f1457c974da1e78f3cc6d5",
  },
});

// Jangan lupa diexport karena akan digunakan di tempat lainnya
export default rawgInstance;
