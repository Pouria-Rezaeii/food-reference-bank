import axios from "axios";

const baseURL = "/api";
const serverSideBaseUrl = "http://techdoon.ir/api";
export const axiosInstance = axios.create({
  baseURL,
});
export const axiosServerSideInstance = axios.create({
  baseURL: serverSideBaseUrl,
});

// export const axiosInstanceNoAuth = axios.create({
//   baseURL: "https://api.restino.ir/accounts/api/v1",
// });
// export const axiosInstanceServer = axios.create({
//   baseURL: "https://api.restino.ir/accounts/api/v1",
// });

// axiosInterceptor(axiosInstance , req);
// axiosServerInterceptor(axiosInstanceServer);
