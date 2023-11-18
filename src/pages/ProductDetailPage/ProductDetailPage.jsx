import React, { useState } from "react";
import ProductDetailComponents from "../../components/ProductDetailComponents/ProductDetailComponents.jsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CardComponent from "../../components/CardComponent/CardComponent.jsx";
import * as ProductService from "../../service/ProductService";
import { Col, Row } from "antd";
import { useQuery } from "@tanstack/react-query";
import Footer from "../../components/Footer/Footer.jsx";
import {
  WrapType,
  WrapperCard,
  WrapperProduct,
  WrapperProductMobile,
} from "../HomePage/styles.js";
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
      <WrapType>
        <div
          style={{
            marginTop: "22px",
            marginLeft: "50px",
            marginBottom: "10px",
            fontSize: "16px",
          }}
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
        {/* mobile */}
        <WrapperProductMobile>
          <WrapperCard
            gutter={{
              xs: 4,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            {products?.data?.map((product) => {
              return (
                product?.selled >= 10 && (
                  <Col className="gutter-row" xs={12}>
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
                )
              );
            })}
          </WrapperCard>
        </WrapperProductMobile>
        {/* laptop */}
        <WrapperProduct>
          <WrapperCard
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            style={{ width: "100%" }}
          >
            {products?.data?.map((product) => {
              return (
                product?.selled >= 10 && (
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
                        id={product._id}
                      />
                    </div>
                  </Col>
                )
              );
            })}
          </WrapperCard>
        </WrapperProduct>
      </WrapType>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
