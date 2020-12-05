import { axiosInstance } from '../../../services/axios/axios';
import {ICompanyRes} from "../../../services/utils/api/models";
const baseAdminUrl = "/data_bank/admin";
export const GetFetcher=async()=>{
    const response=await axiosInstance.get<ICompanyRes[]>(`${baseAdminUrl}/companies`)
    return response.data;
}
