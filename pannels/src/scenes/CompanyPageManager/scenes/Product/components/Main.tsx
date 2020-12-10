import React, { useEffect } from "react";
import {useQuery} from "react-query"
import {getCompanyData} from "../../../../../scenes/Dashboard/Scenes/EditCompany/index"
import { useMutation } from "react-query";
import {GetCategoryProducts} from "../../../../../React-Query/Companies/GetProductsCategory/fetcher"
import ProductCategoryTable from '../components/tables/ProductCategoryTable'
const Main = () => {
  // const {data:companyData}=useQuery("companyData",getCompanyData);
  const {data}=useQuery("CategoryProducts",GetCategoryProducts)
  console.log(data);
  
  return (
  <div>
  <ProductCategoryTable data={data} />
  </div>
  )
}

export default Main
