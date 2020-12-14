import React from "react";
import { useMutation } from "react-query";
import { useQueryCache, useQuery } from "react-query";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import { axiosInstance as axios } from "../../../../../../services/axios/axios";
import CloseModalIcon from "../../../../../../components/CloseModalIcon";
import { EModalActionTypes } from "../../../../../../services/contexts/ModalContext/models";
import { useModalDispatch } from "../../../../../../services/contexts/ModalContext/ModalContext";
import CustomInputComponent from "../../../../../../components/CustomeInputComponent";
import CustomeTextAreaComponent from "../../../../../../components/CustomeTextAreaComponent";
import CustomFileInputComponent from "../../../../../../components/CustomFileInputComponent";
import { productUpdatevalidationSchema } from "../constant";
import Button from "../../../../../../components/Button";
// bookmarked by pouria & parisa

interface IProps {
  categoryId: number;
  ProductId: number;
}

interface ICompanyUpdatePRoduct {
  name: string;
  cost: string;
  description: string;
  category: number;
  main_fields: string;
  more_fields: string;
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
}

const UpdateProductModal = ({ categoryId, ProductId }: IProps) => {
  const modalDispatch = useModalDispatch();
  const queryCache = useQueryCache();

  const handleCloseModal = () => {
    modalDispatch({ type: EModalActionTypes.HIDE_MODAL });
  };

  const getProductDetails = async () => {
    const res = await axios.get(`store/my_company_products/${ProductId}`);

    return res.data;
  };
  const { data } = useQuery(`product${ProductId}`, getProductDetails);

  const sumbitUpdatedProducts = async (data: ICompanyUpdatePRoduct) => {
    const res = await axios.put(
      `store/my_company_products/${ProductId}/`,
      data
    );
    // console.log("response", res.data.id);
  };

  const [mutate] = useMutation(sumbitUpdatedProducts, {
    onSuccess: () => {
      queryCache.invalidateQueries(`product${ProductId}`);
    },
});

const HandleUpdatePRDetails = (PRDatials: IPRDatials) => {
    try {
        mutate(PRDatials);
        toast.success(" اطلاعات با موفقیت ویرایش شد");
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
                ویرایش محصول{" "}
              </h4>
              <CloseModalIcon handleCloseModal={handleCloseModal} />
            </div>
            <div
              className="modal-body"
              style={{ minHeight: "200px", padding: "40px" }}
            >
              <Formik<IInitialValues>
                initialValues={{
                  name: data ? data.name : "",
                  cost: data ? data.cost : 0,
                  description: data ? data.description : "",
                }}
                enableReinitialize
                validationSchema={productUpdatevalidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const newPR = {
                    name: values.name,
                    cost: values.cost,
                    description: values.description,
                    category: categoryId,
                    main_fields: "{}",
                    more_fields: "{}",
                  };
                  HandleUpdatePRDetails(newPR);
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
                      <i className="fa fa-check" /> ویرایش محصول
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

export default UpdateProductModal;
