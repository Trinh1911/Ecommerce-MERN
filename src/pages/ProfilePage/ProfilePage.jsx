import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  WrapperLabel,
  WrapperInput,
  WrapperUploadFile,
  Heading,
} from "./styles";
import FormComponent from "../../components/FormComponent/FormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../service/UserService";
import * as Message from "../../components/Message/Message";
import useMutationHooks from "../../hooks/UseMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { updateUser } from "../../redux/slides/userSlide";
import { Button } from "antd/es/radio";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../untils";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../SearchFeed/styles";
const ProfilePage = () => {
  // lay state ben sign in sau do lai lay ra nhap vao
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess } = mutation;
  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);
  useEffect(() => {
    if (isSuccess) {
      Message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      Message.error();
    }
  }, [isError, isSuccess]);
  const handleGetDetailsUser = async (id, token) => {
    // lay duoc du lieu tu backend
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };
  return (
    <Wrapper >
      <Heading>
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
      </Heading>
      <Container>
        <Loading isLoading={isLoading}>
          {/* name */}
          <WrapperInput>
            <WrapperLabel htmlFor="name">Tên</WrapperLabel>
            <FormComponent
              id="name"
              style={{ marginBottom: "15px", width: "300px" }}
              value={name}
              onChange={handleOnChangeName}
              placeholder={"nhap dia chi name"}
            />
            <ButtonComponent
              onClick={handleUpdate}
              textbutton={"Cập nhật"}
              style={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                marginTop: "15px",
                padding: "2px 6px 6px",
                color: "rgb(26, 148, 255)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
          {/* email */}
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <FormComponent
              id="email"
              style={{ marginBottom: "15px", width: "300px" }}
              value={email}
              onChange={handleOnChangeEmail}
              placeholder={"nhap dia chi email"}
            />
            <ButtonComponent
              onClick={handleUpdate}
              textbutton={"Cập nhật"}
              style={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                marginTop: "15px",
                padding: "2px 6px 6px",
                color: "rgb(26, 148, 255)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
          {/* phone */}
          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <FormComponent
              id="phone"
              style={{ marginBottom: "15px", width: "300px" }}
              value={phone}
              onChange={handleOnChangePhone}
              placeholder={"nhap dia chi phone"}
            />
            <ButtonComponent
              onClick={handleUpdate}
              textbutton={"Cập nhật"}
              style={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                marginTop: "15px",
                padding: "2px 6px 6px",
                color: "rgb(26, 148, 255)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
          {/* address */}
          <WrapperInput>
            <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
            <FormComponent
              id="address"
              style={{ marginBottom: "15px", width: "300px" }}
              value={address}
              onChange={handleOnChangeAddress}
              placeholder={"nhap dia chi address"}
            />
            <ButtonComponent
              onClick={handleUpdate}
              textbutton={"Cập nhật"}
              style={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                marginTop: "15px",
                padding: "2px 6px 6px",
                color: "rgb(26, 148, 255)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
          {/* avatar */}
          <WrapperInput style={{alignItems: "flex-end"}}>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </WrapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}
            <ButtonComponent
              onClick={handleUpdate}
              textbutton={"Cập nhật"}
              style={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
                marginTop: "15px",
                color: "rgb(26, 148, 255)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
        </Loading>
      </Container>
    </Wrapper>
  );
};

export default ProfilePage;
