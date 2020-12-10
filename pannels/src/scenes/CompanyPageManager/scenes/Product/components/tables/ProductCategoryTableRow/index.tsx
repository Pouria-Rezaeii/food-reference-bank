import React from 'react';

interface IProps {
  number: number;
  productCategory: string
}

const index: React.FC<IProps> = ({ number, productCategory }) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{productCategory}</td>
      <td><button>اضافه کردن محصول<br />به این دسته</button></td>
    </tr>
  )
}

export default index
