import * as Yup from "yup";
export const productCreatevalidationSchema = Yup.object({
  name: Yup.string().required("نام محصول را وارد کنید"),
  cost: Yup.number().required("قیمت محصول را وارد کنید") .typeError("قیمت محصول نمیتواند حروف باشد"),
  image: Yup.mixed().required("تصویر محصول را انتخاب کنید"),
});

export const productUpdatevalidationSchema = Yup.object({
  name: Yup.string().required("نام محصول نمی‌تواند خالی باشد"),
  cost: Yup.number().required("قیمت محصول نمی‌تواند خالی باشد") .typeError("قیمت محصول نمیتواند حروف باشد"),
});

