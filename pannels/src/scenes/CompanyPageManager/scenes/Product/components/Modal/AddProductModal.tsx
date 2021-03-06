import React from "react";
import { useMutation } from "react-query";
import { useQueryCache } from "react-query";
import { toast } from "react-toastify"
import { Field, Form, Formik } from "formik";
import { axiosInstance as axios } from "../../../../../../services/axios/axios";
import CloseModalIcon from "../../../../../../components/CloseModalIcon";
import { EModalActionTypes } from "../../../../../../services/contexts/ModalContext/models";
import { useModalDispatch } from "../../../../../../services/contexts/ModalContext/ModalContext";
import CustomInputComponent from "../../../../../../components/CustomeInputComponent";
import CustomeTextAreaComponent from "../../../../../../components/CustomeTextAreaComponent";
import CustomFileInputComponent from "../../../../../../components/CustomFileInputComponent";
import { productCreatevalidationSchema } from "../constant";
import Button from "../../../../../../components/Button";
import { useUserState } from '../../../../../../services/contexts/UserContext/UserContext'
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
  const userState = useUserState();
  const handleCloseModal = () => {
    modalDispatch({ type: EModalActionTypes.HIDE_MODAL });
  };

  const sendData = async (data: ICompanySendPRoduct) => {
    try {
      const res = await axios.post(`store/my_company_products/`, data.PRDatials);
      // console.log("response", res.data.id);
      const imgres = await axios.post(`store/my_company/product_image/${res.data.id}/`,
        data.PRimage
      );
      userState.rule === "admin" || userState.rule === "adminCompany"
        ? toast.info("?????????? ???????? ???? ???????????? ?????????? ????.")
        : toast.info("???? ?????????? ???????????? ?????????? ???????? ?????? ???????? ???????????? ?????????? ????.");
    } catch (e) {
      toast.error("???????????? ?????????? ???????? ???? ???????? ?????????? ????.")
    }

  };
  const [mutate] = useMutation(sendData, {
    onSuccess: () => {
      queryCache.invalidateQueries("products");
    },
  });

  const sumbitNewProductHandle = (PRDatials: IPRDatials, PRimage: FormData) => {
    const data: ICompanySendPRoduct = { PRDatials, PRimage };
    try {
      mutate(data);

      modalDispatch({ type: EModalActionTypes.HIDE_MODAL });
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
                ?????????? ???????? ?????????? ????????{" "}
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
                        label="?????? ?????????? "
                        type="text"
                        name="name"
                        component={CustomInputComponent}
                      />
                      <Field
                        label="???????? ?????????? "
                        type="text"
                        name="cost"
                        component={CustomInputComponent}
                      />
                      <Field
                        label="?????????? ??????????"
                        type="file"
                        name="image"
                        component={CustomFileInputComponent}
                      />
                      <Field
                        name="description"
                        component={CustomeTextAreaComponent}
                        rows={4}
                        label="?????????????? ??????????"
                        type="text"
                      />
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <button type="submit" className="btn btn-success ml-2">
                      <i className="fa fa-check" /> ?????? ??????????
                    </button>
                    <Button
                      onClick={handleCloseModal}
                      type="danger"
                      text="????????????"
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
