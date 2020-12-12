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
import {
  axiosInstance,
  axiosServerSideInstance,
} from "../../../services/axios/axios";
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
}
interface CompanySliders {
  company: number;
  company_name: string;
  id: number;
  image: string;
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
export const Company = () => {
  const { query } = useRouter();
  const { data } = useQuery(
    ["companies", query.companyName],
    getCompaniesClientSide
  );
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
              <div className="row">
                <div className="col-xl-9">
                  <div className="single_post">
                    <h2 className="blog_title">{data.name}</h2>
                    <ul className="list_none blog_meta">
                      <li>
                        <a href="#">
                          <i className="ti-calendar"></i> ثبت شده در تاریخ
                          {moment(data.date, "YYYY/MM/DD")
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                        </a>
                      </li>
                    </ul>
                    <div className="blog_img">
                      <CompanySlider sliders={data.sliders} />
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
                <div className="mt-4">
                  <CompanyMap position={data.location.split(/\[|,|\]/)} />
                </div>
              </div>
              <div className="col-xl-3 mt-4 pt-2 mt-xl-0 pt-xl-0">
                <div className="sidebar">
                  <div className="widget">
                    <div className="search_form">
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
                    </div>
                    <div className="widget">
                      <h5 className="widget_title">محصولات اخیر</h5>
                      <ul className="widget_recent_post">
                        <li>
                          <RecentCart
                            image="/images/kalehrecent3.png"
                            name="لاکی فروت سیب"
                            price={45.0}
                          />
                        </li>
                        <li>
                          <RecentCart
                            image="/images/kalehrecent2.jpg"
                            name="کافه لته "
                            price={30.0}
                          />
                        </li>

                        <li>
                          <RecentCart
                            image="/images/kalehrecent1.jpg"
                            name="ماست لاکتیویا"
                            price={10.0}
                          />
                        </li>
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
    params: { companyName: post.name },
  }));
  return { paths: paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryCache = new QueryCache();

  await queryCache.prefetchQuery(
    ["companies", params.companyName],
    getCompaniesServerSide
  );

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
  };
};
