import React, { useEffect } from "react";
import {useQuery} from "react-query"
import {getCompanyData} from "../../../../../scenes/Dashboard/Scenes/EditCompany/index"
import { useMutation } from "react-query";
import {GetCategoryProducts} from "../../../../../React-Query/Companies/GetProductsCategory/fetcher"
const Main = () => {
  // const {data:companyData}=useQuery("companyData",getCompanyData);
  const {data}=useQuery("CategoryProducts",GetCategoryProducts)
  console.log(data);
  
  return <div>

  </div>;
};
export default Main;
