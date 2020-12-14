import React from "react";
import Link from "next/link";

const GotoLogin = () => {
  return (
    <div className="form-note text-center">
      اکانت دارید؟
      <Link href="/login">
        <a><span style={{marginRight:"5px"}}>وارد شوید</span></a>
      </Link>
    </div>
  );
};

export default GotoLogin;
