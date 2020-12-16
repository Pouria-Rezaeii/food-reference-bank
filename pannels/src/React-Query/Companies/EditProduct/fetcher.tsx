import { axiosInstance } from '../../../services/axios/axios';
import {ICompnayProducts} from "../../../services/utils/api/models";
import {IPRDatials }from "../../../scenes/CompanyPageManager/scenes/Product/components/Modal/EditProductModal"
const baseAdminUrl = "/store";
export const EditFetcher=async(data:IPRDatials)=>{
    const response=await axiosInstance.patch<ICompnayProducts>(`${baseAdminUrl}/my_company_products/name=${data.name}/`,data)
    return response.data;
}