import { FieldAttributes } from "formik";
import * as _ from "lodash";
import React, { useCallback, useState } from "react";
import { OptionsType, StylesConfig } from "react-select";
import AsyncSelect from "react-select/async";
import api from "../services/utils/api";
import { axiosInstance } from "./../services/axios/axios";

const styles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    border: "1px solid red",
  }),
  dropdownIndicator: (provided) => ({ ...provided, color: "red" }),
  indicatorSeparator: (provided) => ({ ...provided, color: "red" }),
};
let initialCity:string ; 
const CustomSelectUser: React.FC<FieldAttributes<any>> = ({
    calculateOptions,
  defaultValue,
  label,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, values , initialValues, setFieldValue, setFieldTouched}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  province
}) => {
    const [searchValue, setSearchValue] = useState("");
   const [data, setdata ]= useState([]);

  const handleSearchValueChange = (newValue: string) =>
    setSearchValue(newValue);
  const isError = touched[field.name] && errors[field.name];
  const handleChange = (e: any) => {
    e && e.value && setFieldValue(field.name, e.value, false);
    !e && setFieldValue(field.name, 0, false);
  };
  const handleFocus = () => {
    setFieldTouched(field.name, false, true);
  };
  const handleBlur = () => {
    setFieldTouched(field.name, true, true);
  };

  // axiosInstance.get(`/cities/?province=${values.province}`).then(({data})=>{
  //   console.log('initial' + data)})

  const promiseOptions = useCallback((
    inputValue: string,
    callback: (
      options: OptionsType<{
        value: number | string;
        label: string;
      }>
    ) => void
  ) => {
      // axiosInstance.get(`/cities/?province=${values.province}`).then(({data})=>{
      axiosInstance.get(`/admin/users`).then(({data})=>{          //this api should be changed
      console.log(data);
      callback(calculateOptions(data.filter(item=>item.username!=="admin") ))
   });
  },[])

  const debouncedLoadOptions = useCallback(
    _.debounce(promiseOptions, 1000),
    []
  );
  // console.log(defaultValue , 'defaulttttttttt');

  return (
    <div style = {{marginBottom:"25px"}}>
      <label>{label}</label>
      <AsyncSelect
        defaultValue={defaultValue}  
        cacheOptions
        isClearable
        defaultOptions
        loadOptions={debouncedLoadOptions}
        inputValue={searchValue}
        onInputChange={handleSearchValueChange}
        placeholder={'انتخاب نام کاریری'}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        styles={isError && styles}
        noOptionsMessage={() => "موردی یافت نشد!"}
        loadingMessage={() => "در حال بارگذاری..."}
      />

      {isError && (
        <div role="alert" className="text-danger form-control-feedback">
          {errors[field.name]}
        </div>
      )}
    </div>
  );
};
export default CustomSelectUser;
