import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { StarFilled } from "@ant-design/icons";
import { DiscountText, NameProduct, PriceText, SaleText } from "./styles";
import logoSales from "../../assets/images/logoSales.png";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../untils";
const CardComponent = (props) => {
  const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
  const navigate = useNavigate()
  const handleDetailProduct = (id) => {
    navigate(`/product-detail/${id}`)
  }
  return (
    <Card
      hoverable
      onClick={()=>handleDetailProduct(id)}
      style={{
        width: "200px",
        position: "relative",
      }}
      cover={
        <img
          alt="example"
          src={image}
          style={{
            width: "200px",
            height: "200px",
          }}
        />
      }
    >
      <Image
        src={logoSales}
        style={{
          position: "absolute",
          width: "72px",
          height: "20px",
          zIndex: "2",
          bottom: "8px",
          left: "-6px",
        }}
      />
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
    </Card>
  );
};

export default CardComponent;
