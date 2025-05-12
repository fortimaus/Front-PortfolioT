import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7047/api",
  headers: {
    "Content-type": "application/json"
  }
});