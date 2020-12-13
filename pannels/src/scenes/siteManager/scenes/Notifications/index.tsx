import React from 'react';
import { Notification } from '../../../../components/Header/Notifications/models';
import { useQuery, useQueryCache } from 'react-query';
import { useModalDispatch } from '../../../../services/contexts/ModalContext/ModalContext';
import { EModalActionTypes } from '../../../../services/contexts/ModalContext/models';
import NotificationModal from '../../../../components/Header/Notifications/NotificationModal';
import SliderNotificationModal from '../../../../components/Header/Notifications/SliderNotificationModal';
import { fetchCompanyNotifs, fetchCompanySliderNotifs, fetchProductNotifs, fetchProductImageNotifs } from '../../../../services/axios/fetchers/notificatins'

// bookmarded by pouria
// type issue

const Index: React.FC = () => {

  const modalDispatch = useModalDispatch()


  const showModalHandle = (notify: Notification) => {
    const tergetCmp = notify.status === 'c' ? SliderNotificationModal : NotificationModal
    modalDispatch({
      type: EModalActionTypes.SHOW_MODAL,
      payload: {
        component: tergetCmp,
        props: { notify }
      }
    })
  }




  const { data: productNotifs } = useQuery('productNotifications', fetchProductNotifs)
  const { data: productImageNotifs } = useQuery('productImageNotifications', fetchProductImageNotifs)
  const { data: companySliderNotifs } = useQuery('companySliderNotifications', fetchCompanySliderNotifs)
  const { data: companyNotifs } = useQuery('notifications', fetchCompanyNotifs)

  // console.log('companySliderNotifs',companySliderNotifs);
  console.log('productNotifs', productNotifs);
  console.log('productImageNotifs', productImageNotifs);
  console.log('companySliderNotifs', companySliderNotifs);
  console.log('companyNotifs', companyNotifs);


  // amirreza goft felan in karo bokonam ta un notif hayi ke eshtebahi ba statuse update mian filter beshe

  const updatedCompanyNotifs = companyNotifs?.filter((notif: Notification) => {
    return notif.status === 'create' || (notif.status === 'update' && Object.keys(notif.data).length)
  })


  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body bg-light">
          <div className="row">
            <div className="col-6">
              <h5 className="card-title">جدول آخرین تغییرات شرکت ها</h5>
              <h6 className="card-subtitle">در انتظار تایید </h6>
            </div>

          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover no-wrap">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>نوع درخواست</th>
                <th>نام شرکت</th>
                <th>نام مدیر عامل</th>
                <th>عنوان دسته بندی</th>
                <th>شهر</th>
                <th>تلفن</th>
              </tr>
            </thead>
            <tbody style={{ paddingBottom: "0" }}>
              {updatedCompanyNotifs?.map((notify: any, index: number) => (
                <tr style={{ cursor: 'pointer' }} onClick={() => showModalHandle(notify)}>
                  <td className={`text-center ${notify.status === 'create' ? 'bg-info' : 'bg-success'}`} >{index + 1}</td>
                  <td >{notify.status === 'create' ? 'ایجاد شرکت جدید' : 'ویرایش اطلاعات شرکت'}</td>
                  <td>{notify.company.name}</td>
                  <td className="txt-oflo">{notify.company.manager_name} </td>
                  <td><span className="badge badge-primary badge-pill">{notify.company.category_title} </span> </td>
                  <td className="txt-oflo">{notify.company.city}</td>
                  <td><span className="text-success">{notify.company.phone}</span></td>
                </tr>
              ))}
              {companySliderNotifs?.map((notify: any, index: number) => (
                <tr style={{ cursor: 'pointer' }} onClick={() => showModalHandle(notify)}>
                  <td className="text-center  bg-primary">{index + 1}</td>
                  <td >ویرایش عکس اسلایدر</td>
                  <td>{notify.company.name}</td>
                  <td className="txt-oflo">{notify.company.manager_name} </td>
                  <td><span className="badge badge-primary badge-pill">{notify.company.category_title} </span> </td>
                  <td className="txt-oflo">{notify.company.city}</td>
                  <td><span className="text-success">{notify.company.phone}</span></td>
                </tr>
              ))}
              {productNotifs?.map((notify: any, index: number) => (
                <tr style={{ cursor: 'pointer' }} onClick={() => showModalHandle(notify)}>
                  <td className="text-center bg-warning">{index + 1}</td>
                  <td>productNotifs</td>
                  <td>{notify.company.name}</td>
                  <td className="txt-oflo">{notify.company.manager_name} </td>
                  <td><span className="badge badge-primary badge-pill">{notify.company.category_title} </span> </td>
                  <td className="txt-oflo">{notify.company.city}</td>
                  <td><span className="text-success">{notify.company.phone}</span></td>
                </tr>
              ))}
              {productImageNotifs?.map((notify: any, index: number) => (
                <tr style={{ cursor: 'pointer' }} onClick={() => showModalHandle(notify)}>
                  <td className="text-center bg-success">{index + 1}</td>
                  <td>productImageNotifs</td>
                  <td>{notify.company.name}</td>
                  <td className="txt-oflo">{notify.company.manager_name} </td>
                  <td><span className="badge badge-primary badge-pill">{notify.company.category_title} </span> </td>
                  <td className="txt-oflo">{notify.company.city}</td>
                  <td><span className="text-success">{notify.company.phone}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Index
