import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as ProductService from "../../service/ProductService";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import { ButtonMore } from "../HomePage/styles";

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
    <div style={{ marginTop: "40px", width: "1270px", margin: "0px auto" }}>
      <div
        style={{
          fontSize: "30px",
          fontWeight: "500",
          lineHeight: "50px",
          marginLeft: "8px",
          marginTop: "8px",
          // borderBottom: "1px solid #ff761c",
          padding: "10px 0",
        }}
      >
        {`Kết quả tìm kiếm với từ khóa: ${search}`}
      </div>
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
      <div
        style={{
          width: "100%",
          marginTop: "15px",
        }}
      ></div>
    </div>
  );
};

export default SearchFeed;
