import React from 'react';
import Button from '../../../../../../../components/Button';

interface IProps {
  number: number;
  productCategory: string
}

const index: React.FC<IProps> = ({ number, productCategory }) => {
  return (
    <tr>
      <td>{number}</td>
      <td style = {{fontWeight:'bold'}}>{productCategory}</td>
      <td><Button type = 'warning' text = 'اضافه کردن'/></td>
    </tr>
  )
}

export default index
