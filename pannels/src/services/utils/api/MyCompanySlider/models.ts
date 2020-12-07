import { IReqFunction } from "../models";

export interface IMyCompanySlider {
  deleteMyCompanySlider: IReqFunction<undefined, number>;
  // sendMyCompanySlider:any
}
//() => new Promise((res) =>res)
export interface IMyCompanySliderRes {
  id: number;
  company: number;
  company_name: string;
  image: string;
  status: string;
  description_admin: string;
}
