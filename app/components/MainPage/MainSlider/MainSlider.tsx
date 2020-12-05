import React from "react";
import Slider from "react-slick";
import { axiosInstance as axios } from '../../../services/axios/axios';
import { useQuery } from 'react-query';


// bookmark by pouria
// should be changed => url variable

type FetchedImages = {
  id: number;
  category: null;
  image: string;
}[]

interface IProps {
  images: FetchedImages
}


const MainSlider: React.FC<IProps> = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { data } = useQuery('landigSliderImages', fetchData, { initialData: props.images })
  console.log('data', data);


  return (
    <div
      className="banner_section slide_medium shop_banner_slider staggered-animation-wrap"
      style={{ marginBottom: "30px" }}
    >
      <div className="container-fluid">
        <div className="row px-5">
          <div className="col-lg-3 col-md-4 col-sm-6 col-3"></div>
          <div className="col-lg-9 col-12 col-12">
            <Slider {...settings}>
              {data?.map((image, index) => (
                <div key={index}>
                  <div
                    style={{
                      background: `url('${image.image}')`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: 'center',
                      borderRadius: "5px",
                      overflow: "hidden",
                    }}
                    className="carousel-item active background_bg"
                  >
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSlider;

const fetchData = async () => {
  const res = await axios.get(`/data_bank/admin/category_slider/`)
  return res.data
}

export async function getStaticProps() {
  const images = await fetchData()
  return { props: { images } }
}


// background: "url('images/mainslider/5.jpg')",