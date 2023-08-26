import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "./styles";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
const HomePage = () => {
  const arr = ["Laptop", "TV", "Mobile"];
  return (
    <>
      <div style={{ padding: " 0 120px" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct key={item} name={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        id="container"
        style={{
          backgroundColor: "#efefef",
          height: "1000px",
          padding: "0 120px",
        }}
      >
        <SliderComponent arraySlider={[slider1, slider2, slider3]} />
        <div style={{ display: "flex", alignItems: "center", gap: "20px",marginTop: '20px' }}>
          <CardComponent />
        </div>
      </div>
    </>
  );
};

export default HomePage;
