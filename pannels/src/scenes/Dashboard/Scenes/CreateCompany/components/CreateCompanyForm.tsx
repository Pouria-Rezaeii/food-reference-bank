// Render Prop
import { Field, Form, Formik } from "formik";
import React from "react";
import CustomInputComponent from "../../../../../components/CustomeInputComponent";
import CustomeSelectCategory from "../../../../../components/CustomeSelectCategory";
import CustomFileInputComponent from "../../../../../components/CustomFileInputComponent"
import CustomeTextAreaComponent from "../../../../../components/CustomeTextAreaComponent";
import CustomSelectCity from "../../../../../components/CustomSelectCity";
import CustomSelectUser from "../../../../../components/CustomSelectUser";
import CustomSelectProvince from "../../../../../components/CustomSelectProvince";
import {
  calculateLeafs,
  calculateCityOptions,
  calculateCategoryOptions,
  calculateUserOptions,
  calculateProvinceOptions,
} from "../../../../../services/utils/calculateOptions";
import { adminCreatevalidationSchema } from "../constants";
import { IAdminCreateCompanyFormikState } from "../models";
import { axiosInstance as axios } from "../../../../../services/axios/axios";

import CompanyMap from "./CompanyMap";

interface IProps {
  initialValue: IAdminCreateCompanyFormikState;
}

const CreateCompanyData = (sendForm: FormData) => {
  console.log('create');
  
  axios.post('/data_bank/admin/companies/', sendForm).then(res=>{alert('شرکت جدید با موفقیت ثبت شد ')})
};

const CreateCompanyForm = ({ initialValue }: IProps) => {
  return (
    <div>
      <Formik<IAdminCreateCompanyFormikState, {}>
        initialValues={initialValue}
        enableReinitialize
        // validationSchema={adminCreatevalidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          let {
            user,
            name,
            manager_name,
            phone_number,
            website,
            address,
            location,
            logo,
            category_title,
            description,
            city,
            postal_code,
          } = values;

          let sendForm = new FormData();
          sendForm.append("user", user.toString());
          sendForm.append("name", name);
          sendForm.append("manager_name", manager_name);
          sendForm.append("phone_number", phone_number);
          sendForm.append("logo", logo);
          sendForm.append("website", website);
          sendForm.append("address", address);
          sendForm.append("location", location);
          sendForm.append("category", category_title);
          sendForm.append("description", description);
          sendForm.append("city", city);
          sendForm.append("postal_code", postal_code.toString());
          sendForm.append("is_vip", "true");

          CreateCompanyData(sendForm);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="form-horizontal mt-4">
            <div className="row">
              <div className="col-md-4">
              <Field
                  label="نام کاربری "
                  calculateOptions={calculateUserOptions}
                  type="text"
                  name="user"
                  component={CustomSelectUser}
                />
                {/* <Field
                  label="استان"
                  calculateOptions={calculateProvinceOptions}
                  type="text"
                  name="province"
                  component={CustomSelectProvince}
                /> */}
                <Field
                  label="کد پستی"
                  type="text"
                  name="postal_code"
                  component={CustomInputComponent}
                />
               <Field
                  label="فیلد کاری"
                  calculateOptions={calculateCategoryOptions}
                  type="text"
                  name="category_title"
                  component={CustomeSelectCategory}
                />
                 <Field
                  label="لوگو"
                  type="file"
                  name="logo"
                  component={CustomFileInputComponent}
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
              <i className="fa fa-check" /> ثبت شرکت
            </button>

            {/* {JSON.stringify(values, null, 4)} */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCompanyForm;
