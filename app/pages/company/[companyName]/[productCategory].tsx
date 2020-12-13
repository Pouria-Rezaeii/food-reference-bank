import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { axiosServerSideInstance } from '../../../services/axios/axios';
import BottomHeader from "../../../components/Company/Header/BottomHeader";
import BreadCrumsCompany from "../../../components/Company/BreadCrumsCompany";
// bookmarked by pouria
// should be fixed : ssr

const product = ({ productCategory, companyName, products,data }) => {
  return (
    <div>
      <header className="header_wrap fixed-top header_with_topbar">
          <BottomHeader />
        </header>
      <BreadCrumsCompany companyName={companyName} logo={data[0]?.logo} />
      {companyName}
      <p>{productCategory}</p>
    </div>
  )
}

export default product


export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axiosServerSideInstance.get<{ name: string; product_category: { title: string }[] }[]>(`/data_bank/companies/`)
  const companies = await res.data;

  const paths = companies.map(company => company.product_category.map(product => (
    {
      params: {
        companyName: company.name,
        productCategory: product.title
      }
    }))).flat();
  return { fallback: false, paths }
}

export const getStaticProps: GetStaticProps = async ({ params: { companyName, productCategory } }) => {
  const res =await (axiosServerSideInstance.get(`/store/products/?search=${encodeURIComponent(productCategory as string)}`))
  const {data}=await axiosServerSideInstance.get(`/data_bank/companies/?search=${encodeURIComponent(companyName as string)}`)
  const products = res.data
  return { props: { companyName, productCategory, products,data } }
}
