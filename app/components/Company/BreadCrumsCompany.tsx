import React from "react";
import Link from "next/link"
interface IProps {
  companyName: string;
  logo:string
}
export const BreadCrumsCompany: React.FC<IProps> = ({ companyName,logo }) => {
  return (
    <div className="breadcrumb_section bg_gray page-title-mini" style={{padding:"20px"}}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="page-title">
              <img src={logo} className="w-25 rounded"/>
            </div>
          </div>
          <div className="col-md-6">
            <ol className="breadcrumb justify-content-md-end">
              <li className="breadcrumb-item">
                <Link href="/" as="/">
                <a>خانه </a>
                </Link>
              </li>
              <li className="breadcrumb-item">
              <Link href="/" as="/">
                <a>شرکت ها </a>
                </Link>
              </li>
              <li className="breadcrumb-item active">{companyName}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BreadCrumsCompany;
