import React, { useState } from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import {useUserDispatch} from "../services/contexts/UserContext/UserContext"
import {useQuery} from "react-query"
import {axiosInstance} from "../services/axios/axios"
import {EUserActionTypes} from "../services/contexts/UserContext/models"
const fetcher=async()=>{
  const role=await axiosInstance.get("/data_bank/role/")
  return role
}


const BaseLayout: React.FC = ({ children }) => {

  const userDispatch=useUserDispatch()
  const {data}=useQuery("role",fetcher,{
    onSuccess:(data)=>{
      userDispatch({type:EUserActionTypes.LOGIN,payload:{isAuth:true,username:"",rule:data.data.is_admin ? "admin" : "company"}})
    }
  })
  return (
    <>
      <Header />
      <SideNav />
      <div className="page-wrapper" style={{ minHeight: "672px" }}>
        <div className="container-fluid mt-3 ">{children}</div>
      </div>
    </>
  );
};

export default BaseLayout;
