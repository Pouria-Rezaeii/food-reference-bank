import React from "react";
import { Notification } from './models';

// bookmarked by pouria
// problems => type issue

interface IProps {
  notify: any;
  onClick: () => void;
  status: string;
}

const NotifItem: React.FC<IProps> = ({ notify, onClick, status }) => {


  return (
    <a style={{ cursor: "pointer" }} onClick={onClick}>
      <div className="btn btn-danger btn-circle">
        <i className="fa fa-link" />
      </div>
      <div className="mail-contnet">
        <h5>{status}</h5>
        <span className="mail-desc">{notify.company.name}</span>
        <h6 className="time">{notify.company.manager_name}</h6>
      </div>
    </a>
  );
}

export default NotifItem;
