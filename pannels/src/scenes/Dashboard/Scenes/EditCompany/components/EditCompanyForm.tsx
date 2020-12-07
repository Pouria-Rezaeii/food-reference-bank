// Render Prop
import { useField, Field, Form, Formik } from "formik";
import React from "react";
import CustomInputComponent from "../../../../../components/CustomeInputComponent";
import CustomeSelectCategory from "../../../../../components/CustomeSelectCategory";
import CustomSelectCity from "../../../../../components/CustomSelectCity";
import CustomSelectProvince from "../../../../../components/CustomSelectProvince";
import CustomeTextAreaComponent from "../../../../../components/CustomeTextAreaComponent";
import {
  calculateLeafs,
  calculateFlatten,
  calculateCityOptions,
  calculateProvinceOptions,
} from "../../../../../services/utils/calculateOptions";
import { adminCreatevalidationSchema } from "../constants";
import { IAdminEditCompanyFormikState } from "../models";
import CompanyMap from "./CompanyMap";
import { axiosInstance as axios } from "../../../../../services/axios/axios";
import { Object } from "ts-toolbelt";
import { useQuery } from "react-query";

interface IProps {
  initialValue: IAdminEditCompanyFormikState;
  id: number
}

interface postValue {
  name: string;
  manager_name: string;
  phone_number: string;
  website: string;
  address: string;
  location: string;
  logo: string;
  category: number;
  description: string;
  city: number;
  postal_code: string;
}
 ///////////////inja bayad avaz beshe
const updateCompanyData = (sendForm: postValue ,id :number) => { 
  axios.put(`/data_bank/my_company/${id}/`, sendForm);
};

const getCityData = async () => {
  const response = await axios.get("/cities/");
  // console.log(response.data);
  return response.data;
};



const EditCompanyForm = ({ initialValue , id }: IProps) => {
  const { status, data: CityData, error } = useQuery("CityData", getCityData);
  return (
    <div>
      <Formik<IAdminEditCompanyFormikState, {}>
        initialValues={initialValue}
        enableReinitialize
        // validationSchema={adminCreatevalidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          let {
            name,
            manager_name,
            // phone_number,
            website,
            address,
            location,
            logo,
            category,
            description,
            city,
            postal_code,
          } = values;

          let sendForm :postValue= {
              name: name,
              manager_name: manager_name,
              // phone_number: phone_number,
              website: website,
              address: address,
              location: location.toString(),
              logo: logo,
              category: category,
              description: description,
              city: 3,
              postal_code: postal_code.toString(),
          }
          console.log(sendForm  , 'sendForm');
          updateCompanyData(sendForm , id);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="form-horizontal mt-5">
            <div className="row">
              <div className="col-md-4">
                <Field
                  label="نام کاربری"
                  type="text"
                  name="username"
                  disabled={true}
                  component={CustomInputComponent}
                />
                <Field
                  label="استان"
                  calculateOptions={calculateProvinceOptions}
                  type="text"
                  name="province"
                  component={CustomSelectProvince}
                />
                <Field
                  label="کد پستی"
                  type="text"
                  name="postal_code"
                  component={CustomInputComponent}
                />
                <Field
                  label="لوگو"
                  type="select"
                  name="logo"
                  component={CustomInputComponent}
                />
              </div>
              <div className="col-md-4">
                <Field
                  label="نام شرکت"
                  type="text"
                  name="name"
                  component={CustomInputComponent}
                />
                <Field
                  label="شهر"
                  calculateOptions={calculateCityOptions}
                  type="text"
                  name="city"
                  component={CustomSelectCity}
                />
                <Field
                  label="نام مدیر عامل"
                  type="text"
                  name="manager_name"
                  component={CustomInputComponent}
                />
              </div>
              <div className="col-md-4">
                <Field
                  label="شماره تلفن شرکت"
                  type="text"
                  name="phone_number"
                  component={CustomInputComponent}
                />
                <Field
                  label="آدرس ایمیل"
                  type="text"
                  name="email"
                  component={CustomInputComponent}
                />
                <Field
                  label="آدرس سایت"
                  type="text"
                  name="website"
                  component={CustomInputComponent}
                />
                <Field
                  label="فیلد کاری"
                  calculateOptions={calculateLeafs}
                  type="text"
                  name="category_title"
                  component={CustomeSelectCategory}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Field
                  name="address"
                  component={CustomeTextAreaComponent}
                  rows={4}
                  label="آدرس"
                  type="text"
                />
                <Field name="location" component={CompanyMap} />
              </div>
              <div className="col-md-6">
                <Field
                  label="شرح فعالیت"
                  type="text"
                  name="description"
                  component={CustomeTextAreaComponent}
                  rows={20}
                  className="mt-md-0 mt-3"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success">
              <i className="fa fa-check" /> ویرایش شرکت
            </button>

            {JSON.stringify(values, null, 4)}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCompanyForm;
