import React from "react";
import {
  Lable,
  WrapperInfo,
  WrapperContainer,
  WrapperValue,
  WrapperCountOrder,
  WrapperItemOrder,
  WrapperItemOrderInfo,
  WrapperListOrder,
  WrapperItemOrderInfoMobile,
  WrapperItemOrderMobile,
} from "./styles";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";
import { convertPrice } from "../../untils";
import { Wrapper } from "../SearchFeed/styles";
import { Container } from "../OrderPage/styles";

const OrderSuccess = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <div style={{ with: "100%" }}>
      <Loading isLoading={false}>
        <Wrapper>
          <h3 style={{ color: "#fd7e14", marginLeft: "25px" }}>Đơn hàng đặt thành công</h3>
          <WrapperListOrder>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức giao hàng</Lable>
                  <WrapperValue>
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      {orderContant.delivery[state?.delivery]}
                    </span>{" "}
                    Giao hàng tiết kiệm
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức thanh toán</Lable>

                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              {/* laptop */}
              <WrapperItemOrderInfo>
                {state?.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.name}>
                      <div
                        style={{
                          width: "500px",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <img
                          src={order.image}
                          style={{
                            width: "77px",
                            height: "79px",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            width: 260,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {order?.name}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          Số lượng: {order?.amount}
                        </span>
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          Giá tiền: {convertPrice(order?.price)}
                        </span>
                      </div>
                    </WrapperItemOrder>
                  );
                })}
              </WrapperItemOrderInfo>
              {/* mobile */}
              <WrapperItemOrderInfoMobile>
                {state?.orders?.map((order) => {
                  return (
                    <WrapperItemOrderMobile key={order?.name}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <img
                          src={order.image}
                          style={{
                            width: "77px",
                            height: "79px",
                            objectFit: "cover",
                          }}
                        />
                        <Container>
                          <div
                            style={{
                              width: 260,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {order?.name}
                          </div>
                          <span style={{ fontSize: "13px", color: "#242424", margin: "5px 0" }}>
                            Số lượng: {order?.amount}
                          </span>
                          <span style={{ fontSize: "13px", color: "#242424" }}>
                            Giá tiền: {convertPrice(order?.price)}
                          </span>
                        </Container>
                      </div>
                    </WrapperItemOrderMobile>
                  );
                })}
              </WrapperItemOrderInfoMobile>
                <span
                  style={{
                    fontSize: "16px",
                    color: "red",
                    float: "right",
                    marginRight: "5px",
                    padding: "15px 10px"
                  }}
                >
                  Tổng tiền:{" "}
                  <span style={{ color: "#000" }}>
                    {convertPrice(state?.totalPrice)}
                  </span>
                </span>
            </WrapperContainer>
          </WrapperListOrder>
        </Wrapper>
      </Loading>
    </div>
  );
};

export default OrderSuccess;
