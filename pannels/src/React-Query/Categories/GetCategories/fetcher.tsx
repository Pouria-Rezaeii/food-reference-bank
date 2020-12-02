import { axiosInstance } from '../../../services/axios/axios';
import {ICategoryRes} from "../../../services/utils/api/Admin/models";
const baseAdminUrl = "/data_bank/admin";
export const fetcher=async()=>{
    const response=await axiosInstance.get<ICategoryRes[]>(`${baseAdminUrl}/category/`)
    return response.data;
}
