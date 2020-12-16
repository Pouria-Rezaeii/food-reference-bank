import { axiosInstance } from "./../../../axios/axios";
import { ICategoryApi } from "./models";

const baseCategoryUrl = "/category";

export const apiCategory = {
  getCategories: () =>
    axiosInstance.get(`/data_bank/category_tree/`),
  // createCategory: (obj) => {
  //   return axiosInstance.post(baseCategoryUrl, obj);
  // },
  // deleteCategory: (id) => {
  //   return axiosInstance.delete(`${baseCategoryUrl}/${id}`);
  // },
  // updateCategory: (obj) => {
  //   return axiosInstance.put(`${baseCategoryUrl}/${obj?.id}`, obj);
  // },
};
