import React, { useEffect } from "react";
import { useQuery } from "react-query"
import { getCompanyData } from "../../../../../scenes/Dashboard/Scenes/EditCompany/index"
import { useMutation } from "react-query";
import { GetCategoryProducts } from "../../../../../React-Query/Companies/GetProductsCategory/fetcher"
import { GetProducts } from "../../../../../React-Query/Companies/GetProducts/fetcher"
import ProductCategoryTable from './tables/ProductCategoryTable'
import ProductTable from "./tables/ProductTable"
import { ICompnayProducts } from "../../../../../services/utils/api/models";
const Main = () => {
  // const {data:companyData}=useQuery("companyData",getCompanyData);
  const { data: CategoryProducts } = useQuery("categoryProducts", GetCategoryProducts)
  const { data: Products } = useQuery<ICompnayProducts[]>("products", GetProducts)

  return (
    <div style={{ width: "100%" }}>
      <ProductCategoryTable data={CategoryProducts} />
      <ProductTable products={Products} CategoryProducts={CategoryProducts} />
    </div>
  )
}
export default Main
