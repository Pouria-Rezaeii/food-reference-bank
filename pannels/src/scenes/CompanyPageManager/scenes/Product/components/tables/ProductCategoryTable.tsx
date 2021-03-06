import React from 'react'
import ProductCategoryTableRow from './ProductCategoryTableRow';

// bookmarked by pouria

interface IProps {
  data: any[] | undefined
}

const ProductCategoryTable: React.FC<IProps> = ({ data }) => {

  return (
    <div className="col-12 mb-5" >
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
            <thead style={{ backgroundColor: '#f6f6f6' }}>
              <tr>
                <th>ردیف</th>
                <th>دسته بندی </th>
                <th>اضافه کردن محصول</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((productCategory, index) => (
                <ProductCategoryTableRow
                  number={index + 1}
                  productCategory={productCategory.title}
                  categoryId = {productCategory.id}
                  key={productCategory.id}
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
