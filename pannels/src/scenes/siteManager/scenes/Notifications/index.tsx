import React from 'react';
import { Notification } from '../../../../components/Header/Notifications/models';
import { useQuery } from 'react-query';
import { useModalDispatch } from '../../../../services/contexts/ModalContext/ModalContext';
import { EModalActionTypes } from '../../../../services/contexts/ModalContext/models';
import NotificationModal from '../../../../components/Header/Notifications/NotificationModal';
import { fetchCompanyNotifs, fetchCompanySliderNotifs, fetchProductNotifs, fetchProductImageNotifs } from '../../../../services/axios/fetchers/notificatins'
import { baseAdminUrl, baseAdminStoreUrl } from '../../../../services/utils/api/Admin/index'

// bookmarded by pouria
// type issue

const Index: React.FC = () => {

  const modalDispatch = useModalDispatch()

  const showModalHandle = (notify: any, status: string, hasImage: boolean, url: string, cacheToInvalidate: string[]) => {
    console.log(url);
    const tergetCmp = NotificationModal
    modalDispatch({
      type: EModalActionTypes.SHOW_MODAL,
      payload: {
        component: tergetCmp,
        props: { notify, status, hasImage, url, cacheToInvalidate }
      }
    })
  }

  const { data: productNotifs } = useQuery('productNotifications', fetchProductNotifs)
  const { data: productImageNotifs } = useQuery('productImageNotifications', fetchProductImageNotifs)
  const { data: companySliderNotifs } = useQuery('companySliderNotifications', fetchCompanySliderNotifs)
  const { data: companyNotifs } = useQuery('companyNotifications', fetchCompanyNotifs)

  // amirreza goft felan in karo bokonam ta un notif hayi ke eshtebahi ba statuse update mian filter beshe

  const updatedCompanyNotifs = companyNotifs?.filter((notif: Notification) => {
    return notif.status === 'create' || (notif.status === 'update' && Object.keys(notif.data).length)
  })

  const handleExtractNotifs = (
    data: any[],
    status: string,
    bgColor: string,
    hasImage: boolean,
    url: string,
    cacheToInvalidate: string[],
  ) => {
    return data.map((notify: any, index: number) => (
      <tr key={index} style={{ cursor: 'pointer' }} onClick={() => showModalHandle(
        notify,
        status,
        hasImage,
        url,
        cacheToInvalidate,
      )}>
        <td className={`text-center`} style = {{backgroundColor:bgColor}}>{index + 1}</td>
        <td >{status}</td>
        <td>{notify.company.name}</td>
        <td className="txt-oflo">{notify.company.manager_name} </td>
        <td><span className="badge badge-warning badge-pill">{notify.company.category_title} </span></td>
        <td className="txt-oflo">{notify.company.city}</td>
        <td><span>{notify.company.phone}</span></td>
      </tr>
    ))
  }

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
                <tr style={{ cursor: 'pointer' }} onClick={() => showModalHandle(
                  notify,
                  'ایجاد یا ویرایش شرکت',
                  false,
                  `${baseAdminUrl}/notify/${notify.status}/`,
                  ['companyNotifications', 'companyData',"companyData"]
                )}>
                  <td className={`text-center`} style = {{backgroundColor:' #e0e2e4'}}>{index + 1}</td>
                  <td >ایجاد یا ویرایش شرکت</td>
                  <td>{notify.company.name}</td>
                  <td className="txt-oflo">{notify.company.manager_name} </td>
                  <td><span className="badge badge-warning badge-pill">{notify.company.category_title} </span></td>
                  <td className="txt-oflo">{notify.company.city}</td>
                  <td><span >{notify.company.phone}</span></td>
                </tr>
              ))}
              {companySliderNotifs && handleExtractNotifs(
                companySliderNotifs,
                'ویرایش عکس اسلایدر',
                '#c0ded9',
                true,
                `${baseAdminUrl}/company_slider/`,
                ['companySliderImage', 'Companysliders', 'companySliderNotifications',"Companysliders"] // one of these is not required
                                                                                       // and should be deleted
                
              )}
              {productNotifs && handleExtractNotifs(
                productNotifs,
                'ایجاد یا ویرایش محصول',
                '#e0e2e4',
                false,
                `${baseAdminStoreUrl}/product_notify/`,
                ['productNotifications',"products","categoryProducts"]
              )}
              {productImageNotifs && handleExtractNotifs(
                productImageNotifs,
                'ایجاد یا تغییر عکس محصول',
                '#c0ded9',
                true,
                `${baseAdminStoreUrl}/product_images/`,
                ['productImageNotifications',"products","categoryProducts"]
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Index
