import React from "react";
import Link from "next/link";

const GotoSignUp = () => {
  return (
    <div className="form-note text-center">
      اکانت ندارید؟
      <Link href="/signup">
        <a><span style={{marginRight:"5px"}}>اکنون ثبت نام کنید</span></a>
      </Link>
    </div>
  );
};

export default GotoSignUp;
