import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// const BACKEND_URL= process.env.BACKEND_URL || 'http://localhost:3333/'

const authAxios = axios.create({
  baseURL: "http://localhost:3333/",
  timeout: 30000,
});

const token = localStorage.getItem("accessToken") || "";
authAxios.defaults.headers.common["Authorization"] = "Bearer " + token;

authAxios.interceptors.response.use(response=>response,
  (err) => {
    if (err.response.status === 401) {
      window.location.href = "/login";
    }
    if (err.response.status === 403) {
      console.log(`You must be admin to use this function`);
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
  }
);

export { authAxios };
