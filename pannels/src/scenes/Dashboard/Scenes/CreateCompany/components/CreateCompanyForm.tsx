// Render Prop
import { Field, Form, Formik } from "formik";
import React from "react";
import CustomInputComponent from "../../../../../components/CustomeInputComponent";
import CustomeSelectCategory from "../../../../../components/CustomeSelectCategory";
import CustomeTextAreaComponent from "../../../../../components/CustomeTextAreaComponent";
import CustomSelectCity from "../../../../../components/CustomSelectCity"
import CustomSelectProvince from "../../../../../components/CustomSelectProvince"
import { calculateLeafs , calculateCityOptions, calculateProvinceOptions} from "../../../../../services/utils/calculateOptions";
import { adminCreatevalidationSchema } from "../constants";
import { IAdminCreateCompanyFormikState } from "../models";
import CompanyMap from "./CompanyMap";

interface IProps {
  initialValue: IAdminCreateCompanyFormikState;
}

const CreateCompanyForm = ({ initialValue }: IProps) => {
  return (
    <div>
      <Formik<IAdminCreateCompanyFormikState, {}>
        initialValues={initialValue}
        enableReinitialize
        validationSchema={adminCreatevalidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log('send data');
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="form-horizontal mt-4">
            <div className="row">
            <div className="col-md-4">
                <Field
                  label="نام کاربری"
                  type="text"
                  name="username"
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
                  label="شماره همراه"
                  type="text"
                  name="mobile_number"
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
                <Field
                  label="لوگو"
                  type="file"
                  name="logo"
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
                  name="category"
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

            <button type="submit"  className="btn btn-success">
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
