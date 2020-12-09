import { IMyCompanySlider } from "./models";
import { axiosInstance } from "../../../axios/axios";

export const baseMyCompanySlideUrl = "/data_bank/my_company_slider";

export const myCompanySliderApi: IMyCompanySlider = {
  deleteMyCompanySlider: (id) =>
    axiosInstance.delete(`${baseMyCompanySlideUrl}/${id}`),
  // sendMyCompanySlider: async (image :File)=>{
  //   const fd = new FormData();
  //   fd.append("image", image);
  //   await axiosInstance.post(`${baseMyCompanySlideUrl}`, fd);
  // }
};
