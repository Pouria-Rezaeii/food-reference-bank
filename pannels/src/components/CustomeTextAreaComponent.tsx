
import React from "react";
import { FieldAttributes } from "formik";

const CustomeTextAreaComponent: React.FC<FieldAttributes<any>> = ({
  label,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const isError = touched[field.name] && errors[field.name];
  return (
    <div
      className={`form-group ${props.className} ${isError ? "has-danger" : ""}`}
    >
      <label>{label}</label>
      <textarea
        {...field}
        {...props}
        className={`${isError ? "form-control-danger" : ""} form-control`}
  ></textarea>
      {}
      {isError && (
        <div role="alert" className="form-control-feedback">
          {errors[field.name]}
        </div>
      )}
    </div>
  );
};

export default CustomeTextAreaComponent;
