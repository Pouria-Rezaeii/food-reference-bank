import { axiosInstance } from "./../../../axios/axios";
// import { CityApi } from "./models";

export const baseCityUrl = "/cities/";
const addCompanySliderConfigReq = {
  headers: {
    "content-type": "multipart/form-data",
  },
};
export const apiCity: CityApi = {
  getCities: () => axiosInstance.get(`${baseCityUrl}`),

};
 ///**********I don`t use this file */