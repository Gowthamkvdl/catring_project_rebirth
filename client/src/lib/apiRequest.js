import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://catring-project-rebirth.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
