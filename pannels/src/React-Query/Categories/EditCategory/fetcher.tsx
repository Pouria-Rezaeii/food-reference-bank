import { axiosInstance } from '../../../services/axios/axios';
import {ITableCategory} from "../../../scenes/siteManager/scenes/CategoryManager/models"
const baseAdminUrl = "/data_bank/admin";
export const fetcher =async( { id,...rest }:Partial<ITableCategory>)=>{
    const response=await axiosInstance.patch(`${baseAdminUrl}/category/${id}/`, rest)
    return response.data;
}

