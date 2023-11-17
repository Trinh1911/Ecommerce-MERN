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
  wrapImage
} from "./styles";
import logoSales from "../../assets/images/logoSales.png";
import sale from "../../assets/images/sale.png";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../untils";
const CardComponent = (props) => {
  const {
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
      cover={
        <img
          alt="example"
          src={image}
        />
      }
    >
      {selled >= 10 && (<div style={{ position: "absolute", left: "-12px",top: '0', margin: "10px 0" }}>
        <Image
          src={sale}
          style={{
            width: "78px",
            height: "19px",
          }}
        />
        <span
          style={{
            position: "absolute",
            color: "#fff",
            fontSize: "11px",
            fontStyle: "italic",
            fontWeight: "700",
            left: "19px",
            top: "3px",
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
        {discount && (<DiscountText> - {discount}  %</DiscountText>)}
      </PriceText>
    </CardProduct>
  );
};

export default CardComponent;
