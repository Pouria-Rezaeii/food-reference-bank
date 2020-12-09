import { FieldProps } from "formik";
import React from "react";

const CustomFileInputComponent: React.FC<
  FieldProps<any> & { label: string; className: string }
> = ({
  label,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue, ...restForm }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const isError = touched[field.name] && errors[field.name];

  const handleChange = (e: any) => {
    console.log({ t: e.target });

    e && e.target && setFieldValue(field.name, e.target.files[0], false);
    !e && setFieldValue(field.name, "", false);
  };
  let image = field.value && (
    <img
      style={{
        margin: "30px",
        height: "120px",
        width: "150px",
      }}
      src={
        typeof field.value === "object"
          ? URL.createObjectURL(field.value)
          : field.value
      }
    />
  );

  return (
    <div
      className={`form-group  ${props.className ? props.className : ""} ${
        isError ? "has-danger" : ""
      }`}
    >
      <label>{label}</label>
      {image}
      <input
        style={{
          maxWidth: "400px",
          maxHeight: "400px",
        }}
        // placeholder={"لوگوی جدید خود را انتخاب کیند"}
        onChange={handleChange}
        {...(field.onBlur, field.name)}
        {...props}
        className={`${isError ? "form-control-danger" : ""} form-control `}
      />
      {}
      {isError && (
        <div role="alert" className="form-control-feedback">
          {errors[field.name]}
        </div>
      )}
    </div>
  );
};

export default CustomFileInputComponent;
