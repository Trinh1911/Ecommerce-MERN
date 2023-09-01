import { Image } from "antd";
import React from "react";
import Slider from "react-slick";
import {WrapSlider} from "./styles.js"
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
      <WrapSlider {...settings}>
        {arraySlider.map((item)=> {
            return (
                <Image src={item} alt={item} preview={false} width="100%" height="426px"/>
            )
        })}
      </WrapSlider>
    </div>
  );
};

export default SliderComponent;
