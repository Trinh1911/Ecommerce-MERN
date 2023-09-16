import React, { useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { WrapperLeft, WrapperRight } from "./styles";
import FormComponent from "../../components/FormComponent/FormComponent";
import { Image } from "antd";
import logoSignIn from "../../assets/images/logoSignIn.png";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent.jsx";
import { useNavigate } from "react-router-dom";
const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };
  const showresult = () => {
    console.log("value: ", email, password);
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
            style={{ marginBottom: "15px" }}
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
          <ButtonComponent
            disabled={!email.length || !password.length}
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
          <p
            style={{
              color: "rgb(13, 92, 182)",
              fontSize: "16px",
              margin: "20px 0 0",
              cursor: "pointer",
            }}
          >
            quen mat khau ?
          </p>
          <p
            style={{
              color: "rgb(120, 120, 120)",
              fontSize: "16px",
              margin: "10px 0 0",
            }}
          >
            chua co tai khoan ?
            <span
              style={{
                color: "rgb(120, 120, 120)",
                fontSize: "16px",
                marginLeft: "5px",
              }}
              onClick={handleNavigateSignUp}
            >
              tao tai khoan
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

export default SignInPage;