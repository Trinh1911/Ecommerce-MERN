import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { ButtonMore, WrapperTypeProduct } from "./styles";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductService from "../../service/ProductService";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import { Col, Row } from "antd";
import { useQuery } from "@tanstack/react-query";
const HomePage = () => {
  const arr = ["Laptop", "TV", "Mobile"];
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const { isLoading, data: products } = useQuery(
    ["products"],
    fetchProductAll,
    {
      retry: 3,
      retryDelay: 1000,
    }
  );
  console.log("products: ", products);
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
              {products?.data?.map((product) => {
                return (
                  <Col className="gutter-row" span={4}>
                    <div>
                      <CardComponent
                        key={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        type={product.type}
                        selled={product.selled}
                        discount={product.discount}
                        id={product._id}
                      />
                    </div>
                  </Col>
                );
              })}
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
