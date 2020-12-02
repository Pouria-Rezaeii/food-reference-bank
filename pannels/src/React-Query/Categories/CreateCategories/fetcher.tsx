import { axiosInstance } from '../../../services/axios/axios';
import {ICreateCategory} from "../../../services/utils/api/Admin/models";
const baseAdminUrl = "/data_bank/admin";
export const fetcher=async(newCategory:ICreateCategory)=>{
    const response=await axiosInstance.post(`${baseAdminUrl}/category/`, newCategory)
    return response.data;
}
