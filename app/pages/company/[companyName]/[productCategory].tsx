import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import BottomHeader from "../../../components/Company/Header/BottomHeader";
import BreadCrumsCompany from "../../../components/Company/BreadCrumsCompany";
import { axiosServerSideInstance } from "../../../services/axios/axios";

// bookmarked by pouria
// should be fixed : ssr

interface ICategoryImage {
  id: number;
  product_name: string;
  image: string;
  status: string;
}

interface IProduct {
  category: number;
  category_title: string;
  company: number;
  cost: number;
  description: string;
  id: number;
  images: ICategoryImage[];
  length: number;
  __proto__: any;
  main_fields: string;
  more_fields: string;
  name: string;
}

const product = ({ companyName, products, data, productCategory }) => {
  console.log(products);

  return (
    <>
      <div
        className="header_sticky_bar d-none"
        style={{ height: "10px" }}
      ></div>
      <header className="header_wrap fixed-top header_with_topbar">
        <BottomHeader />
      </header>
      <BreadCrumsCompany companyName={companyName} logo={data[0]?.logo} />
      <div className="main_content p-3" style={{ backgroundColor: "#fcfcfc" }}>
        <h3 className="py-5">
          انواع {productCategory} تولید شده در شرکت {companyName}
        </h3>
        {products
          .filter((product) => product.images.length)
          .map((p: IProduct) => {
            p.images = p.images.filter((image) => image.status === "accept");
            console.log(p);

            return (
              <div
                key={p.name}
                className="col-12 col-lg-3 col-md-6 col-sm-8"
                style={{ width: "100%", display: "inline-block" }}
              >
                <div className="item mx-2">
                  <div className="product">
                    <div className="product_img">
                      <a href="shop-product-detail.html">
                        <img
                          src={p.images[0]?.image}
                          alt="product_img4"
                          style={{
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            height: "300px",
                          }}
                        />
                      </a>
                      <div className="product_action_box">
                        <ul className="list_none pr_action_btn">
                          <li className="add-to-cart">
                            <a href="">
                              <i className="icon-basket-loaded"></i> افزودن به
                              سبد خرید
                            </a>
                          </li>
                          <li>
                            <a
                              href=""
                              className="popup-ajax"
                            >
                              <i className="icon-shuffle"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href=""
                              className="popup-ajax"
                            >
                              <i className="icon-magnifier-add"></i>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <i className="icon-heart"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product_info">
                      <h6 className="product_title">
                        <a href="shop-product-detail.html">{p.name}</a>
                      </h6>
                      <div className="product_price">
                        <span className="price">{p.cost}تومان  </span>
                      </div>
                      {/* <div className="rating_wrap">
                        <div className="rating">
                          <div
                            className="product_rate"
                            style={{ width: "70%" }}
                          ></div>
                        </div>
                        <span className="rating_num">(22)</span>
                      </div> */}
                      <div className="pr_desc">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Phasellus blandit massa enim. Nullam id varius
                          nunc id varius nunc.
                        </p>
                      </div>
                      {/* <div className="pr_switch_wrap">
                        <div className="product_color_switch">
                          <span
                            className="active"
                            data-color="#333333"
                            style={{ backgroundColor: "rgb(51, 51, 51)" }}
                          ></span>
                          <span
                            data-color="#A92534"
                            style={{ backgroundColor: "rgb(169, 37, 52)" }}
                          ></span>
                          <span
                            data-color="#B9C2DF"
                            style={{ backgroundColor: "rgb(185, 194, 223)" }}
                          ></span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default product;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axiosServerSideInstance.get<
    { name: string; product_category: { title: string }[] }[]
  >(`/data_bank/companies/`);
  const companies = res.data;

  const paths = companies
    .map((company) =>
      company.product_category.map((product) => ({
        params: {
          companyName: company.name,
          productCategory: product.title,
        },
      }))
    )
    .flat();
  return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps = async ({
  params: { companyName, productCategory },
}) => {
  const { data } = await axiosServerSideInstance.get<IProduct>(
    `/data_bank/companies/?search=${encodeURIComponent(companyName as string)}`
  );
  const productCategoryInfo = data[0]?.product_category?.filter(
    (item) => item.title === productCategory
  );
  const res = await axiosServerSideInstance.get(
    `/store/products/?search=${encodeURIComponent(
      companyName as string
    )}&category=${productCategoryInfo[0].id}`
  );
  const products = res.data;
  return { props: { companyName, productCategory, products, data } };
};
