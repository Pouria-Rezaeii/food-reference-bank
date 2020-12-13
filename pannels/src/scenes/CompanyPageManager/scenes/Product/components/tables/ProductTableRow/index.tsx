import React from "react";
import Button from "../../../../../../../components/Button";
import { useModalDispatch } from "../../../../../../../services/contexts/ModalContext/ModalContext";
import { EModalActionTypes } from "../../../../../../../services/contexts/ModalContext/models";
import DeleteProduct from "../../Modal/DeleteProduct";
interface IProps {
  productId: number;
  productName: string;
  productCategory: string;
  productPrice: number;
  productStatus: "active" | "suspension";
  productNumber: number;
}

const Index: React.FC<IProps> = ({
  productId,
  productName,
  productCategory,
  productPrice,
  productStatus,
  productNumber,
}) => {
  const modalDispatch = useModalDispatch();
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
      <td style={{ fontWeight: 'bold' }}>{productCategory}</td>
      <td>{productName}</td>
      <td>{productPrice}</td>
      <td>
        <div
          className={`badge badge-${
            productStatus === "active" ? "success" : "danger"
          }`}
        >
          {productStatus==="active"? "فعال":"در انتظار تایید"}
        </div>
      </td>
      <td>
        <div style={{ display: "flex", gap: "3px" }}>
          <Button
            type="info"
            text="نمایش و ویرایش"
          />
          <Button
            type="danger"
            text="حذف"
            onClick={() => handleDeleteProduct(productId)}
          />
        </div>
      </td>
    </tr>
  );
};

export default Index;
