import React, { useState } from "react";
import useSWR from "swr";
import Button from "../../../../../components/Button";
import api from "../../../../../services/utils/api";
import { baseMyCompanySlideUrl } from "../../../../../services/utils/api/MyCompanySlider";
import { IMyCompanySliderRes } from "../../../../../services/utils/api/MyCompanySlider/models";
import AddImage from "../../../../../components/AddImage";
import Card from "../../../../../components/Card/Card";
import SliderLoaders from "../../../../../components/SliderLoaders";
import SliderCard from "../../../../../components/SliderCard";
import { useMutation, useQueryCache, useQuery } from "react-query";
import { axiosInstance } from "../../../../../services/axios/axios";

const Main = () => {
  const queryCache = useQueryCache();

  const getSlidersData = async () => {
    const res = await axiosInstance.get(`${baseMyCompanySlideUrl}`);
    return res.data;
  };
  const { data } = useQuery("sliders", getSlidersData);
// let data1=data
  const [sureDelete, setSureDelete] = useState(false);
  const [wantDeletedItemId, setWantDeletedItemId] = useState(-1);
  const handleSureDelete = (id: number) => {
    setSureDelete(true);
    setWantDeletedItemId(id);
  };

  const deleteSlider = async (id: number) => {
    // data1= data1.filter((item:number , i:number) => i !==id)
    const res = await axiosInstance.delete(`${baseMyCompanySlideUrl}/${id}`);
    return res.data;
  };

  const [mutate2] = useMutation(deleteSlider, {
    onSuccess: () => {
      queryCache.invalidateQueries("sliders");
    },
  });
  
  const handleDelete = async (id: number) => {
    try {
      mutate2(id);
    } catch (err) {}
  };
  const handleIgnoreSureDelete = () => {
    setSureDelete(false);
    setWantDeletedItemId(-1);
  };
  //ubuntu
  //tPJr557pLI
  //https://help.arvancloud.com/hc/fa/articles/360034478893
  //185.206.92.24

  const sendSlider = async (image: File) => {
    const fd = new FormData();
    fd.append("image", image);
    await axiosInstance.post(`${baseMyCompanySlideUrl}`, fd);
  };

  const [mutate1] = useMutation(sendSlider, {
    onSuccess: () => {
     queryCache.invalidateQueries("sliders");
    },
  });

  const sendSliderData = (image: File) => {
    try {
      mutate1(image);
    } catch {}
    return new Promise((res) => res());
  };
  return (
    <>
      {!data && <SliderLoaders />}
      {data && (
        <>
          {data.map((item) => (
            <div className="col-lg-3 col-md-6">
              <SliderCard
                {...item}
                isSureState={item.id === wantDeletedItemId && sureDelete}
                onDelete={handleDelete}
                onSureDelete={handleSureDelete}
                onIgnoreSureDelete={handleIgnoreSureDelete}
              />
            </div>
          ))}
          <AddImage url="/" onSubmit={sendSliderData} />
        </>
      )}
    </>
  );
};
export default Main;
