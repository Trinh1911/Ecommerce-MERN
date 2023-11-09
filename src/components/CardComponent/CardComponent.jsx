import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { StarFilled } from "@ant-design/icons";
import {
  DiscountText,
  ImageCard,
  NameProduct,
  PriceText,
  SaleText,
  CardProduct,
} from "./styles";
import logoSales from "../../assets/images/logoSales.png";
import sale from "../../assets/images/sale.png";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../untils";
const CardComponent = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    discount,
    selled,
    id,
  } = props;
  const navigate = useNavigate();
  const handleDetailProduct = (id) => {
    navigate(`/product-detail/${id}`);
  };
  return (
    <CardProduct
      hoverable
      onClick={() => handleDetailProduct(id)}
      style={{
        width: "220px",
        position: "relative",
      }}
      cover={
        <img
          alt="example"
          src={image}
          style={{
            width: "230px",
            height: "200px",
          }}
        />
      }
    >
      {discount && (<div style={{ position: "relative", left: "-20px",bottom: '209px', margin: "10px 0" }}>
        <Image
          src={sale}
          style={{
            width: "84px",
            height: "22px",
          }}
        />
        <span
          style={{
            position: "absolute",
            color: "#fff",
            fontSize: "12px",
            fontStyle: "italic",
            fontWeight: "700",
            left: "22px",
            top: "2px",
            zIndex: "10",
          }}
        >
          Bán chạy
        </span>
      </div>)}
      <NameProduct>{name}</NameProduct>
      <SaleText>
        <span style={{ marginRight: "4px" }}>
          <span>{rating}</span>
          <StarFilled
            style={{
              fontSize: "12px",
              color: "#fdd836",
            }}
          />
        </span>
        <span> | Đã bán {selled || 1000}+</span>
      </SaleText>
      <PriceText>
        <span style={{ marginRight: "8px" }}>{convertPrice(price)}</span>
        <DiscountText> - {discount || 5} %</DiscountText>
      </PriceText>
    </CardProduct>
  );
};

export default CardComponent;
