import React from 'react';
import Button from '../../../../../../../components/Button';
import { useModalDispatch } from '../../../../../../../services/contexts/ModalContext/ModalContext'
import { EModalActionTypes } from '../../../../../../../services/contexts/ModalContext/models';
import AddProductModal from '../../Modal/AddProductModal'


// bookmarked by pouria

interface IProps {
  number: number;
  productCategory: string
  categoryId: number
}

const Index: React.FC<IProps> = ({ number, productCategory, categoryId }) => {


  const modalDispatch = useModalDispatch()

  const showModalHandle = () => {
    modalDispatch({
      type: EModalActionTypes.SHOW_MODAL,
      payload: {
        component: AddProductModal,
        props: { categoryId: categoryId }
      }
    })
  }

  return (
    <tr>
      <td>{number}</td>
      <td style={{ fontWeight: 'bold' }}>{productCategory}</td>
      <td><Button onClick={showModalHandle} type='warning' text='اضافه کردن' /></td>
    </tr>
  )
}

export default Index
