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
import { toast } from "react-toastify";
import { useUserState } from '../../../../../services/contexts/UserContext/UserContext'

interface ISliderData {
  company: number;
  company_name: string;
  description_admin: string;
  id: number;
  image: string;
  status: "a" | "c" | "r";
}
const Main = () => {
  const queryCache = useQueryCache();
  const userState=useUserState();
  const getSlidersData = async () => {
    const res = await axiosInstance.get(`${baseMyCompanySlideUrl}/?status=a`);
    return res.data;
  };
  const { data } = useQuery<ISliderData[]>("Companysliders", getSlidersData);

  const [sureDelete, setSureDelete] = useState(false);
  const [wantDeletedItemId, setWantDeletedItemId] = useState(-1);
  const handleSureDelete = (id: number) => {
    setSureDelete(true);
    setWantDeletedItemId(id);
  };

  const deleteSlider = async (id: number) => {
    const res = await axiosInstance.delete(`${baseMyCompanySlideUrl}/${id}`);
    return res.data;
  };

  const [mutate2] = useMutation(deleteSlider, {
    onSuccess: () => {
      queryCache.invalidateQueries("Companysliders");
      toast.error("اسلایدر مورد نظر با موفقیت حذف شد.")
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
    try{
      await axiosInstance.post(`${baseMyCompanySlideUrl}/`, fd);
      userState.rule === "admin" || userState.rule === "adminCompany"
        ? toast.info("اسلایدر شما با موفقیت اضافه شد.")
        : toast.info("درخواست افزودن اسلایدر جدید برای ادمین ارسال شد.");
    }catch{
      toast.error("افزودن اسلایدر موفقیت آمیز نبود.")
    }
  };

  const [mutate1] = useMutation(sendSlider, {
    onSuccess: () => {
      queryCache.invalidateQueries("Companysliders");
    },
  });

  const sendSliderData = (image: File) => {
    try {
      mutate1(image);
    } catch {}
    return new Promise((res) => {});
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
