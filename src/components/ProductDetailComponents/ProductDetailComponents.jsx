import { Col, Image, Row } from "antd";
import React from "react";
import detailsMain from "../../assets/images/detailsMain.jpg";
import productsSmaill from "../../assets/images/productsSmaill.jpg";

const ProductDetailComponents = () => {
  return (
    <div style={{ backgroundColor: "#fff"}}>
      <Row style={{padding: "16px 0 16px 16px"}}>
        <Col span={9}>
          <Image
            src={detailsMain}
            preview={false}
            style={{
              width: "444px",
            }}
          />
          <Row style={{ marginTop: "16px" }}>
            <Col span={4}>
            <Image
              src={productsSmaill}
              alt="image small"
              preview={false}
              style={{
                width: "64px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
            </Col>
            <Col span={4}>
            <Image
              src={productsSmaill}
              alt="image small"
              preview={false}
              style={{
                width: "64px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
            </Col>
            <Col span={4}>
            <Image
              src={productsSmaill}
              alt="image small"
              preview={false}
              style={{
                width: "64px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
            </Col>
            <Col span={4}>
            <Image
              src={productsSmaill}
              alt="image small"
              preview={false}
              style={{
                width: "64px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
            </Col>
            <Col span={4}>
            <Image
              src={productsSmaill}
              alt="image small"
              preview={false}
              style={{
                width: "64px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
            </Col>
            <Col span={4}>
            <Image
              src={productsSmaill}
              alt="image small"
              preview={false}
              style={{
                width: "64px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
            </Col>
          </Row>
        </Col>
        <Col span={15}>col-14</Col>
      </Row>
    </div>
  );
};

export default ProductDetailComponents;
