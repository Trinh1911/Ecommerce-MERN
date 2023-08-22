import { Image } from "antd";
import React from "react";
import Slider from "react-slick";

const SliderComponent = ({ arraySlider }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:1000,
  };
  return (
    <div>
      <Slider {...settings}>
        {arraySlider.map((item)=> {
            return (
                <Image src={item} alt={item} preview={false} width="100%" height="426px"/>
            )
        })}
      </Slider>
    </div>
  );
};

export default SliderComponent;
