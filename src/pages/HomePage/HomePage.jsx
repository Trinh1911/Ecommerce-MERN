import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { ButtonMore, WrapperTypeProduct } from "./styles";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Col, Row } from "antd";
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
      <div className="body" style={{ width: "100%", backgroundColor: "#fff" }}>
        <div
          id="container"
          style={{ height: "1000px", width: "1270px", margin: "0 auto" }}
        >
          <SliderComponent arraySlider={[slider1, slider2, slider3]} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col className="gutter-row" span={4}>
                <div>
                  <CardComponent />
                </div>
              </Col>
              <Col className="gutter-row" span={4}>
                <div>
                  <CardComponent />
                </div>
              </Col>
              <Col className="gutter-row" span={4}>
                <div>
                  <CardComponent />
                </div>
              </Col>
              <Col className="gutter-row" span={4}>
                <div>
                  <CardComponent />
                </div>
              </Col>
              <Col className="gutter-row" span={4}>
                <div>
                  <CardComponent />
                </div>
              </Col>
              <Col className="gutter-row" span={4}>
                <div>
                  <CardComponent />
                </div>
              </Col>
            </Row>
            {/* <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent /> */}
          </div>
          <div
            style={{
              width: "100%",
              marginTop: "15px",
            }}
          >
            <ButtonMore
              textButton="xem them"
              type="outline"
              style={{
                display: "block",
                width: "240px",
                height: "38px",
                margin: "0 auto",
                borderRadius: "4px",
                border: "1px solid rgb(11, 116, 229)",
                color: "rgb(11, 116, 229)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
