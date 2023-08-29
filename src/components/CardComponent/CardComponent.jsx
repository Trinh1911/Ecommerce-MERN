import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { StarFilled } from "@ant-design/icons";
import { DiscountText, NameProduct, PriceText, SaleText } from "./styles";
import logoSales from "../../assets/images/logoSales.png";
const CardComponent = () => {
  return (
    <Card
      hoverable
      style={{
        width: "200px",
        position: "relative",
      }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
      <NameProduct>Nike</NameProduct>
      <SaleText>
        <span style={{ marginRight: "4px" }}>
          <span>4.5</span>
          <StarFilled
            style={{
              fontSize: "12px",
              color: "#fdd836",
            }}
          />
        </span>
        <span> | Đã bán 400+</span>
      </SaleText>
      <PriceText>
        <span style={{ marginRight: "8px" }}>1.000.000</span>
        <DiscountText> -15%</DiscountText>
      </PriceText>
    </Card>
  );
};

export default CardComponent;
