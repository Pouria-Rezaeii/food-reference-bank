import React from "react";
import { Link } from 'react-router-dom'

const NotifFooter = () => {
  return (
    <li style={{ cursor: "pointer" }}>
      <div className="nav-link text-center link" >
        <Link to='/site-manager/notifications'>
          {" "}
          <strong>دیدن همه اعلان ها</strong>{" "}
          <i className="fa fa-angle-left" />
        </Link>
      </div>
    </li>
  );
};

export default NotifFooter;
