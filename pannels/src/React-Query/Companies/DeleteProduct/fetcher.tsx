import { axiosInstance } from '../../../services/axios/axios';
import {ICompnayProducts} from "../../../services/utils/api/models";
const baseAdminUrl = "/store";
export const DeleteFetcher =async( id:Pick<ICompnayProducts,"id">)=>{
    console.log(id);
    
    const response=await axiosInstance.delete(`${baseAdminUrl}/my_company_products/${id}/`)
    return response.data;
}