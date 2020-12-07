import React from "react";
import Slider from "react-slick";
interface Props{
  sliders:string[]
}
const CompanySlider:React.FC<Props> = ({sliders}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: "linear",
  };
  return (
    <Slider {...settings}>
        {sliders.map(slider=>(
          <div>
          <div style={{
            background: `url(${slider})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition:'center',
            height :'400px'
          }}>
          </div>
            </div>
        ))}
    </Slider>
  );
};

export default CompanySlider;
