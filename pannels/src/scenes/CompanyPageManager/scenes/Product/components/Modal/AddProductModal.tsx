import React from "react";
import CloseModalIcon from "../../../../../../components/CloseModalIcon";
import Button from "../../../../../../components/Button";
import { EModalActionTypes } from "../../../../../../services/contexts/ModalContext/models";
import { useModalDispatch } from "../../../../../../services/contexts/ModalContext/ModalContext";
import { useMutation } from "react-query";
import { axiosInstance as axios } from "../../../../../../services/axios/axios";
import { useQueryCache } from "react-query";
import {toast} from "react-toastify"
import { Field, Form, Formik } from "formik";
import CustomInputComponent from "../../../../../../components/CustomeInputComponent";
import CustomeTextAreaComponent from "../../../../../../components/CustomeTextAreaComponent";
import CustomFileInputComponent from "../../../../../../components/CustomFileInputComponent";
import {productCreatevalidationSchema} from "../constant";
// bookmarked by pouria & parisa

interface IProps {
  categoryId: number;
}

interface ICompanySendPRoduct {
  PRDatials: {
    name: string;
    cost: string;
    description: string;
    category: number;
    main_fields: string;
    more_fields: string;
  };
  PRimage: FormData;
}

interface IPRDatials {
  name: string;
  cost: string;
  description: string;
  category: number;
  main_fields: string;
  more_fields: string;
}

interface IInitialValues {
  name: string;
  cost: string;
  description: string;
  image: "";
}

const AddProductModal = ({ categoryId }: IProps) => {
  const modalDispatch = useModalDispatch();
  const queryCache = useQueryCache();

  const handleCloseModal = () => {
    modalDispatch({ type: EModalActionTypes.HIDE_MODAL });
  };

  const sendData = async (data: ICompanySendPRoduct) => {
    const res = await axios.post(`store/my_company_products/`, data.PRDatials);
    console.log("response", res.data.id);
    const imgres = await axios.post(
      `store/my_company/product_image/${res.data.id}/`,
      data.PRimage
    );
    console.log(imgres);
  };

  const [mutate] = useMutation(sendData, {
    onSuccess: () => {
      queryCache.invalidateQueries("products");
      modalDispatch({ type: EModalActionTypes.HIDE_MODAL });
    },
  });

  const sumbitNewProductHandle = (PRDatials: IPRDatials, PRimage: FormData) => {
    const data: ICompanySendPRoduct = { PRDatials, PRimage };
    try {
      mutate(data);
      toast.success("با موفقیت اضافه شد")
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
              style={{ minHeight: "200px", padding: "40px" }}
            >
              <Formik<IInitialValues>
                initialValues={{
                  name: "",
                  cost: "",
                  description: "",
                  image: "",
                }}
                enableReinitialize
                validationSchema={productCreatevalidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const newPR = {
                    name: values.name,
                    cost: values.cost,
                    description: values.description,
                    category: categoryId,
                    main_fields: "{}",
                    more_fields: "{}",
                  };
                  const imageForm = new FormData();
                  imageForm.append("image", values.image);

                  sumbitNewProductHandle(newPR, imageForm);
                  setSubmitting(false);
                }}
              >
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
                      <Field
                        label="تصویر محصول"
                        type="file"
                        name="image"
                        component={CustomFileInputComponent}
                      />
                      <Field
                        name="description"
                        component={CustomeTextAreaComponent}
                        rows={4}
                        label="توضیحات محصول"
                        type="text"
                      />
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <button type="submit" className="btn btn-success ml-2">
                      <i className="fa fa-check" /> ثبت محصول
                    </button>
                    <Button
                      onClick={handleCloseModal}
                      type="danger"
                      text="انصراف"
                    />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
