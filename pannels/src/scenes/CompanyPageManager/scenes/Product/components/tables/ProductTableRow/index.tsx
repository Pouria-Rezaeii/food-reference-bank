import React from "react";
import Button from "../../../../../../../components/Button";
import { useModalDispatch } from "../../../../../../../services/contexts/ModalContext/ModalContext";
import { EModalActionTypes } from "../../../../../../../services/contexts/ModalContext/models";
import DeleteProduct from "../../Modal/DeleteProduct";
import AddRemoveImageProductModal from '../../Modal/AddRemoveImageProductModal';
import UpdateProductModal from '../../Modal/UpdateProductModal';

interface IProps {
  productId: number;
  productName: string;
  productCategory: string;
  productCategoryId: number;
  productPrice: number;
  productStatus: "active" | "suspension" | "checking";
  productNumber: number;
}

const Index: React.FC<IProps> = ({
  productId,
  productName,
  productCategory,
  productCategoryId,
  productPrice,
  productStatus,
  productNumber,
}) => {
  const modalDispatch = useModalDispatch();
  const handleEditImage = (id: number) => {
    modalDispatch({
      type: EModalActionTypes.SHOW_MODAL,
      payload: {
        component: AddRemoveImageProductModal,
        props: { ProductId: id },
      },
    });
  }

  const handleUpdateProduct = async (id: number , PRid:number) => {
    modalDispatch({
      type: EModalActionTypes.SHOW_MODAL,
      payload: {
        component: UpdateProductModal,
        props: { categoryId: id , ProductId :PRid },
      },
    });
  };

  const handleDeleteProduct = async (id: number) => {
    modalDispatch({
      type: EModalActionTypes.SHOW_MODAL,
      payload: {
        component: DeleteProduct,
        props: { id: id },
      },
    });
  };

  return (
    <tr>
      <td>{productNumber}</td>
      <td style={{ fontWeight: "bold" }}>{productCategory}</td>
      <td>{productName}</td>
      <td>{productPrice}</td>
      {/* <td>
        <div
          className={`badge badge-${productStatus === "active"
            ? "success"
            : productStatus === "suspension"
              ? "danger"
              : "warning"
            }`}
        >
          {productStatus === "active"
            ? "????????"
            : productStatus === "suspension"
              ? "?????? ????????"
              : "???? ???????????? ??????????"}
        </div>
      </td> */}
      <td>
        <div style={{ display: "flex", gap: "3px" }}>
          <Button type="info" text="????????????" onClick={()=>handleUpdateProduct(productCategoryId,productId)}/>
          <Button type="warning" text="?????????? ???????? ??????" onClick={() => handleEditImage(productId)} />
          <Button
            type="danger"
            text="??????"
            onClick={() => handleDeleteProduct(productId)}
          />
        </div>
      </td>
    </tr>
  );
};

export default Index;
