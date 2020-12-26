// Render Prop
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import CustomInputComponent from "../../../../../components/CustomeInputComponent";
import CustomeSelectCategory from "../../../../../components/CustomeSelectCategory";
import CustomFileInputComponent from "../../../../../components/CustomFileInputComponent";
import CustomeTextAreaComponent from "../../../../../components/CustomeTextAreaComponent";
import CustomSelectCity from "../../../../../components/CustomSelectCity";
import CustomSelectUser from "../../../../../components/CustomSelectUser";
import { useQueryCache } from "react-query"
import CompanyMap from "./CompanyMap";
import {
  calculateCityOptions,
  calculateCategoryOptions,
} from "../../../../../services/utils/calculateOptions";
// import { adminCreatevalidationSchema } from "../constants";
import { toast } from "react-toastify";
import { IUserCreateCompanyFormikState } from "../models";
import { axiosInstance as axios } from "../../../../../services/axios/axios";
// import {useUserState} from '../../../../../services/contexts/UserContext/UserContext'
import Spinner from '../../../../../components/Spinner';

export const __isProd__ = process.env.NODE_ENV === 'production'

const CreateCompanyFormByUser = () => {
  const cache = useQueryCache()
  const [showSpinner, setShowSpinner] = useState<boolean>(false)

  const CreateCompanyByUSer = async (sendForm: FormData) => {
    setShowSpinner(true)
    try {
      await axios.post("/data_bank/my_company/", sendForm)
      toast.info("درخواست ثبت شرکت جدید شما برای مدیریت ارسال شد. ");
      setShowSpinner(false)
      setTimeout(() => {
        window.location.href = __isProd__
          ? "http://171.22.24.129"
          : "http://localhost:3001";
      }, 5000)
    } catch {
      toast.error("درخواست ثبت شرکت موفقیت آمیز نبود.");
      setShowSpinner(false)
    }
    cache.invalidateQueries("role")

  };
  return (
    showSpinner ? <div style={{ height: "100vh", width: '100%', display: 'flex', paddingTop: '200px', justifyContent: 'center' }}><Spinner size='lg' /></div>
      :
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-body">
            <h4 className="card-title">ثبت شرکت</h4>
            <h5 className="card-subtitle">برای ثبت شرکت فرم زیر را پر کنید.</h5>
            <p style={{ color: 'red' }}>* حجم فایل انتخابی نباید بیش از یک مگابایت و نام آن نیز نباید بیش از ۱۰۰ کاراکتر باشد.</p>

            <Formik<IUserCreateCompanyFormikState, {}>
              initialValues={{
                name: "",
                manager_name: "",
                phone_number: "",
                website: "",
                address: "",
                location: "",
                logo: "",
                category_title: "",
                description: "",
                city: "",
                postal_code: "",
              }}
              enableReinitialize
              // validationSchema={adminCreatevalidationSchema}
              onSubmit={(values, { setSubmitting }) => {
                let {
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

                CreateCompanyByUSer(sendForm);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, values }) => (
                <Form className="form-horizontal mt-4">
                  <div className="row">
                    <div className="col-md-4">
                      {/* <Field
                  label="نام کاربری "
                  type="text"
                  name="user"
                  disabled
                  component={CustomInputComponent}
                /> */}
                      {/* <Field
                  label="استان"
                  calculateOptions={calculateProvinceOptions}
                  type="text"
                  name="province"
                  component={CustomSelectProvince}
                /> */}
                      <Field
                        label="فیلد کاری"
                        calculateOptions={calculateCategoryOptions}
                        type="text"
                        name="category_title"
                        component={CustomeSelectCategory}
                      />
                      <Field
                        label="کد پستی"
                        type="text"
                        name="postal_code"
                        component={CustomInputComponent}
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
                        label="شهر"
                        calculateOptions={calculateCityOptions}
                        type="text"
                        name="city"
                        component={CustomSelectCity}
                      />
                      <Field
                        label="نام شرکت"
                        type="text"
                        name="name"
                        component={CustomInputComponent}
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
        </div>
      </div>
  );
};

export default CreateCompanyFormByUser;
