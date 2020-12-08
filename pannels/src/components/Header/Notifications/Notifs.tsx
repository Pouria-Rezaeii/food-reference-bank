import React from "react";
import NotifItem from "./NotifItem";
import { Notification } from './models';
import { baseAdminUrl } from "../../../services/utils/api/Admin";
import { useQuery } from 'react-query'
import { axiosInstance as axios } from "../../../services/axios/axios";

// bookmarded by pouria
// companySliderImage types issue

const Notifs = () => {

  const fetchData = async () => {
    const res = await axios.get(`${baseAdminUrl}/companyNotify/`);
    return res.data
  }

  // amirreza goft felan in karo bokonam ta un notif hayi ke eshtebahi ba statuse update mian filter beshe

  let { data: notifs } = useQuery('notifications', fetchData)
  const updatedNotifs = notifs?.filter((notif: Notification) => {
    return notif.status === 'create' || (notif.status === 'update' && Object.keys(notif.data).length)
  })

  const fetchImages = async () => {
    const res = await axios.get(`${baseAdminUrl}/company_slider?status=c`);
    return res.data
  }

  let { data: companySliderImage } = useQuery('companySliderImage', fetchImages)

  return (
    <li>
      <div className="message-center">
        {updatedNotifs?.map((notify: Notification, index: number) => (
          <NotifItem key={index} notify={notify} />
        ))}
        {companySliderImage?.map((notify : any, index: number) => (
          <NotifItem key={index} notify={notify} />
        ))}
      </div>
    </li>
  );
};

export default Notifs;
