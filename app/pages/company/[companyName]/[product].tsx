import { GetStaticPaths } from 'next';
import React from 'react';
import { axiosServerSideInstance } from '../../../services/axios/axios';
// import { } from ''

// bookmarked by pouria
// should be fixed : ssr

const product = () => {
  return (
    <div>
      
    </div>
  )
}

export default product


export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axiosServerSideInstance.get(`/store/products/`)
  const products = await res.data
  const paths = products.map(pruduct => (
    {
      // params: { product: pruduct.title },
    }
  ));
  return { fallback: false, paths }
}

export const getStaticProps = async () => {

}
