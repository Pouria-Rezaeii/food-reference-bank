import React from 'react'
import ProductCategoryTableRow from './ProductCategoryTableRow';


interface IProps {
  data: any[] | undefined
}

const ProductCategoryTable: React.FC<IProps> = ({ data }) => {
  return (
    <div className="col-12" >
      <div className="card">
        <div className="card-body bg-light">
          <div className="row">
            <div className="col-6">
              <h5 className="card-title"> جدول اضافه کردن و ویرایش محصول</h5>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover no-wrap">
            <thead style={{ backgroundColor: 'oldlace' }}>
              <th>ردیف</th>
              <th>دسته بندی </th>
              <th>اضافه کردن محصول</th>
            </thead>
            <tbody>
              {data?.map((product, index) => (
                <ProductCategoryTableRow
                  number={index + 1}
                  productCategory={product.title}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductCategoryTable
