import React, { useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { WrapperLeft, WrapperRight } from "./styles";
import FormComponent from "../../components/FormComponent/FormComponent";
import { Image } from "antd";
import * as UserService from "../../service/UserService";
import logoSignIn from "../../assets/images/logoSignIn.png";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent.jsx";
import { useNavigate } from "react-router-dom";
import useMutationHooks from "../../hooks/UseMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const mutation = useMutationHooks((data) => UserService.UserSign(data));
  const { data, isLoading } = mutation;
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
    mutation.mutate({email, password, confirmPassword})
    console.log("value: ", email, password, confirmPassword);
  };
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.53)",
        zIndex: "10",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "800px",
          height: "528px",
          borderRadius: "20px",
          backgroundColor: "#fff",
          margin: "80px auto",
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
              xin chao
            </h4>
            <p style={{ margin: "0px", fontSize: "15px" }}>
              Dang nhap hoac Tao tai khoan
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
              textButton={"tiep tuc"}
              style={{
                margin: "26px 0px 10px",
                backgroundColor: "rgb(255, 57, 69)",
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
            Ban da co tai khoan ?
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
        <WrapperRight>
          <Image
            src={logoSignIn}
            preview={false}
            width="203px"
            height="203px"
          />
          <div className="content">
            <h4>mua sam tai tiki</h4>
            <span>sieu uu dai moi ngay</span>
          </div>
        </WrapperRight>
      </div>
    </div>
  );
};
export default SignUpPage;
