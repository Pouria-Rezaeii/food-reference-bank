import React from "react";

const NotifFooter = () => {
  return (
    <li style = {{cursor:"pointer"}}>
      <div className="nav-link text-center link" >
        {" "}
        <strong>دیدن همه اعلان ها</strong>{" "}
        <i className="fa fa-angle-left"/>
      </div>
    </li>
  );
};

export default NotifFooter;
