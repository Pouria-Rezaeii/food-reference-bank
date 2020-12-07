import React from "react";
interface IProps {
  companyName: string;
  logo:string
}
export const BreadCrumsCompany: React.FC<IProps> = ({ companyName,logo }) => {
  return (
    <div className="breadcrumb_section bg_gray page-title-mini">
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
                <a href="#">خانه </a>
              </li>
              <li className="breadcrumb-item">
                <a href="#"> شرکت ها</a>
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
