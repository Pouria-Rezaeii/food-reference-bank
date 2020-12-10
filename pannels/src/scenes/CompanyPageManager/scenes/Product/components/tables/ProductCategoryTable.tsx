import React from 'react'
import ProductCategoryTableRow from './ProductCategoryTableRow';
import styles from './style/ProductTable.module.css'

interface IProps {
  data: any[] | undefined
}

const ProductCategoryTable: React.FC<IProps> = ({ data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <th>ردیف</th>
        <th>دسته بندی محصول</th>
        <th>#</th>
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
  )
}

export default ProductCategoryTable
