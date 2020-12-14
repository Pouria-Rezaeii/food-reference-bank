import React from "react";
import NotifItem from "./NotifItem";
import { Notification } from './models';
import { useQuery } from 'react-query'
import { fetchCompanySliderNotifs, fetchCompanyNotifs, fetchProductImageNotifs, fetchProductNotifs } from '../../../services/axios/fetchers/notificatins'
import { useModalDispatch } from '../../../services/contexts/ModalContext/ModalContext';
import { EModalActionTypes } from '../../../services/contexts/ModalContext/models';
import NotificationModal from './NotificationModal';
import { baseAdminStoreUrl, baseAdminUrl } from '../../../services/utils/api/Admin'

// bookmarded by pouria
// types issue

const Notifs = () => {
  const modalDispatch = useModalDispatch()

  const { data: companyNotifs } = useQuery('companyNotifications', fetchCompanyNotifs)
  const { data: companySliderNotifs } = useQuery('companySliderNotifications', fetchCompanySliderNotifs)
  const { data: productNotifs } = useQuery('productNotifications', fetchProductNotifs)
  const { data: productImageNotifs } = useQuery('productImageNotifications', fetchProductImageNotifs)

  // amirreza goft felan in karo bokonam ta un notif hayi ke eshtebahi ba statuse update mian filter beshe

  const updatedCompanyNotifs = companyNotifs?.filter((notif: Notification) => {
    return notif.status === 'create' || (notif.status === 'update' && Object.keys(notif.data).length)
  })

  const showModalHandle = (notify: any, status: string, hasImage: boolean, url: string, cacheToInvalidate: string[]) => {
    const tergetCmp = NotificationModal
    modalDispatch({
      type: EModalActionTypes.SHOW_MODAL,
      payload: {
        component: tergetCmp,
        props: { notify, status, hasImage, url, cacheToInvalidate }
      }
    })
  }

  const handleExtractNotifs = (
    data: any[],
    status: string,
    hasImage: boolean,
    url: string,
    cacheToInvalidate: string[],
  ) => {
    return data.map((notify: any, index: number) => (
      <NotifItem key={index} notify={notify} status={status} onClick={() => showModalHandle(
        notify,
        status,
        hasImage,
        url,
        cacheToInvalidate,
      )} />
    ))
  }

  return (
    <li>
      <div className="message-center">
        {updatedCompanyNotifs?.map((notify: any, index: number) => (
          <NotifItem key={index} notify={notify} status='ایجاد یا ویرایش شرکت' onClick={() => showModalHandle(
            notify,
            'ایجاد یا ویرایش شرکت',
            false,
            `${baseAdminUrl}/notify/${notify.status}/`,
            ['companyNotifications', 'companyData']
          )} />
        ))}
        {companySliderNotifs && handleExtractNotifs(
          companySliderNotifs,
          'ویرایش عکس اسلایدر',
          true,
          `${baseAdminUrl}/company_slider/`,
          ['companySliderImage', 'Companysliders', 'companySliderNotifications'] // one of these is not required
          // and should be deleted
        )}
        {productNotifs && handleExtractNotifs(
          productNotifs,
          'ایجاد یا ویرایش محصول',
          false,
          `${baseAdminStoreUrl}/product_notify/`,
          ['productNotifications']
        )}
        {productImageNotifs && handleExtractNotifs(
          productImageNotifs,
          'ایجاد یا تغییر عکس محصول',
          true,
          `${baseAdminStoreUrl}/product_images/`,
          ['productImageNotifications']
        )}
      </div>
    </li>
  );
};

export default Notifs;
