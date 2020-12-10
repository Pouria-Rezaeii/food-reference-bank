import React from "react";
import Button from "../../../../../../../components/Button"
interface IProps {
  productId: number;
  productName: string;
  productCategory:string,
  productPrice:number,
  productStatus:"active" | "suspension"
}

const index: React.FC<IProps> = ({ productId, productName,productCategory,productPrice,productStatus }) => {
  return (
    <tr>
      <td>{productId}</td>
      <td>{productCategory}</td>
      <td>{productName}</td>
      <td>{productPrice}</td>
      <td><div className={`badge badge-${productStatus==="active"? "success": "danger"}`}>{productStatus}</div></td>
      <td>
          <div style={{display:"flex",gap:"3px"}}>
          <Button type="info" text="نمایش"/>
          <Button type="warning" text="ویرایش"/>
          <Button type="danger" text="حذف"/>
          </div>
      </td>
    </tr>
  );
};

export default index;
