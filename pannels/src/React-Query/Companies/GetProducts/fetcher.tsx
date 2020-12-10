import { axiosInstance } from '../../../services/axios/axios';
import {ICompnayProducts} from "../../../services/utils/api/models";
const baseAdminUrl = "/store";
export const GetProducts=async()=>{
    const response=await axiosInstance.get<ICompnayProducts[]>(`${baseAdminUrl}/my_company_products/`)
    return response.data.filter(product=>product.status ==="active");
}
