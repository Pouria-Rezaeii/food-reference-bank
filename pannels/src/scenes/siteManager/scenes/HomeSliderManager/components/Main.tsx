
import React, { useEffect } from "react";
import SliderLoaders from "../../../../../components/SliderLoaders";
import AddImage from "../../../../../components/AddImage";
import SliderCard from "../../../../../components/SliderCard";
import { baseAdminUrl } from "../../../../../services/utils/api/Admin";
import { ICategorySlider } from "../../../../../services/utils/api/Admin/models";
import { useMutation, useQueryCache, useQuery } from 'react-query'
import { axiosInstance as axios } from '../../../../../services/axios/axios'
// import axios from 'axios';

// bookmarked by pouria
// should be changed => delete method should be added

export const Main = () => {

  // useEffect(() => {
  //   axios.get('http://bank.sheroganj.ir/api/data_bank/admin/category/').then(res => res.data)
  // })


  const queryCache = useQueryCache()

  //  - - - - - - - - - fetching images

  const fetchData = async () => {
    const res = await axios.get(`${baseAdminUrl}/category/`)
    console.log(res.data);
    return res.data
  }

  const { data } = useQuery('homeSliderImages', fetchData)

  // - - - - - - - - - posting images and invalidating cached data


  const postData = async (stringImage: string) => {
    const res = await axios.post(`${baseAdminUrl}/category_slider/`, {
      category: 0,
      image: stringImage
    })
    console.log(stringImage);
    return res.data
  }

  const [mutate] = useMutation(postData, {
    onSuccess: () => queryCache.invalidateQueries('homeSliderImages')
  })

  const handleSendSubmit = (file: File) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {

      try {
        const stringImage = btoa(reader.result as string)
        mutate(stringImage)
        console.log(stringImage);
      } catch { }
    }
    return new Promise((res) => res());
  };

  // - - - - - - - - - deleting an image and invalidating cached data

  const deleteData = async (id: number) => {
    const res = await axios.delete(`${baseAdminUrl}/category_slider/${id}`)
    return res.data    // probably this would be deleted , and maybe even res variable
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