import * as Yup from "yup";
import { utils } from "react-modern-calendar-datepicker";

import { convertStringToDate } from "../../../../services/utils/convertStringToDate";
export const adminCreatevalidationSchema = Yup.object({
  name: Yup.string().required("لطفا نام شرکت را وارد کنید"),
  manager_name: Yup.string().required("لطفا نام مدیرعامل را وارد کنید"),
  category: Yup.number().moreThan(1, "لطفا دسته بندی را انتخاب کنید"),
  phone_number: Yup.number()
    .typeError("شماره تلفن شرکت نمیتواند حروف باشد")
    .required("شماره تلفن شرکت را وارد کنید"),
  address: Yup.string().required("لطفا آدرس را وارد کنید"),
  description: Yup.string().required("لطفا نام شرکت را وارد کنید"),
   
});

// zip_code: Yup.number()
//   .typeError("کد پستی نمیتواند حروف باشد ")
//   .required("کد پستی را وارد کنید"),
// end_date: Yup.string().required("تاریخ پایان را وارد کنید"),
// start_date: Yup.string()
//   .required("تاریخ شروع را وارد کنید")
//   .test("isBefore", "تاریخ شروع باید قبل از تاریخ پایان باشد", function (
//     value
//   ) {
//     const endDate = this.parent.end_date as string;
//     if (endDate) {
//       return utils("fa").isBeforeDate(
//         convertStringToDate(value),
//         convertStringToDate(endDate)
//       );
//     }
//     return true;
//   }),
