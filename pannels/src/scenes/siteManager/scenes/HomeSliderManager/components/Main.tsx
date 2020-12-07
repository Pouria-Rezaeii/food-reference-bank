
import React from "react";
import SliderLoaders from "../../../../../components/SliderLoaders";
import AddImage from "../../../../../components/AddImage";
import SliderCard from "../../../../../components/SliderCard";
import { baseAdminUrl } from "../../../../../services/utils/api/Admin";
import { ICategorySlider } from "../../../../../services/utils/api/Admin/models";
import { useMutation, useQueryCache, useQuery } from 'react-query'
import { axiosInstance as axios } from '../../../../../services/axios/axios'

// bookmarked by pouria

export const Main = () => {
  const queryCache = useQueryCache()

  //  - - - - - - - - - fetching images

  const fetchData = async () => {
    const res = await axios.get(`${baseAdminUrl}/category_slider/`)
    return res.data
  }

  const { data } = useQuery('homeSliderImages', fetchData)

  // - - - - - - - - - getting image, changing it to string, posting and invalidating cached data

  const postData = async (image: File) => {
    const fd = new FormData();
    fd.append("image", image);
    await axios.post(`${baseAdminUrl}/category_slider/`, fd)
  }

  const [mutate] = useMutation(postData, {
    onSuccess: () => queryCache.invalidateQueries('homeSliderImages')
  })

  const handleSendSubmit = (image: File) => {
    try {
      mutate(image)
    } catch { }

    return new Promise((res) => res());
  };

  // - - - - - - - - - deleting an image and invalidating cached data

  const deleteData = async (id: number) => {
    await axios.delete(`${baseAdminUrl}/category_slider/${id}`)
  }

  const [mutation] = useMutation(deleteData, {
    onSuccess: () => queryCache.invalidateQueries('homeSliderImages')
  })

  const handleDeleteItem = async (id: number) => {
    try {
      mutation(id)
    } catch { }
  };

  // - - - - - - returning JSX - - - - - - - 

  return (
    <>
      {!data && <SliderLoaders />}
      {data && (
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
        </>
      )}
    </>
  );
};
export default Main;