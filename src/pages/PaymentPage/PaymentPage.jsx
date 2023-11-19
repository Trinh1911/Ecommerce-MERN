import { Form, Radio } from "antd";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useState } from "react";
import {
  Lable,
  WrapperInfo,
  WrapperRadio,
  WrapperRight,
  WrapperTotal,
} from "./styles";
import * as UserService from "../../service/UserService";
import * as PaymentService from "../../service/PaymentService";
import * as OrderService from "../../service/OrderService";
import * as Message from "../../components/Message/Message";
import useMutationHooks from "../../hooks/UseMutationHook";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../untils";
import { useMemo } from "react";
import { useEffect } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { Navigate, useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/slides/OrderSlice";
import { WrapperOrder, Container, WrapperLeft } from "../OrderPage/styles";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [sdkReady, setSdkReady] = useState(false);
  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [delivery, setDelivery] = useState("fast");
  const [payment, setPayment] = useState("later_money");
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.phone &&
      user?.city &&
      priceMemo &&
      user?.id
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: DeliveryPriceMemo,
        totalPrice: TotalPriceMemo,
        user: user?.id,
      });
    }
  };
  // payment
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };
  const handleDilivery = (e) => {
    setDelivery(e.target.value);
  };
  // gia tri duoc dua vao mutation add order
  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.CreateOrder({ ...rests }, token);
    return res;
  });
  // mutation
  const {
    data: dataAdd,
    isLoading: isLoadingAddOrder,
    isError,
    isSuccess,
  } = mutationAddOrder;
  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      // nếu thành công thì xóa các sản phẩm trong giỏ hàng
      const arrayOrdered = [];
      // đẩy các sản phẩm đã chọn vào 1 mảng rỗng
      order?.orderItemsSelected?.forEach((element) => {
        arrayOrdered.push(element.product);
      });
      // gọi đến hành động xóa các sản phẩm và truyền tham số mảng chứa các sản phẩm cho hành động
      dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
      Message.success("Đặt hàng thành công");
      // truyền đi 1 state có chứa các thông tin
      navigate("/orderSuccess", {
        state: {
          delivery,
          payment,
          orders: order?.orderItemsSelected,
          totalPrice: TotalPriceMemo,
        },
      });
    } else if (isError) {
      navigate('/sign-in')
      Message.error('Vui lòng đăng nhập lại');
    }
  }, [isSuccess, isError]);
  useEffect(() => {
    form.setFieldValue(stateUserDetail);
  }, [form, stateUserDetail]);
  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetail({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);
  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);
  const DeliveryPriceMemo = useMemo(() => {
    if (
      (priceMemo === 0 && order?.orderItemsSelected?.length === 0) ||
      priceMemo >= 2000000
    ) {
      return 0;
    } else if (priceMemo < 500000) {
      return 30000;
    } else {
      return 15000;
    }
  }, [order]);
  const TotalPriceMemo = useMemo(() => {
    return Number(priceMemo) + Number(DeliveryPriceMemo);
  }, [priceMemo, DeliveryPriceMemo]);
  // paypal
  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfig();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);
  const onSuccessPayment = (details, data) => {
    mutationAddOrder.mutate({
      token: user?.access_token,
      orderItems: order?.orderItemsSelected,
      fullName: user?.name,
      address: user?.address,
      phone: user?.phone,
      city: user?.city,
      paymentMethod: payment,
      itemsPrice: priceMemo,
      shippingPrice: DeliveryPriceMemo,
      totalPrice: TotalPriceMemo,
      user: user?.id,
      isPaid: true,
      paidAt: details.update_time,
    });
  };
  return (
    <div style={{with: "100%", height: "100vh" }}>
      <Loading isLoading={isLoadingAddOrder}>
        <WrapperOrder>
          <h3 style={{paddingLeft: "16px"}}>Giỏ hàng</h3>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức giao hàng</Lable>
                  <WrapperRadio onChange={handleDilivery} value={delivery}>
                    <Radio value="fast">
                      <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                        FAST
                      </span>
                      Giao hàng tiết kiệm
                    </Radio>
                    <Radio value="gojek">
                      <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                        GO_JEK
                      </span>
                      Giao hàng tiết kiệm
                    </Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức thanh toán</Lable>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="later_money">
                      Thanh toán tiền mặt khi nhận hàng
                    </Radio>
                    <Radio value="paypal">Thanh toán tiền bằng Paypal</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: "100%" }}>
                <WrapperInfo>
                  <div>
                    <span>Địa chỉ: </span>
                    <span style={{ fontWeight: "bold" }}>
                      {`${user?.address} , ${user?.city}`}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Tạm tính</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(priceMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Phí giao hàng</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(DeliveryPriceMemo)}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        color: "rgb(254, 56, 52)",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(TotalPriceMemo)}
                    </span>
                    <span style={{ color: "#000", fontSize: "11px" }}>
                      (Đã bao gồm VAT nếu có)
                    </span>
                  </span>
                </WrapperTotal>
              </div>
              {payment === "paypal" && sdkReady ? (
                <div
                  style={{
                    height: "48px",
                    width: "320px",
                  }}
                >
                  <PayPalButton
                    amount={Math.round(TotalPriceMemo / 30000)}
                    onSuccess={onSuccessPayment}
                    onError={() => {
                      alert("Error");
                    }}
                  />
                </div>
              ) : (
                <ButtonComponent
                  onClick={() => handleAddOrder()}
                  size={40}
                  style={{
                    margin: "26px 0px 10px",
                    background:
                      "linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)",
                    borderRadius: "4px",
                    height: "48px",
                    width: "320px",
                    border: "none",
                    borderRadius: "4px",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                  textbutton={"Đặt hàng "}
                ></ButtonComponent>
              )}
            </WrapperRight>
          </Container>
        </WrapperOrder>
      </Loading>
    </div>
  );
};
export default PaymentPage;
