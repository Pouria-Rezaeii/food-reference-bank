import React from "react";
import Header from "./Header";
import SideNav from "./SideNav";

// const mapRouteToComponent = {
//   '/main-page' : MainPage
// }
// const RightSideBar = () => {
//   const params = useParams()

//   useSwr => classes
//   useSwr => azmun

//   return classes.map(()=>)

// }

const BaseLayout: React.FC = ({ children  ,rightComponent}) => {
  return (
    <>
      <Header />
      <SideNav />
      <div className="page-wrapper" style={{ minHeight: "672px" }}>
        {/* <rightComponent/> */}
        {/* <RightSideBar/> */}
        {/* <div className="container-fluid mt-3">{children}</div> */}
      </div>
      <div className="page-wrapper" style={{ minHeight: "672px" }}>
        {/* <div className="container-fluid mt-3">{children}</div> */}
      </div>
      <div className="page-wrapper" style={{ minHeight: "672px" }}>
        {/* <div className="container-fluid mt-3">{children}</div> */}
      </div>
    </>
  );
};
BaseLayout.Right = (children) => {
  return children;
};
BaseLayout.Left = (children) => {
  return children;
};
BaseLayout.main = (children) => children;

export default BaseLayout;
