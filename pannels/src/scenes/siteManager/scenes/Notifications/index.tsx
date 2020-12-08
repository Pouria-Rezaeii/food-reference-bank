import React from 'react';
import { Notification } from '../../../../components/Header/Notifications/models';
import { baseAdminUrl } from "../../../../services/utils/api/Admin";
import { useQuery } from 'react-query'
import { axiosInstance as axios } from "../../../../services/axios/axios";
import { useModalDispatch } from '../../../../services/contexts/ModalContext/ModalContext';
import { EModalActionTypes } from '../../../../services/contexts/ModalContext/models';
import NotificationModal from '../../../../components/Header/Notifications/NotificationModal';
import SliderNotificationModal from '../../../../components/Header/Notifications/SliderNotificationModal';

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

  const fetchData = async () => {
    const res = await axios.get(`${baseAdminUrl}/companyNotify/`);
    return res.data
  }

  let { data: notifs } = useQuery('notifications', fetchData)
  console.log(notifs);

  // amirreza goft felan in karo bokonam ta un notif hayi ke eshtebahi ba statuse update mian filter beshe

  const updatedNotifs = notifs?.filter((notif: Notification) => {
    return notif.status === 'create' || (notif.status === 'update' && Object.keys(notif.data).length)
  })


  const fetchImages = async () => {
    const res = await axios.get(`${baseAdminUrl}/company_slider?status=c`);
    return res.data
  }

  let { data: companySliderImage } = useQuery('companySliderImage', fetchImages)
  console.log(companySliderImage);

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
              {updatedNotifs?.map((notify: Notification, index: number) => (
                <tr style={{ cursor: 'pointer' }} onClick={() => showModalHandle(notify)}>
                  <td className={`text-center ${notify.status === 'create'? 'bg-info':'bg-success'}`} >{index + 1}</td>
                  <td >{notify.status === 'create' ? 'ایجاد شرکت جدید' : 'ویرایش اطلاعات شرکت'}</td>
                  <td>{notify.name}</td>
                  <td className="txt-oflo">{notify.manager_name} </td>
                  <td><span className="badge badge-primary badge-pill">{notify.category_title} </span> </td>
                  <td className="txt-oflo">{notify.city}</td>
                  <td><span className="text-success">{notify.phone}</span></td>
                </tr>
              ))}
              <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              {companySliderImage?.map((notify : any, index: number) => (
                <tr style={{ cursor: 'pointer' }} onClick={() => showModalHandle(notify)}>
                  <td className="text-center  bg-warning">{index + 1}</td>
                  <td >ویرایش عکس اسلایدر</td>
                  <td>{notify.name}</td>
                  <td className="txt-oflo">{notify.manager_name} </td>
                  <td><span className="badge badge-primary badge-pill">{notify.category_title} </span> </td>
                  <td className="txt-oflo">{notify.city}</td>
                  <td><span className="text-success">{notify.phone}</span></td>
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
