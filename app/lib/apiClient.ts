import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:4000/api",
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,

  headers: {
    "Contet-Type": "application/json",
  },
});

export default apiClient;
