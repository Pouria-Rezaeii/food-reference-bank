import React, { useState } from "react";
import CloseModalIcon from "../../../../../../components/CloseModalIcon";
import Button from "../../../../../../components/Button";
import { EModalActionTypes } from "../../../../../../services/contexts/ModalContext/models";
import { useModalDispatch } from "../../../../../../services/contexts/ModalContext/ModalContext";
import { baseAdminUrl } from "../../../../../../services/utils/api/Admin";
import { useMutation } from "react-query";
import { axiosInstance as axios } from "../../../../../../services/axios/axios";
import { useQueryCache } from "react-query";

import { Field, Form, Formik } from "formik";
import CustomInputComponent from "../../../../../../components/CustomeInputComponent";
import CustomeTextAreaComponent from "../../../../../../components/CustomeTextAreaComponent";

interface IProps {
  initialValue: IcompanySendPRoduct;
  category:number;
}

interface IChoice {
  status: string;
  description_admin: string;
}

interface IcompanySendPRoduct {
  name: string;
  cost: 0;
  description: string;
  category: 0;
  main_fields: string;
  more_fields: string;
}

const AddProductModal  = ({ initialValue, category }: IProps) => {
  const modalDispatch = useModalDispatch();
  const queryCache = useQueryCache();

  const handleCloseModal = () => {
    modalDispatch({ type: EModalActionTypes.HIDE_MODAL });
  };

  const sendData = async (data: FormData) => {
    await axios.post(`store/my_company_products/`, data);
  };

  const [mutate] = useMutation(sendData, {
    onSuccess: () => {
      queryCache.invalidateQueries("Products");
      modalDispatch({ type: EModalActionTypes.HIDE_MODAL });
    },
  });

  const sumbitNewProductHandle = (data: FormData) => {
    try {
      mutate(data);
    } catch {}
  };

  return (
    <div>
      <div className="modal-backdrop show"></div>
      <div id="myModal" className="modal show " style={{ display: "block" }}>
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">
                اضافه کردن محصول جدید{" "}
              </h4>
              <CloseModalIcon handleCloseModal={handleCloseModal} />
            </div>
            <div
              className="modal-body"
              style={{ minHeight: "200px", paddingBottom: "30px" }}
            >
              <div className="notifInfo">
                <Formik<IcompanySendPRoduct, {}>
                  initialValues={initialValue}
                  enableReinitialize
                  // validationSchema={}
                  onSubmit={(values, { setSubmitting }) => {
                    const newPR = new FormData();
                    newPR.append("name", values.name);
                    newPR.append("cost", values.cost.toString());
                    newPR.append("description", values.description);
                    newPR.append("category", category.toString());
                    newPR.append("main_fields", "");
                    newPR.append("more_fields", "");
                    sumbitNewProductHandle(newPR);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting, values }) => (
                    <Form className="form-horizontal ">
                      <div className="row">
                        <div>
                          <Field
                            label="نام محصول "
                            type="text"
                            name="name"
                            component={CustomInputComponent}
                          />
                          <Field
                            label="قیمت محصول "
                            type="text"
                            name="cost"
                            component={CustomInputComponent}
                          />
                          {/* <Field
                            label="تصویر محصول"
                            type="file"
                            name="image"
                            component={CustomInputComponent}
                          /> */}
                          <Field
                            name="description"
                            component={CustomeTextAreaComponent}
                            // rows={4}
                            label="توضیحات محصول"
                            type="text"
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-success">
                        <i className="fa fa-check" /> ثبت محصول
                      </button>
                    </Form>
                  )}
                </Formik>

                <div className="modal-footer">
                  <Button
                    onClick={handleCloseModal}
                    type="danger"
                    text="بستن"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
