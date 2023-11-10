import { Image } from "antd";
import React from "react";
import { WrapSlider } from "./styles.js";
const SliderComponent = ({ arraySlider }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <div>
      <WrapSlider {...settings}>
        {arraySlider.map((item) => {
          return (
            <div>
              <div style={{display: "flex", flexDirection: "column", margin: "auto", color: "#004146"}}>
                <span style={{fontSize: "13px", fontWeight: "700"}}>CÔNG NGHỆ VÀ ĐỜI SỐNG</span>
                <h1 style={{margin: "0",marginBottom: "10px", fontSize: "50px", lineHeight: "1.25"}}>
                  Công nghệ tạo khác biệt.
                  <br/> Công nghệ tiên tiến. 
                  <br/>Cuộc sống hiện đại.
                </h1>
                <p style={{color: "#667a7e", fontWeight: "400", lineHeight: "1.6", fontSize: "18px"}}>
                Nền tảng thương mại tổng hợp hàng đầu cung cấp cho bạn các công cụ thiết yếu để phát triển
                <br/>Xây dựng và mở rộng quy mô theo tốc độ của riêng bạn.
                </p>
              </div>
              <Image
                key={item}
                src={item}
                alt={item}
                preview={false}
                width="666px"
                height="666px"
              />
            </div>
          );
        })}
      </WrapSlider>
    </div>
  );
};

export default SliderComponent;
