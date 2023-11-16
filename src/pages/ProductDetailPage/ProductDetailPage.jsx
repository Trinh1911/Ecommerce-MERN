import React, { useState } from "react";
import ProductDetailComponents from "../../components/ProductDetailComponents/ProductDetailComponents.jsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CardComponent from "../../components/CardComponent/CardComponent.jsx";
import * as ProductService from "../../service/ProductService";
import { Col, Row } from "antd";
import { useQuery } from "@tanstack/react-query";
import Footer from "../../components/Footer/Footer.js";
const ProductDetailPage = () => {
  const fetchProductAll = async (context) => {
    // const limit = context?.queryKey && context?.queryKey[1];
    const res = await ProductService.getAllProduct(5);
    return res;
  };
  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", 5], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ padding: "0 120px" }}>
        <div
          style={{ marginTop: "22px", marginLeft: "54px", fontSize: "16px" }}
        >
          <span
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              color: "#FD7E14",
              marginRight: "5px",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Trang chủ
          </span>
          - chi tiết sản phẩm
        </div>
        <ProductDetailComponents idProduct={id} />
        <div
          style={{
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
                <Col className="gutter-row" span={2 / 4}>
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
                      dimensions={product.dimensions}
                      netWork={product.netWork}
                      wirelessSecurity={product.wirelessSecurity}
                      powerSupply={product.powerSupply}
                      descriptionType={product.descriptionType}
                      id={product._id}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
