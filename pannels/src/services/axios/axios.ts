import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production" ? "http://techdoon.ir/api" : "/api";
export const axiosInstance = axios.create({
  baseURL,
});

// export const axiosInstanceNoAuth = axios.create({
//   baseURL: "https://api.restino.ir/accounts/api/v1",
// });

// axiosInterceptor(axiosInstance);
