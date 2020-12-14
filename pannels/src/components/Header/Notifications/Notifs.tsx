import React from "react";
import NotifItem from "./NotifItem";
import { Notification } from './models';
import { useQuery } from 'react-query'
import { fetchCompanySliderNotifs, fetchCompanyNotifs, fetchProductImageNotifs, fetchProductNotifs } from '../../../services/axios/fetchers/notificatins'
import {useUserState} from '../../../services/contexts/UserContext/UserContext'

// bookmarded by pouria
// companySliderImage types issue

const Notifs = () => {
const userState = useUserState()
  const { data: productNotifs } = useQuery('productNotifications', fetchProductNotifs, {enabled: userState.rule === 'admin'})
  const { data: productImageNotifs } = useQuery('productImageNotifications', fetchProductImageNotifs, {enabled: userState.rule === 'admin'})
  const { data: companySliderNotifs } = useQuery('companySliderNotifications', fetchCompanySliderNotifs, {enabled: userState.rule === 'admin'})
  const { data: companyNotifs } = useQuery('notifications', fetchCompanyNotifs, {enabled: userState.rule === 'admin'})
  
  
  // amirreza goft felan in karo bokonam ta un notif hayi ke eshtebahi ba statuse update mian filter beshe

  const updatedCompanyNotifs = companyNotifs?.filter((notif: Notification) => {
    return notif.status === 'create' || (notif.status === 'update' && Object.keys(notif.data).length)
  })
  return (
    <li>
      <div className="message-center">
        {updatedCompanyNotifs?.map((notify: Notification, index: number) => (
          <NotifItem key={index} notify={notify} />
        ))}
        {companySliderNotifs?.map((notify: any, index: number) => (
          <NotifItem key={index} notify={notify} />
        ))}
      </div>
    </li>
  );
};

export default Notifs;
