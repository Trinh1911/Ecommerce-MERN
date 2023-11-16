import { Col, Image, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusOutlined, StarFilled } from "@ant-design/icons";
import * as ProductService from "../../service/ProductService";
import { convertPrice } from "../../untils";
import Loading from "../LoadingComponent/Loading";
import * as Message from "../../components/Message/Message";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {
  CurrentPrice,
  NameProduct,
  Price,
  Quanlity,
  WrapperInputNumber,
  Title,
  ContentDescription,
  WrapContent,
  AttributeItem,
  TableContent,
  AttributeValue,
} from "./styles.js";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addOrderProduct,
} from "../../redux/slides/OrderSlice";
const ProductDetailComponents = ({ idProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [active, setActive] = useState(1);
  const [alert, setAlert] = useState(false);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // dùng để lưu địa chỉ khi đăng nhập không mất địa chỉ sản phẩm
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const onChange = (value) => {
    setQuantity(Number(value));
  };
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
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
  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === productDetails?._id
    );
    if (
      orderRedux?.amount + quantity <= orderRedux?.countInstock ||
      (!orderRedux && productDetails?.countInStock > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [quantity]);

  const hanleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited) {
        setQuantity(quantity + 1);
      }
    } else {
      if (!limited) {
        setQuantity(quantity - 1);
      }
    }
  };
  useEffect(() => {}, []);
  // xử lí sự kiện ấn chọn mua sản phẩm
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id
      );
      if (
        orderRedux?.amount + quantity <= orderRedux?.countInstock ||
        (!orderRedux && productDetails?.countInStock > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: quantity,
              image: productDetails?.image,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInstock: productDetails?.countInStock,
            },
          })
        );
        setAlert(true);
      } else {
        setErrorLimitOrder(true);
        setAlert(false);
      }
    }
  };
  useEffect(() => {
    if (alert) {
      Message.success("Đã thêm vào giỏ hàng");
    }
  }, [alert]);
  console.log("order?.isSuccessOrder", alert);
  return (
    <Loading isLoading={isLoading}>
      <div style={{ backgroundColor: "#fff" }}>
        <Row
          style={{ padding: "16px 0 16px 16px" }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col span={9}>
            <Image
              src={productDetails?.image}
              preview={false}
              style={{
                width: "444px",
              }}
            />
          </Col>
          <Col span={15}>
            <div style={{ margin: "28px 0", padding: "0 30px" }}>
              <div style={{ width: "600px", padding: "16px 28px 16px 0px" }}>
                <NameProduct>{productDetails?.name}</NameProduct>
              </div>
              <div style={{ display: "flex" }}>
                <Price>
                  <CurrentPrice>
                    {convertPrice(productDetails?.price)}
                  </CurrentPrice>
                </Price>
                <div style={{ margin: "14px 10px" }}>
                  <Rate
                    allowHalf
                    value={productDetails?.rating}
                    defaultValue={productDetails?.rating}
                  />
                  <span> | Đã bán {productDetails?.selled}</span>
                </div>
              </div>
              <Quanlity>
                <div> Số Lượng </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "8px",
                    marginLeft: "20px",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid rgb(236, 236, 236)",
                    }}
                    onClick={() => hanleChangeCount("decrease", quantity === 1)}
                  >
                    <MinusOutlined
                      style={{ color: "#e2e2e2", fontSize: "20px" }}
                    />
                  </button>
                  <WrapperInputNumber
                    onChange={onChange}
                    value={quantity}
                    min={1}
                    max={productDetails?.countInStock}
                    size="small"
                  />
                  <button
                    style={{
                      border: "1px solid rgb(236, 236, 236)",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      hanleChangeCount(
                        "increase",
                        quantity === productDetails?.countInStock
                      )
                    }
                  >
                    <PlusOutlined
                      style={{ color: "#e2e2e2", fontSize: "20px" }}
                    />
                  </button>
                </div>
              </Quanlity>
              {errorLimitOrder && (
                <div style={{ color: "red" }}>Sản phẩm đã hết hàng</div>
              )}
              <ButtonComponent
                textbutton={"Chọn Mua"}
                onClick={handleAddOrderProduct}
                style={{
                  marginTop: "16px",
                  marginLeft: "16px",
                  background:
                    "linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)",
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
              <div
                style={{
                  width: "168px",
                  marginLeft: "12px",
                  marginTop: "20px",
                  padding: "5px",
                  borderBottom: "1px solid #000",
                  fontSize: "17px",
                }}
              >
                Model: UAP-AC-PRO
              </div>
              <p
                style={{
                  paddingLeft: "16px",
                  width: "516px",
                  fontSize: "16px",
                  whiteSpace: "pre-line",
                  textAlign: "justify",
                }}
              >
                {productDetails?.description}
              </p>
            </div>
          </Col>
        </Row>
        {/* spectification */}
        <div
          style={{
            width: "1300px",
            height: "56px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            borderRadius: "20px",
            boxShadow: " 0 0 5pt 0.5pt #D3D3D3",
          }}
        >
          <Title onClick={() => setActive(1)}>Thông tin nổi bật</Title>
          <Title onClick={() => setActive(2)}>Thông số kỹ thuật</Title>
        </div>
        {active === 1 ? (
          <WrapContent>
            <ContentDescription>
              {productDetails?.descriptionType}
            </ContentDescription>
          </WrapContent>
        ) : (
          <TableContent>
            <tbody>
              <tr style={{ backgroundColor: "rgba(254, 234, 223, 0.7)" }}>
                <AttributeItem>Dimensions</AttributeItem>
                <AttributeValue>{productDetails?.dimensions}</AttributeValue>
              </tr>
              <tr>
                <AttributeItem>Networking Interface</AttributeItem>
                <AttributeValue>{productDetails?.netWork}</AttributeValue>
              </tr>
              <tr style={{ backgroundColor: "rgba(254, 234, 223, 0.7)" }}>
                <AttributeItem>Wireless Security</AttributeItem>
                <AttributeValue>
                  {productDetails?.wirelessSecurity}
                </AttributeValue>
              </tr>
              <tr>
                <AttributeItem>Power Supply</AttributeItem>
                <AttributeValue>{productDetails?.powerSupply}</AttributeValue>
              </tr>
            </tbody>
          </TableContent>
        )}
      </div>
    </Loading>
  );
};

export default ProductDetailComponents;
