import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import CustomInputComponent from "../../../../../components/CustomeInputComponent";
import CustomFileInputComponent from "../../../../../components/CustomFileInputComponent";
import CustomeSelectCategory from "../../../../../components/CustomeSelectCategory";
import CustomSelectCity from "../../../../../components/CustomSelectCity";
import CustomeTextAreaComponent from "../../../../../components/CustomeTextAreaComponent";
import {
  calculateCityOptions,
  calculateCategoryOptions,
} from "../../../../../services/utils/calculateOptions";
import { validationSchema } from "../constants";
import { IAdminEditCompanyFormikState } from "../models";
import CompanyMap from "./CompanyMap";
import { axiosInstance as axios } from "../../../../../services/axios/axios";
import { useMutation } from "react-query";
import { useQueryCache } from "react-query";
import { toast } from "react-toastify";
import { useUserState } from "../../../../../services/contexts/UserContext/UserContext";
import Spinner from '../../../../../components/Spinner';

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
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const queryCache = useQueryCache();
  const userState = useUserState();
  const updateCopmanyDataFetcher = async (sendData: SendDataForm) => {
    setShowSpinner(true)
    try {
      await axios.patch(`/data_bank/my_company/${sendData.id}/`, sendData.sendForm)
      userState.rule === "admin" || userState.rule === "adminCompany"
        ? toast.success("???????? ?????? ???? ???????????? ???????????? ????")
        : toast.success("???? ?????????? ???????????? ???????? ???????? ???????????? ?????????? ????.");
      setShowSpinner(false)
    } catch {
      toast.error("???????????? ???????? ???????????? ???????? ????????.")
      setShowSpinner(false)
    }
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
    } catch { }
  };
  return (
    showSpinner ? <div style={{ height: "100vh", width: '100%', display: 'flex', paddingTop: '200px', justifyContent: 'center' }}><Spinner size='lg' /></div>
      :
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
                    label="?????? ????????????"
                    type="text"
                    name="username"
                    disabled={true}
                    component={CustomInputComponent}
                  />
                  {/* <Field
                label="??????????"
                calculateOptions={calculateProvinceOptions}
                type="text"
                name="province"
                component={CustomSelectProvince}
              /> */}
                  <Field
                    label="???? ????????"
                    type="text"
                    name="postal_code"
                    component={CustomInputComponent}
                  />
                  <Field
                    label="???????? ????????"
                    calculateOptions={calculateCategoryOptions}
                    type="text"
                    name="category_title"
                    component={CustomeSelectCategory}
                  />
                  <Field
                    label="????????"
                    type="file"
                    name="logo"
                    component={CustomFileInputComponent}
                  />
                </div>
                <div className="col-md-4">
                  <Field
                    label="?????? ????????"
                    type="text"
                    name="name"
                    component={CustomInputComponent}
                  />
                  <Field
                    label="??????"
                    calculateOptions={calculateCityOptions}
                    type="text"
                    name="city"
                    component={CustomSelectCity}
                  />
                  <Field
                    label="?????? ???????? ????????"
                    type="text"
                    name="manager_name"
                    component={CustomInputComponent}
                  />
                </div>
                <div className="col-md-4">
                  <Field
                    label="?????????? ???????? ????????"
                    type="text"
                    name="phone_number"
                    component={CustomInputComponent}
                  />
                  <Field
                    label="???????? ??????????"
                    type="text"
                    name="email"
                    component={CustomInputComponent}
                  />
                  <Field
                    label="???????? ????????"
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
                    label="????????"
                    type="text"
                  />
                  <Field name="location" component={CompanyMap} />
                </div>
                <div className="col-md-6">
                  <Field
                    label="?????? ????????????"
                    type="text"
                    name="description"
                    component={CustomeTextAreaComponent}
                    rows={20}
                    className="mt-md-0 mt-3"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-success">
                <i className="fa fa-check" /> ???????????? ????????
          </button>
            </Form>
          )}
        </Formik>
      </div>

  );
};

export default EditCompanyForm;
