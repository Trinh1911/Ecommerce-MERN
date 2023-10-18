import React, { useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../service/ProductService";
import { useEffect } from "react";
import Loading from "../../components/LoadingComponent/Loading";

const TypeProductPage = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const fetchProductType = async (type) => {
    const res = await ProductService.getAllType(type);
    if (res?.status == "OK") {
      setProduct(res?.data);
    } else {
      setIsLoading(true)
    }
    console.log("res", res);
  };
  console.log("product", product);
  useEffect(() => {
    fetchProductType(state);
    setIsLoading(false)
  }, [state]);
  const onChange = () => {};
  return (
    <Loading isLoading={isLoading}>
      <div
        style={{
          padding: " 0 120px",
          background: "#efefef",
          height: "1000px",
          paddingTop: "40px",
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
          <Col
            span={4}
            style={{
              background: "#fff",
              borderRadius: "4px 0 0 4px",
              width: "200px",
              height: "fit-content",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <NavbarComponent />
          </Col>
          <Col span={20}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <Row gutter={[10, 10]}>
                {product?.map((data) => {
                  return (
                    <Col className="gutter-row" span={2 / 4}>
                      <div>
                        <CardComponent key={data._id}
                          countInStock={data.countInStock}
                          description={data.description}
                          image={data.image}
                          name={data.name}
                          price={data.price}
                          rating={data.rating}
                          type={data.type}
                          selled={data.selled}
                          discount={data.discount}
                          id={data._id}/>
                      </div>
                    </Col>
                  );
                })}
  
                <Col span={20}>
                  <Pagination
                    defaultCurrent={2}
                    total={100}
                    onChange={onChange}
                    style={{ textAlign: "center", marginTop: "10px" }}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Loading>
  );
};

export default TypeProductPage;
