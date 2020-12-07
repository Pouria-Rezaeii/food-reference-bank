import React from "react";
import useSWR from "swr";
import { axiosInstance } from "../../../../services/axios/axios";
import axios from "axios";
import Post from "./Post";
import BaseLayout from "../../../../components/BaseLayout";






const Index = () => {
  const { data } = useSWR("https://jsonplaceholder.typicode.com/users");
  const handleLogin = () => {};

  return (
    <BaseLayout  />
  );
};

export default Index;
