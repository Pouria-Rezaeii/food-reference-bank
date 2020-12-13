import React from 'react'
import ProductTableRow from './ProductTableRow';
import { ICompnayProducts } from "../../../../../../services/utils/api/models";
interface IProps {
  data: ICompnayProducts[] | undefined
}

const ProductTable: React.FC<IProps> = ({ data }) => {
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body" style={{ backgroundColor: "cyan" }}>
          <div className="row">
            <div className="col-6">
              <h5 className="card-title">محصولات</h5>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover no-wrap">
            <thead className=" bg-light">
              <tr>
                <th>ردیف</th>
                <th>دسته بندی محصول</th>
                <th>نام محصول</th>
                <th>قیمت</th>
                <th>وضعیت</th>
                <th>تنظیمات</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((product,index) => (
                <ProductTableRow
                  productId={product.id}
                  productName={product.name}
                  productCategory={product.category_title}
                  productPrice={product.cost}
                  productStatus={product.status}
                  productNumber={index+1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductTable
