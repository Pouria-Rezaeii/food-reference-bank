import React from "react";
import Main from "./components/Main";
const Index = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="d-inline">اسلایدر های شرکت</h4>
          <p className="text-muted m-t-0">
            اسلایدر های شرکت خود را انتخاب نمایید.
          </p>
          <p style={{color:'red'}}>* حجم فایل انتخابی نباید بیش از یک مگابایت باشد.</p>
          <div className="row el-element-overlay">
            <Main />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
