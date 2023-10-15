import { Col, Image, Rate, Row } from "antd";
import React, { useState } from "react";
import { PlusOutlined, MinusOutlined, StarFilled } from "@ant-design/icons";
import detailsMain from "../../assets/images/detailsMain.jpg";
import productsSmaill from "../../assets/images/productsSmaill.jpg";
import * as ProductService from "../../service/ProductService";
import Loading from "../LoadingComponent/Loading";
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
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const ProductDetailComponents = ({ idProduct }) => {
  const [quantity, setQuantity] = useState(1)
  const user = useSelector((state) => state.user)
  const onChange = (value) => {
    setQuantity(Number(value))
  };
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    console.log("id", id);
    const res = await ProductService.getDetailsProduct(id);
    return res.data;
  };
  const { isLoading, data: productDetails } = useQuery(
    ["product-details", idProduct],
    fetchGetDetailsProduct,
    {
      enabled: !!idProduct,
    }
  );
  const hanleChangeCount = (type) => {
    if(type === 'increase') {
      setQuantity(quantity + 1)
    } else if(type === 'decrease') { 
      setQuantity(quantity - 1)
    }
  }
  console.log("productDetails", productDetails);
  return (
    <Loading isLoading={isLoading}>
      <div style={{ backgroundColor: "#fff" }}>
        <Row style={{ padding: "16px 0 16px 16px" }}>
          <Col span={9}>
            <Image
              src={productDetails?.image}
              preview={false}
              style={{
                width: "444px",
              }}
            />
            <Row style={{ marginTop: "16px" }}>
              <Col span={4}>
                <Image
                  src={productDetails?.image}
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
                  src={productDetails?.image}
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
                  src={productDetails?.image}
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
                  src={productDetails?.image}
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
                  src={productDetails?.image}
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
                  src={productDetails?.image}
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
              <NameProduct>{productDetails?.name}</NameProduct>
              <div>
              <Rate allowHalf value={productDetails?.rating} defaultValue={productDetails?.rating}/>
                <span> | Đã bán {productDetails?.selled}</span>
              </div>
            </div>
            <Price>
              <CurrentPrice>{productDetails?.price} ₫</CurrentPrice>
            </Price>
            <ExportGoods>
              <span>Giao den </span>
              <span className="address">
              {user?.address}
              </span>
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
                    cursor:'pointer',
                  }}
                  onClick={() =>hanleChangeCount('increase')}
                >
                  <PlusOutlined
                    style={{ color: "#e2e2e2", fontSize: "20px" }}
                  />
                </button>
                <WrapperInputNumber
                  onChange={onChange}
                  value={quantity}
                  max={10}
                  min={1}
                  size="small"
                />
                <button
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid rgb(236, 236, 236)",
                  }}
                  onClick={() =>hanleChangeCount('decrease')}
                >
                  <MinusOutlined
                    style={{ color: "#e2e2e2", fontSize: "20px" }}
                  />
                </button>
              </div>
            </Quanlity>
            <ButtonComponent
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
    </Loading>
  );
};

export default ProductDetailComponents;
