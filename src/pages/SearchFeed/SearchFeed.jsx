import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as ProductService from "../../service/ProductService";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import {
  ButtonMore,
  WrapperCard,
  WrapperProduct,
  WrapperProductMobile,
} from "../HomePage/styles";
import { Wrapper } from "./styles";

const SearchFeed = () => {
  const { search } = useParams();
  const [limit, setLimit] = useState(6);
  console.log("search", search);
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };
  // loc product
  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, search], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  return (
    <Wrapper>
      <div
        style={{
          fontSize: "30px",
          fontWeight: "500",
          lineHeight: "50px",
          marginLeft: "8px",
          marginTop: "8px",
          padding: "10px 0",
        }}
      >
        {`Kết quả tìm kiếm với từ khóa: ${search}`}
      </div>
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
      <div
        style={{
          width: "100%",
          marginTop: "15px",
        }}
      ></div>
    </Wrapper>
  );
};

export default SearchFeed;
