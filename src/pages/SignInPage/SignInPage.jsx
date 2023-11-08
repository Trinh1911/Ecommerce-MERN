import React, { useEffect, useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { WrapperLeft, WrapperRight } from "./styles";
import FormComponent from "../../components/FormComponent/FormComponent";
import { Image, message } from "antd";
import logoSignIn from "../../assets/images/logoSignIn.png";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import background from "../../assets/images/product/background.webp";
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
  const location = useLocation()
  // gọi api login và truyền vào data
  const mutation = useMutationHooks((data) => UserService.UserLogin(data));
  // lấy các giữ liệu từ mutation
  const { data, isLoading, isError, isSuccess } = mutation;
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
  };
  /* 
    bước 1: click => hàm showresult được thực hiện, thì email, password sẽ được render lại
    bước 2: lấy dữ liệu từ mutation lấy các dữ liệu: data, isLoading, isError, isSuccess
    bước 3: theo useEffect thì khi thành công access_token và refresh_token sẽ được lưu vào localStorage, sau đó ... lấy id và access_token
    Vì: ta phải lấy được dữ liệu của người đăng nhập để lưu vào kho từ đó sử dụng ở components khác
   */
  useEffect(() => {
    if (isSuccess) {
      if(location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
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
    style={{ position: "relative", zIndex: "1" }}
    >
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
              Đăng nhập hoặc tạo tài khoản
            </p>
          </div>
          <FormComponent
            placeholder="Mời bạn nhập gmail "
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
              textbutton={"Tiếp Tục"}
              style={{
                margin: "26px 0px 10px",
                background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',
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
            Bạn quên mật khẩu ?
          </p>
          <p
            style={{
              color: "rgb(120, 120, 120)",
              fontSize: "16px",
              margin: "10px 0 0",
            }}
          >
            Bạn chưa có tài khoản ?
            <span
              style={{
                color: "rgb(120, 120, 120)",
                fontSize: "16px",
                marginLeft: "5px",
              }}
              onClick={handleNavigateSignUp}
            >
              Mời Bạn tạo tài khoản
            </span>
          </p>
        </WrapperLeft>
      </div>
    </div>
  );
};

export default SignInPage;
