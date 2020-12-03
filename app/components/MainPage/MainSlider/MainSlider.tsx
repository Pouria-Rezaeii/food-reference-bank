import React from "react";
import Slider from "react-slick";
// import { axiosInstance as axios } from '../../../services/axios/axios';
import axios from 'axios'
import { useQuery } from 'react-query';



// bookmark by pouria
// should be changed => url variable, axios instance


const MainSlider = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { data } = useQuery('landigSliderImages', fetchData, { initialData: props.images })
  // console.log(props);
  // console.log('data', data);

  const images = []

  return (
    <div
      className="banner_section slide_medium shop_banner_slider staggered-animation-wrap"
      style={{ marginBottom: "30px" }}
    >
      <div className="container">
        <div className="row px-5">
          <div className="col offset-lg-2">
            <Slider {...settings}>
              {/* {images?.map((image, index) => (
                <div
                  key={index}
                  className="carousel-item active background_bg"
                  style={{
                    background: image,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: 'bottom'
                  }}
                ></div>
              ))} */}
              <div>
                <div
                  style={{
                    background: "url('images/mainslider/5.jpg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: 'bottom'
                  }}
                  className="carousel-item active background_bg"
                >
                </div>
              </div>
              <div>
                <div
                  style={{
                    background: "url('images/mainslider/2.jpg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: 'center'
                  }}
                  className="carousel-item active background_bg"
                ></div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
{

  /* <div className="carousel-item background_bg">
    <img src="/images/banner4.jpg" alt="" />
  </div> */

}
export default MainSlider;

const fetchData = async () => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)  // url should be changed
  return res.data
}

export async function getStaticProps() {
  const images = await fetchData()
  return { props: { images } }
}
