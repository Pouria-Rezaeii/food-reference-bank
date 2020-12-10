import { axiosInstance } from '../../../services/axios/axios';
import {ICategoryTree} from "../../../services/utils/api/Category/models";
const baseProductsCategory = "/data_bank";
export const GetCategoryProducts=async(_:string)=>{
    const {data} = await axiosInstance.get(`${baseProductsCategory}/my_company/`);
    const response=await axiosInstance.get<ICategoryTree[]>(`${baseProductsCategory}/category_tree?parent=${data[0].category}`)
    return response.data;
}
