import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Contet-Type": "application/json",
  },
});

export default apiClient;
