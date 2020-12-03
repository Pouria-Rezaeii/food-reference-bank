import { axiosInstance } from '../../../services/axios/axios';
import {ICategoryRes} from "../../../services/utils/api/Admin/models";
const baseAdminUrl = "/data_bank/admin";
export const DeleteFetcher =async( id:Pick<ICategoryRes,"id">)=>{
    const response=await axiosInstance.delete(`${baseAdminUrl}/category/${id}/`)
    return response.data;
}