import React from "react";
import { useQuery } from "react-query";
import EditCompanyForm from "./components/EditCompanyForm";
import { IAdminEditCompanyFormikState } from "./models";
import { axiosInstance as axios } from "../../../../services/axios/axios";

export const getCompanyData = async () => {
  const response = await axios.get("/data_bank/my_company/");
  return response.data[0];
};

const Index = () => {
    
  const { status, data: CompanyData, error } = useQuery(
    "companyData",
    getCompanyData
  );
  const CompanyId = CompanyData && CompanyData.id;
  
  const defaultValues: IAdminEditCompanyFormikState = {
    address: CompanyData && CompanyData.address,
    category: CompanyData && CompanyData.category,
    category_title: CompanyData && CompanyData.category,
    city: CompanyData && CompanyData.city,
    description: CompanyData && CompanyData.description,
    email: CompanyData && CompanyData.email,
    location: CompanyData && CompanyData.location,
    logo: CompanyData && CompanyData.logo,
    manager_name: CompanyData && CompanyData.manager_name,
    name: CompanyData && CompanyData.name,
    phone_number: CompanyData && CompanyData.phone_number,
    postal_code: CompanyData && CompanyData.postal_code,
    username: CompanyData && CompanyData.username,
    website: CompanyData && CompanyData.website,
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="card card-body">
          <h4 className="card-title">ویرایش شرکت</h4>
          <h5 className="card-subtitle">
            برای ویرایش شرکت فرم زیر را ویرایش کنید.
          </h5>
          <EditCompanyForm initialValue={defaultValues} id={CompanyId} />
        </div>
      </div>
    </div>
  );
};

export default Index;
