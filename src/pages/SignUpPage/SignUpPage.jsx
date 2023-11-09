import React, { useEffect, useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { WrapperLeft, WrapperRight } from "./styles";
import FormComponent from "../../components/FormComponent/FormComponent";
import { Image } from "antd";
import * as UserService from "../../service/UserService";
import background from "../../assets/images/product/background.webp";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent.jsx";
import { useNavigate } from "react-router-dom";
import useMutationHooks from "../../hooks/UseMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as Message from "../../components/Message/Message";
const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const mutation = useMutationHooks((data) => UserService.UserSign(data));
  const { data, isLoading, isError, isSuccess } = mutation;
  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  const showresult = () => {
    mutation.mutate({ email, password, confirmPassword });
  };
  useEffect(() => {
    if (data?.status === "SUCCESS") {
      Message.success();
      handleNavigateSignIn();
    } else if (data?.status === "ERR") {
      Message.error("Tài khoản này đã được đăng ký!");
    }
  }, [data?.status]);
  console.log("data", data);
  return (
    <div style={{ position: "relative", zIndex: "1" }}>
      <Image src={background} preview={false} />
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: "800px",
          height: "528px",
          borderRadius: "20px",
          top: "70px",
          right: "28%",
          boxShadow:
            "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
        }}
      >
        <WrapperLeft>
          <div style={{ margin: "20px 0" }}>
            <h4
              style={{
                marginBottom: "20px",
                fontSize: "24px",
                fontWeight: "500",
              }}
            >
              Xin Chào
            </h4>
            <p style={{ margin: "0px", fontSize: "15px" }}>
              Đăng Nhập Hoặc Tạo Tài Khoản Mới
            </p>
          </div>
          <FormComponent
            placeholder="abc.email.com"
            style={{ marginBottom: "15px", fontSize: "14px" }}
            value={email}
            onChange={handleOnChangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <FormComponent
              style={{ marginBottom: "15px" }}
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnChangePassword}
            />
          </div>
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <FormComponent
              style={{ marginBottom: "15px" }}
              placeholder="confirm password"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnChangeConfirmPassword}
            />
          </div>
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isLoading}>
            <ButtonComponent
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
              onClick={showresult}
              textbutton={"Tiếp Tục"}
              style={{
                margin: "26px 0px 10px",
                background: "linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)",
                borderRadius: "4px",
                color: "#fff",
                minWidth: "190px",
                width: "100%",
                height: "50px",
                fontSize: "20px",
                lineHeight: "24px",
                fontWeight: "500",
              }}
            ></ButtonComponent>
          </Loading>
          <p
            style={{
              color: "rgb(13, 92, 182)",
              fontSize: "14px",
              margin: "20px 0 0",
              cursor: "pointer",
            }}
          >
            Đăng nhập bằng email
          </p>
          <p
            style={{
              color: "rgb(120, 120, 120)",
              fontSize: "14px",
              margin: "10px 0 0",
            }}
          >
            Bạn Đã Có Tài Khoản ?
            <span
              style={{
                color: "rgb(13, 92, 182)",
                fontSize: "14px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleNavigateSignIn()}
            >
              Đăng nhập
            </span>
          </p>
        </WrapperLeft>
      </div>
    </div>
  );
};
export default SignUpPage;
