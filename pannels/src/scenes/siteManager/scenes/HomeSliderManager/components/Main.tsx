import React, { useState } from "react";
import SliderLoaders from "../../../../../components/SliderLoaders";
import AddImage from "../../../../../components/AddImage";
import SliderCard from "../../../../../components/SliderCard";
import { baseAdminUrl } from "../../../../../services/utils/api/Admin";
import { ICategorySlider } from "../../../../../services/utils/api/Admin/models";
import { useMutation, useQueryCache, useQuery } from "react-query";
import { axiosInstance as axios } from "../../../../../services/axios/axios";
import { toast } from "react-toastify";
import Spinner from '../../../../../components/Spinner';

// import 
// bookmarked by pouria

export const Main = () => {
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const queryCache = useQueryCache();

  //  - - - - - - - - - fetching images

  const fetchData = async () => {
    const res = await axios.get(`${baseAdminUrl}/category_slider/`);
    return res.data;
  };

  const { data } = useQuery("homeSliderImages", fetchData);

  // - - - - - - - - - getting image, changing it to string, posting and invalidating cached data

  const postData = async (image: File) => {
    const fd = new FormData();
    fd.append("image", image);
    setShowSpinner(true)
    try {
      await axios.post(`${baseAdminUrl}/category_slider/`, fd);
      toast.success("اسلایدر مورد نظر با موفقیت اضافه شد.");
      setShowSpinner(false)
    } catch (e) {
      toast.error("عملیات با مشکل روبرو شد. دوباره سعی کنید.");
      setShowSpinner(false)
    }
  };

  const [mutate] = useMutation(postData, {
    onSuccess: () => {
      queryCache.invalidateQueries("homeSliderImages")
    },
  });

  const handleSendSubmit = (image: File) => {
    try {
      mutate(image);
    } catch { }

    return new Promise((res) => { });
  };

  // - - - - - - - - - deleting an image and invalidating cached data

  const deleteData = async (id: number) => {
    try {
      await axios.delete(`${baseAdminUrl}/category_slider/${id}`);
      toast.error("اسلایدر مورد نظر با موفقیت حذف شد.");
    } catch {
      toast.error("حذف اسلایدر با مشکل روبرو شد. دوباره سعی کنید.")
    }
  };

  const [mutation] = useMutation(deleteData, {
    onSuccess: () => {
      queryCache.invalidateQueries("homeSliderImages");
    },
  });

  const handleDeleteItem = async (id: number) => {
    try {
      mutation(id);
    } catch { }
  };

  // - - - - - - returning JSX - - - - - - -
  // {showSpinner ? <Spinner /> : }

  return (
    <>
      {!data && <SliderLoaders />}
      {data && !showSpinner ?
        <>
          {data.map((item: ICategorySlider) => (
            <div className="col-lg-3 col-md-6" key={item.id}>
              <SliderCard
                id={item.id}
                image={item.image}
                onDelete={() => handleDeleteItem(item.id)}
              />
            </div>
          ))}
          <AddImage url="/" onSubmit={(file) => handleSendSubmit(file)} />
        </> : !data && showSpinner  ?<div style={{ height: "100vh", width: '100%', display: 'flex', paddingTop: '200px', justifyContent: 'center' }}>
          <Spinner size='lg' /></div>:""}
    </>
  );
};
export default Main;
