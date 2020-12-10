import React from 'react';
import styles from '../style/ProductTable.module.css'

interface IProps {
  number: number;
  productCategory: string
}

const index: React.FC<IProps> = ({ number, productCategory }) => {
  return (
    <tr className={styles.row}>
      <td>{number}</td>
      <td>{productCategory}</td>
      <td><button>اضافه کردن محصول<br />به این دسته</button></td>
    </tr>
  )
}

export default index
