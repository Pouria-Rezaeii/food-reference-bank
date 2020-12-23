// Render Prop
import { useField, Field, Form, Formik } from "formik";
import React from "react";
import CustomInputComponent from "../../../../../components/CustomeInputComponent";
import CustomFileInputComponent from "../../../../../components/CustomFileInputComponent";
import CustomeSelectCategory from "../../../../../components/CustomeSelectCategory";
import CustomSelectCity from "../../../../../components/CustomSelectCity";
import CustomSelectProvince from "../../../../../components/CustomSelectProvince";
import CustomeTextAreaComponent from "../../../../../components/CustomeTextAreaComponent";
import {
  calculateLeafs,
  calculateFlatten,
  calculateCityOptions,
  calculateProvinceOptions,
  calculateCategoryOptions,
} from "../../../../../services/utils/calculateOptions";
import { validationSchema } from "../constants";
import { IAdminEditCompanyFormikState } from "../models";
import CompanyMap from "./CompanyMap";
import { axiosInstance as axios } from "../../../../../services/axios/axios";
import { Object } from "ts-toolbelt";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import { useQueryCache } from "react-query";

interface IProps {
  initialValue: IAdminEditCompanyFormikState;
  id: number;
}

interface postValue {
  name: string;
  manager_name: string;
  phone_number: string;
  website: string;
  address: string;
  location: string;
  logo: string;
  category_title: number;
  description: string;
  city: number;
  postal_code: string;
}

interface SendDataForm {
  sendForm: FormData;
  id: number;
}

const getCityData = async () => {
  const response = await axios.get("/cities/");
  return response.data;
};

const EditCompanyForm = ({ initialValue, id }: IProps) => {
  const queryCache = useQueryCache();

  const updateCopmanyDataFetcher = async (sendData: SendDataForm) => {
    await axios
      .patch(`/data_bank/my_company/${sendData.id}/`, sendData.sendForm)
      .then((res) => {
        alert("شرکت شما با موفقیت ویرایش شد");
      });
  };

  const [mutate] = useMutation(updateCopmanyDataFetcher, {
    onSuccess: () => {
      queryCache.invalidateQueries("companyData");
    },
  });

  const updateCompanyData = (sendForm: FormData, id: number) => {
    const sendData = { sendForm: sendForm, id: id };
    try {
      mutate(sendData);
    } catch {}
  };
  return (
    <div>
      <Formik<IAdminEditCompanyFormikState, {}>
        initialValues={initialValue}
        enableReinitialize
        validationSchema={validationSchema}
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
          if (initialValue.logo !== logo) {
            sendForm.append("logo", logo);
          }
          sendForm.append("website", website);
          sendForm.append("address", address);
          sendForm.append("location", location);
          sendForm.append("category", category_title);
          sendForm.append("description", description);
          sendForm.append("city", city);
          sendForm.append("postal_code", postal_code.toString());

          updateCompanyData(sendForm, id);
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
              <i className="fa fa-check" /> ویرایش شرکت
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCompanyForm;
