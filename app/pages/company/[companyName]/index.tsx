import moment from "moment-jalaali";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { QueryCache, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import BreadCrumsCompany from "../../../components/Company/BreadCrumsCompany";
import CompanySlider from "../../../components/Company/CompanySlider";
import BottomHeader from "../../../components/Company/Header/BottomHeader";
import Footer from "../../../components/MainPage/Footer/Footer";
import RecentCart from "../../../components/shared/Cards/RecentCart";
import Spinner from "../../../components/UI/Spinner";
import styles from "../../../assets/companyPageStyle.module.css";
import {
  axiosInstance,
  axiosServerSideInstance,
} from "../../../services/axios/axios";
import Link from "next/link";

const CompanyMap = dynamic(
  () => import("../../../components/Company/CompanyMap"),
  {
    ssr: false,
  }
);
interface CompanyProps {
  id: number;
  user: number;
  username: string;
  email?: string;
  name: string;
  manager_name: string;
  phone_number: string;
  website?: string;
  address: string;
  location: string;
  logo?: string;
  category?: number;
  category_title?: string;
  description: string;
  status: string;
  city?: number;
  postal_code?: string;
  date: string;
  sliders: string[];
  product_category: any[]; // type dorost beshe
}
interface CompanySliders {
  company: number;
  company_name: string;
  id: number;
  image: string;
}
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
  description_admin: string
  id: number
  image: string
  product: number
  product_name: string
  status: "accept" | "reject" | "checking";
}
const getCompaniesServerSide = async (_: never, companyName: string) => {
  const { data: compantInformation } = await axiosServerSideInstance.get<
    CompanyProps[]
  >(`/data_bank/companies/?search=${companyName}`);
  const { data: companySliders } = await axiosServerSideInstance.get<
    CompanySliders[]
  >(`/data_bank/companies/slider/?company__name=${companyName}`);
  const sliders = [];
  companySliders.map((slider) => {
    sliders.push(slider.image);
  });
  return { ...compantInformation[0], sliders: sliders };
};
const getCompaniesProductsServerSide = async (_: never, companyId: number) => {
  const { data: companyProducts } = await axiosServerSideInstance.get<
    companyProduct[]
  >(`/store/products/?company=${companyId}`);
  return companyProducts;
};
const getCompaniesProductsClientSide = async (_: never, companyId: number) => {
  const { data: companyProducts } = await axiosInstance.get<companyProduct[]>(
    `/store/products/?company=${companyId}`
  );
  return companyProducts;
};
const getCompaniesClientSide = async (_: never, companyName: string) => {
  const { data: compantInformation } = await axiosInstance.get<CompanyProps[]>(
    `/data_bank/companies/?search=${companyName}`
  );
  const { data: companySliders } = await axiosInstance.get<CompanySliders[]>(
    `/data_bank/companies/slider/?company__name=${companyName}`
  );

  const sliders = [];
  companySliders.map((slider) => {
    sliders.push(slider.image);
  });
  return { ...compantInformation[0], sliders: sliders };
};
export const Company = ({ id }) => {
  const { query } = useRouter();
  const { data } = useQuery(
    ["companies", query.companyName],
    getCompaniesClientSide
  );
  const { data: companyProducts } = useQuery(
    ["companyProducts", id],
    getCompaniesProductsClientSide
  );
  console.log(companyProducts, "companyProducts");

  if (data)
    return (
      <>
        <div
          className="header_sticky_bar d-none"
          style={{ height: "10px" }}
        ></div>
        <header className="header_wrap fixed-top header_with_topbar">
          <BottomHeader />
        </header>
        <BreadCrumsCompany companyName={data.name} logo={data.logo} />
        <div className="main_content">
          <div className="section">
            <div className="container">
              <h2 className="blog_title">{data.name}</h2>
              <div className="row">
                <div className="col-xl-9">
                  <div className="single_post">
                    <ul className="list_none blog_meta">
                      <li>
                        <i className="ti-calendar"></i> ثبت شده در تاریخ
                        {moment(data.date, "YYYY/MM/DD")
                          .locale("fa")
                          .format("YYYY/MM/DD")}
                      </li>
                    </ul>
                    <div className="blog_img">
                      <CompanySlider sliders={data.sliders} />
                    </div>
                    <div
                      className='productBox'
                      style={{ border: 'solid 2px #ccc', margin: '60px 0 40px', borderRadius:'8px' }}
                    >
                      <h2 style={{ textAlign: "center", marginTop: "20px" }}>محصولات شرکت</h2>
                      <hr />
                      <div className="container">
                        <div className="row"
                        style = {{display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap', padding:'10px 5px 20px'}}>
                          {data?.product_category.map((item) => (
                            <div
                              style = {{width: '23%'}}
                              key={item.title}
                            >
                              <Link
                                href={"/company/[companyName]/[productCategory]"}
                                as={`/company/${data.name}/${item.title}`}
                              >
                                <div
                                  className={`panel shadow-md ${styles.product}`}
                                  style={{
                                    height: "50px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  {item.title}
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="blog_content">
                      <div className="blog_text">
                        <p>{data.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <CompanyMap position={data.location.split(/\[|,|\]/)} />
                  </div>
                </div>
                {/* <div className="mt-4">
                  <CompanyMap position={data.location.split(/\[|,|\]/)} />
                </div> */}
                <div className="col-xl-3 mt-4 mt-xl-0 pt-xl-0" style={{ paddingRight: "50px" }}>
                  <div className="sidebar">
                    <div className="widget">
                      {/* <div className="search_form">
                      <form>
                        <input
                          className="form-control"
                          placeholder="جستجو..."
                          type="text"
                        />
                        <button
                          type="submit"
                          title="Subscribe"
                          className="btn icon_search"
                          name="submit"
                          value="Submit"
                        >
                          <i className="ion-ios-search-strong"></i>
                        </button>
                      </form>
                    </div> */}
                      <div className="widget">
                        {companyProducts.length ? <h5 className="widget_title">محصولات اخیر</h5> : null}
                        <ul className="widget_recent_post">
                          {companyProducts.slice(-3).map((product) => (
                            <li key={product.id}>
                              <RecentCart
                                image={product.images[0].image}
                                name={product.name}
                                price={product.cost}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="widget">
                        <h5 className="widget_title">اطلاعات شرکت</h5>

                        <ul className="contact_info contact_info_dark">
                          <li>
                            <i className="ti-location-pin"></i>
                            <p>{data.address}</p>
                          </li>
                          <li>
                            <i className="ti-email"></i>
                            <a href="mailto:info@kalleh.com">{data?.email}</a>
                          </li>
                          <li>
                            <i className="ti-mobile"></i>
                            <p>{data.phone_number}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  else {
    return <Spinner />;
  }
};
export default Company;
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axiosServerSideInstance.get<CompanyProps[]>(
    "/data_bank/companies/"
  );
  const paths = data.map((post) => ({
    params: { companyName: post.name, id: '' },
  }));
  return { paths: paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryCache = new QueryCache();
  const {
    data: [{ id }],
  } = await axiosServerSideInstance.get(
    `/data_bank/companies/?search=${encodeURIComponent(
      params.companyName as string
    )}`
  );
  await queryCache.prefetchQuery(
    ["companies", params.companyName],
    getCompaniesServerSide
  );
  await queryCache.prefetchQuery(
    ["companyProducts", id],
    getCompaniesProductsServerSide
  );

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
      id,
    },
  };
};
