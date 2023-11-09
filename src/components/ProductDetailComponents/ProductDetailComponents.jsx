import { Col, Image, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusOutlined, StarFilled } from "@ant-design/icons";
import detailsMain from "../../assets/images/detailsMain.jpg";
import productsSmaill from "../../assets/images/productsSmaill.jpg";
import * as ProductService from "../../service/ProductService";
import { convertPrice } from "../../untils";
import Loading from "../LoadingComponent/Loading";
import * as Message from "../../components/Message/Message";
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
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addOrderProduct,
  resetOrder,
  decreaseAmount,
  increaseAmount,
} from "../../redux/slides/OrderSlice";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent.jsx";
import CommentComponent from "../CommentComponent/CommentComponent.jsx";
const ProductDetailComponents = ({ idProduct }) => {
  const [quantity, setQuantity] = useState(1);
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
    const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
    if ((orderRedux?.amount + quantity) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
      setErrorLimitOrder(false);
    } else if(productDetails?.countInStock === 0){
      setErrorLimitOrder(true);
    }
  }, [quantity])
  
  const hanleChangeCount = (type, limited) => {
    if(type === 'increase') {
        if(!limited) {
            setQuantity(quantity + 1)
        }
    }else {
        if(!limited) {
            setQuantity(quantity - 1)
        }
    }
}
useEffect(()=> {
  
}, [])
  // xử lí sự kiện ấn chọn mua sản phẩm
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id
      );
      if ((orderRedux?.amount + quantity) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
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
      } else {
        setErrorLimitOrder(true);
      }
    }
  };
  useEffect(() => {
    if (order?.isSuccessOrder) {
      Message.success("Đã thêm vào giỏ hàng");
    }
  }, [order?.isSuccessOrder]);

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
                <Rate
                  allowHalf
                  value={productDetails?.rating}
                  defaultValue={productDetails?.rating}
                />
                <span> | Đã bán {productDetails?.selled}</span>
              </div>
            </div>
            <Price>
              <CurrentPrice>{convertPrice(productDetails?.price)}</CurrentPrice>
            </Price>
            <ExportGoods>
              <span>Giao đến </span>
              <span className="address"> {user?.address}</span>" - "
              <span className="change-address"> Đổi Địa chỉ</span>
            </ExportGoods>
            <LikeButtonComponent dataHref={'https://developers.facebook.com/docs/plugins/'}/>
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
            {errorLimitOrder && <div style={{color: 'red'}}>Sản phẩm đã hết hàng</div>}
            <ButtonComponent
              textbutton={"Chọn Mua"}
              onClick={handleAddOrderProduct}
              style={{
                marginTop: "16px",
                background: "linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)",
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
          <CommentComponent dataHref={'https://developers.facebook.com/docs/plugins/comments#configurator'} width="1270px"/>
        </Row>
      </div>
    </Loading>
  );
};

export default ProductDetailComponents;
