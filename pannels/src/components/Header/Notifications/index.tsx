import React, { useRef, useEffect } from "react";
import NotifHeader from "./NotifHeader";
import Notifs from "./Notifs";
import NotifFooter from "./NotifFooter";


interface IProps {
  isShow: boolean;
}
const Index: React.FC<IProps> = ({ isShow }) => {

  return (
    <div
      className={`dropdown-menu dropdown-menu-right mailbox animated bounceInDown ${isShow && "show"}`}
    >
      <ul>
        <NotifHeader />
        <Notifs />
        <NotifFooter />
      </ul>
    </div>
  );
};

export default Index;
