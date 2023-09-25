import React, { useEffect, useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { WrapperLeft, WrapperRight } from "./styles";
import FormComponent from "../../components/FormComponent/FormComponent";
import { Image, message } from "antd";
import logoSignIn from "../../assets/images/logoSignIn.png";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent.jsx";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../service/UserService";
import useMutationHooks from "../../hooks/UseMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { updateUser } from "../../redux/slides/userSlide";
// lay du lieu tu api
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // gọi api login và truyền vào data
  const mutation = useMutationHooks((data) => UserService.UserLogin(data));
  // lấy các giữ liệu từ mutation
  const { data, isLoading, isError, isSuccess } = mutation;
  console.log("mutation", mutation);
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
    //phần mutation.mutate để thực hiện render lại giao diện khi dữ liệu thay đổi, lúc này data được cập nhật là email và password
    mutation.mutate({
      email,
      password,
    });
    console.log("value: ", email, password);
  };
  /* 
    bước 1: click => hàm showresult được thực hiện, thì email, password sẽ được render lại
    bước 2: lấy dữ liệu từ mutation lấy các dữ liệu: data, isLoading, isError, isSuccess
    bước 3: theo useEffect thì khi thành công access_token và refresh_token sẽ được lưu vào localStorage, sau đó ... lấy id và access_token
    Vì: ta phải lấy được dữ liệu của người đăng nhập để lưu vào kho từ đó sử dụng ở components khác
   */
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token))
      localStorage.setItem("refresh_token", JSON.stringify(data?.refresh_token))
      if (data?.access_token) {
        // sử dụng thư viện jwt_decode để giải mã payload của access_token
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          // thông qua hàm để lấy dữ liệu người dùng từ api
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);
  const handleGetDetailsUser = async (id, token) => {
    // lay duoc du lieu tu backend
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
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
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isLoading}>
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
          </Loading>
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
