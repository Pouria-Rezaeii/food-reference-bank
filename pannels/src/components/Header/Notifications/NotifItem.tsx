import React from "react";
import { Notification } from './models';
import { useModalDispatch } from '../../../services/contexts/ModalContext/ModalContext';
import { EModalActionTypes } from '../../../services/contexts/ModalContext/models';
import NotificationModal from './NotificationModal';
import SliderNotificationModal from './SliderNotificationModal'

// bookmarked by pouria
// problems => Notification issue (data object type)
// problems => type issue (data object type)

interface IProps {
  notify: any
}

const NotifItem: React.FC<IProps> = ({ notify }) => {

  const modalDispatch = useModalDispatch()
  const tergetCmp = notify.status === 'c' ? SliderNotificationModal : NotificationModal

  const showModalHandle = () => {
    modalDispatch({
      type: EModalActionTypes.SHOW_MODAL,
      payload: {
        component: tergetCmp,
        props: { notify }
      }
    })
  }

  let status = notify.status === 'create' ? 'درخواست ایجاد شرکت' : 'درخواست ویرایش اطلاعات';
  if (notify.status === 'c') status = 'تغییر عکس اسلایدر'

  return (
    <a style={{ cursor: "pointer" }} onClick={showModalHandle}>
      <div className="btn btn-danger btn-circle">
        <i className="fa fa-link" />
      </div>
      <div className="mail-contnet">
        <h5>{status}</h5>
        <span className="mail-desc">{notify.name}</span>
        <h6 className="time">{notify.manager_name ? notify.manager_name : notify.company_name}</h6>
      </div>
    </a>
  );
};

export default NotifItem;
