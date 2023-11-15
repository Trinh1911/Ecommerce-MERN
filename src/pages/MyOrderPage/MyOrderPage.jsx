import React, { useEffect, useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import * as OrderService from "../../service/OrderService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { convertPrice } from "../../untils";
import {
  WrapperItemOrder,
  WrapperListOrder,
  WrapperHeaderItem,
  WrapperFooterItem,
  WrapperContainer,
  WrapperStatus,
} from "./styles";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import * as Message from "../../components/Message/Message";
import useMutationHooks from "../../hooks/UseMutationHook";

const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery(
    { queryKey: ["orders"], queryFn: fetchMyOrder },
    {
      // nếu có id và token của người dùng thì mới được phép gọi tới fetchMyOrder
      enabled: state?.id && state?.token,
    }
  );
  const { isLoading, data } = queryOrder;
  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token,
      },
    });
  };
  const mutationCancel = useMutationHooks((data) => {
    const { id, token, orderItems } = data;
    const res = OrderService.cancelOrder(id, token, orderItems);
    return res;
  });
  const handleCancelOrder = (order) => {
    mutationCancel.mutate(
      { id: order._id, token: state?.token, orderItems: order?.orderItems },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
  };
  const {
    data: dataCancel,
    isLoading: isLoadingCancel,
    isError: isErrorCancel,
    isSuccess: isSuccessCancel,
  } = mutationCancel;
  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      Message.success();
    } else if (isErrorCancel) {
      Message.error();
    }
  }, [isSuccessCancel, isErrorCancel]);

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderItem key={order?.name}>
          <img
            src={order?.image}
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              border: "1px solid rgb(238, 238, 238)",
              padding: "2px",
            }}
          />
          <div
            style={{
              width: 260,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginLeft: "10px",
            }}
          >
            {order?.name}
          </div>
          <span
            style={{ fontSize: "14px", color: "#242424", marginLeft: "auto" }}
          >
            {convertPrice(order?.price)}
          </span>
        </WrapperHeaderItem>
      );
    });
  };
  return (
    <Loading isLoading={isLoading || isLoadingCancel}>
      <WrapperContainer>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <div
            style={{ marginTop: "22px", marginLeft: "54px", fontSize: "16px" }}
          >
            <span
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                color: "#FD7E14",
                marginRight: "5px",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Trang chủ
            </span>
            - Profile User
          </div>
          <WrapperListOrder>
            {data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Trạng thái
                    </span>
                    <div style={{padding: "10px 0"}}>
                      <span
                        style={{ color: "rgb(255, 66, 78)" }}
                      >
                        Giao hàng:
                      </span>
                      {`${
                        order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"
                      }`}
                    </div>
                    <div style={{padding: "5px 0"}}>
                      <span
                        style={{ color: "rgb(255, 66, 78)" }}
                      >
                        Thanh toán:
                      </span>
                      {`${order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}`}
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{ color: "rgb(255, 66, 78)" }}>
                        Tổng tiền:
                      </span>
                      <span
                        style={{
                          fontSize: "15px",
                          color: "rgb(56, 56, 61)",
                          fontWeight: 700,
                        }}
                      >
                        {convertPrice(order?.totalPrice)}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
                      <ButtonComponent
                        onClick={() => handleCancelOrder(order)}
                        size={40}
                        style={{
                          height: "36px",
                          border: "1px solid rgb(11, 116, 229)",
                          borderRadius: "4px",
                        }}
                        textbutton={"Hủy đơn hàng"}
                        styleTextButton={{
                          color: "rgb(11, 116, 229)",
                          fontSize: "14px",
                        }}
                      ></ButtonComponent>
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        style={{
                          height: "36px",
                          border: "1px solid rgb(11, 116, 229)",
                          borderRadius: "4px",
                        }}
                        textbutton={"Xem chi tiết"}
                        styleTextButton={{
                          color: "rgb(11, 116, 229)",
                          fontSize: "14px",
                        }}
                      ></ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrderPage;
