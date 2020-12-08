import { axiosInstance } from '../../../services/axios/axios';
import {ICompanyRes} from "../../../services/utils/api/models";
const baseAdminUrl = "/data_bank/admin";
export const EditFetcher=async({ id,...rest }:Partial<ICompanyRes>)=>{
    const response=await axiosInstance.patch<ICompanyRes[]>(`${baseAdminUrl}/companies/${id}/`,rest)
    return response.data;
}