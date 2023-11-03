import { Checkbox, Form, Radio } from "antd";
import React, { useState } from "react";
import {
  Lable,
  WrapperInfo,
  WrapperLeft,
  WrapperRadio,
  WrapperRight,
  WrapperTotal,
} from "./styles";
import * as UserService from "../../service/UserService";
import * as OrderService from "../../service/OrderService";
import * as Message from "../../components/Message/Message";
import useMutationHooks from "../../hooks/UseMutationHook";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
} from "../../redux/slides/OrderSlice";
import { convertPrice } from "../../untils";
import { useMemo } from "react";
import { useEffect } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import InputComponent from "../../components/InputComponent/InputComponent";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  console.log(order);
  const [listChecked, setListChecked] = useState([]);
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
  const handleAddCard = () => {
    if (!order?.orderItemsSelected?.length) {
      Message.error("Vui lòng chọn sản phẩm");
    } else if (!user?.phone || !user?.address || !user.name || !user?.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/payment");
    }
  };
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
        user: user?.id
      });
    }
  };
  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };
  // payment
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };
  const handleDilivery = (e) => {
    setDelivery(e.target.value);
  };
  // gia tri duoc dua vao mutation update product
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });
  // gia tri duoc dua vao mutation add order
  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.CreateOrder({ ...rests }, token);
    return res;
  });
  // mutation
  const { data, isLoading } = mutationUpdate;
  const { data: dataAdd,isLoading: isLoadingAddOrder, isError, isSuccess } = mutationAddOrder;
  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      Message.success('Đặt hàng thành công');
    } else if (isError) {
      Message.error();
    }
  }, [isSuccess]);
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
    if (priceMemo > 100000 || priceMemo === 0) {
      return 5000;
    } else {
      return 20000;
    }
  }, [order]);
  const TotalPriceMemo = useMemo(() => {
    return Number(priceMemo) + Number(DeliveryPriceMemo);
  }, [priceMemo, DeliveryPriceMemo]);
  return (
    <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
      <Loading isLoading={isLoadingAddOrder}>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h3>Giỏ hàng</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
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
              <ButtonComponent
                onClick={() => handleAddOrder()}
                size={40}
                style={{
                  margin: "26px 0px 10px",
                  background: "linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)",
                  borderRadius: "4px",
                  height: "48px",
                  width: "320px",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
                textButton={"Đặt hàng "}
              ></ButtonComponent>
            </WrapperRight>
          </div>
        </div>
      </Loading>
    </div>
  );
};
export default PaymentPage;
