import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "./styles";
import SliderComponent from "../../components/SliderComponent/SliderComponent"
import slider1 from "../../assets/images/slider1.webp"
import slider2 from "../../assets/images/slider2.webp"
import slider3 from "../../assets/images/slider3.webp"
const HomePage = () => {
  const arr = ["Laptop", "TV", "Mobile"];
  return (
    <>
      <div style={{ padding: " 0 120px" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct key={arr} name={arr} />;
          })}
        </WrapperTypeProduct>
      </div>
        <div id="container" style={{backgroundColor: "#efefef", padding: '0 120px'}}>
        <SliderComponent arraySlider={[slider1, slider2, slider3]}/>
        </div>
    </>
  );
};

export default HomePage;
