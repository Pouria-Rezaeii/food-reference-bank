import { IAdminApi } from "./models";
import {axiosInstance} from "../../axios/axios";

const baseAdminUrl = "/bank";
export const adminApi: IAdminApi = {
  getCompanies: (params) =>
    axiosInstance.get(`${baseAdminUrl}/companies/`,{params}),
  createCompany: (company) =>
    axiosInstance.post(`${baseAdminUrl}/companies/`, company),
  getCompany: (id) => axiosInstance.get(`${baseAdminUrl}/companies/${id}/`),
  editCompany: ({id , ...newData}) =>
    axiosInstance.patch(`${baseAdminUrl}/companies/${id}/`, newData),
  deleteCompany: (id) =>
    axiosInstance.delete(`${baseAdminUrl}/companies/${id}/`),
};



