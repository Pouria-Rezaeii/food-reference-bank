import { axiosInstance } from '../../../services/axios/axios';
import {ICompnayProducts} from "../../../services/utils/api/models";
const baseAdminUrl = "/store";
export const GetFetcher=async(_:never,id:number)=>{
    const response=await axiosInstance.get<ICompnayProducts>(`${baseAdminUrl}/my_company_products/${id}/`)
    return response.data;
}