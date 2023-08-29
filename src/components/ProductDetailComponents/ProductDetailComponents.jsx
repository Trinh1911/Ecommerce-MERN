import { Col, Image, Row } from "antd";
import React from "react";
import { PlusOutlined, MinusOutlined, StarFilled } from "@ant-design/icons";
import detailsMain from "../../assets/images/detailsMain.jpg";
import productsSmaill from "../../assets/images/productsSmaill.jpg";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {
  Address,
  CurrentPrice,
  ExportGoods,
  NameProduct,
  Price,
  Quanlity,
  WrapperInputNumber,
} from "./styles.js";
const ProductDetailComponents = ({ textButton }) => {
  const onChange = () => {};
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Row style={{ padding: "16px 0 16px 16px" }}>
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
        <Col span={15}>
          <div style={{ padding: "16px 28px 16px 0px" }}>
            <NameProduct>
              Bộ Ga Gối Cotton Kẻ 3F Lidaco Chuyên Dụng Cho Homestay, Khách Sạn
              (Nhiều Mẫu Lựa Chọn)
            </NameProduct>
            <div>
              <StarFilled
                style={{
                  fontSize: "12px",
                  color: "#fdd836",
                }}
              />
              <StarFilled
                style={{
                  fontSize: "12px",
                  color: "#fdd836",
                }}
              />
              <StarFilled
                style={{
                  fontSize: "12px",
                  color: "#fdd836",
                }}
              />
              <span> | Đã bán 400+</span>
            </div>
          </div>
          <Price>
            <CurrentPrice>209.000 ₫</CurrentPrice>
          </Price>
          <ExportGoods>
            <span>Giao den</span>
            <span className="address">
              TP. Phan Rang-Tháp Chàm, P. Thanh Sơn, Ninh Thuận
            </span>{" "}
            "-"
            <span className="change-address">Doi dia chi</span>
          </ExportGoods>
          <Quanlity>
            <div>so luong </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "8px",
              }}
            >
              <button
                style={{
                  border: "1px solid rgb(236, 236, 236)",
                  backgroundColor: "#fff",
                }}
              >
                <PlusOutlined style={{ color: "#e2e2e2", fontSize: "20px" }} />
              </button>
              <WrapperInputNumber
                onChange={onChange}
                defaultValue={1}
                max={10}
                min={1}
                size="small"
              />
              <button
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgb(236, 236, 236)",
                }}
              >
                <MinusOutlined style={{ color: "#e2e2e2", fontSize: "20px" }} />
              </button>
            </div>
          </Quanlity>
          <ButtonComponent
            bordered={false}
            textButton={"chon mua"}
            style={{
              marginTop: "16px",
              backgroundColor: "rgb(255, 57, 69)",
              color: "#fff",
              minWidth: "190px",
              width: "100%",
              maxWidth: "300px",
              height: "48px",
              fontSize: "15px",
              lineHeight: "24px",
              fontWeight: "500",
            }}
          ></ButtonComponent>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailComponents;
