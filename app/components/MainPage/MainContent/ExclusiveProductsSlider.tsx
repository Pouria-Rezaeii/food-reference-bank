import React from "react";
import Slider from "react-slick";
import SliderItems from "../SliderItems";
import { QueryCache, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { GetStaticProps } from "next";
import {
  axiosInstance,
  axiosServerSideInstance,
} from "../../../services/axios/axios";
interface companyProduct {
  category: number;
  category_title: string;
  company: number;
  cost: number;
  description: string;
  id: number;
  images: companyProductImages[];
  main_fields: string;
  more_fields: string;
  name: string;
}
interface companyProductImages {
  description_admin: string;
  id: number;
  image: string;
  product: number;
  product_name: string;
  status: "accept" | "reject" | "checking";
}
const getProductsServerSide = async () => {
  const { data: products } = await axiosServerSideInstance.get<
    companyProduct[]
  >("/store/products/");
  return products.filter((product) => product.images.length);
};
const getProductsClientSide = async () => {
  const { data: products } = await axiosInstance.get<companyProduct[]>(
    "/store/products/"
  );
  return products.filter((product) => product.images.length);
};
const ExclusiveProductsSlider = () => {
  const { data: products } = useQuery("randomProducts", getProductsClientSide);
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 3000,
    cssEase: "ease-out",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="section small_pb">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="heading_tab_header">
              <div className="heading_s2">
                <h2>جدید ترین محصولات</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Slider {...settings}>
              {products?.map((product) => {
                return (
                  <div>
                    <SliderItems
                      price={product.cost}
                      name={product.name}
                      image={product.images[0].image}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveProductsSlider;
export const getStaticProps: GetStaticProps = async () => {
  const queryCache = new QueryCache();
  await queryCache.prefetchQuery("randomProducts", getProductsServerSide);

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
  };
};
