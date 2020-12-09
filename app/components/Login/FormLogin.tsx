// Render Prop
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import api from "../../services/api";
import { __isProd__ } from "../../services/isProd";
import CustomeInputComponent from "../CustomeInputComponent";
import GotoForgotPassword from "./GotoForgotPassword";
import { IFormikLoginState } from "./models";

const FormLogin = () => (
  <div>
    <Formik<IFormikLoginState>
      initialValues={{ username: "", password: "", email: "" }}
      validationSchema={Yup.object({
        // username: Yup.number().required(),
        username: Yup.string()
          .typeError("شماره موبایل نمیتواند حروف باشد")
          .required("لطفا شماره موبایل خود را وارد کنید"),
        password: Yup.string().required("لطفا رمز عبور خود را وارد کنید"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const res = await api.apiAuth.login(values);
        window.location.href = __isProd__
          ? "http://171.22.24.129/pannel"
          : "http://localhost:3000/pannel";

        //   fetch("/api/auth/login/", {
        //   method: "POST",
        //   body: JSON.stringify(values),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }).then((res) => console.log(res.json()));
        // axiosInstance.post('/auth/login/',values).then((res)=>console.log(res))
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            type="text"
            name="username"
            placeholder="شماره موبایل"
            component={CustomeInputComponent}
          />
          <Field
            type="password"
            name="password"
            placeholder="رمز عبور"
            component={CustomeInputComponent}
          />
          <Field
            type="email"
            name="email"
            placeholder="ایمیل"
            component={CustomeInputComponent}
          />
          <GotoForgotPassword />
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-fill-out btn-block"
              name="login"
              disabled={isSubmitting}
            >
              وارد شوید
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default FormLogin;
