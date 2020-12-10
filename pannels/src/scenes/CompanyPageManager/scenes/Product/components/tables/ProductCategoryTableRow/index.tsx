import React from 'react';
import Button from '../../../../../../../components/Button';
import { useModalDispatch } from '../../../../../../../services/contexts/ModalContext/ModalContext'
import { EModalActionTypes } from '../../../../../../../services/contexts/ModalContext/models';
// import 


// bookmarked by pouria

interface IProps {
  number: number;
  productCategory: string
}

const index: React.FC<IProps> = ({ number, productCategory }) => {


  // const modalDispatch = useModalDispatch()

  // const showModalHandle = () => {
  //   modalDispatch({
  //     type: EModalActionTypes.SHOW_MODAL,
  //     payload: {
  //       component: tergetCmp,
  //       props: { notify }
  //     }
  //   })
  // }

  return (
    <tr>
      <td>{number}</td>
      <td style={{ fontWeight: 'bold' }}>{productCategory}</td>
      <td><Button type='warning' text='اضافه کردن' /></td>
    </tr>
  )
}

export default index
