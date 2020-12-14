import { axiosInstance as axios } from '../axios';
import { baseAdminUrl } from '../../utils/api/Admin';
import { baseAdminStoreUrl } from '../../utils/api/Admin';


const fetchNotification = async (url: string) => {
  const res = await axios.get(url);
  return res.data
}

export const fetchCompanyNotifs = () => fetchNotification(`${baseAdminUrl}/companyNotify/`)
export const fetchCompanySliderNotifs = () => fetchNotification(`${baseAdminUrl}/company_slider`)
export const fetchProductNotifs = () => fetchNotification(`${baseAdminStoreUrl}/product_notify`)
export const fetchProductImageNotifs = () => fetchNotification(`${baseAdminStoreUrl}/product_images`)

