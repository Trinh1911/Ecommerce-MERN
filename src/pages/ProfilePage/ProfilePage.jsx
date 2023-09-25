import React, { useEffect, useState } from "react";
import { Container, Title, WrapperLabel, WrapperInput } from "./styles";
import FormComponent from "../../components/FormComponent/FormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../service/UserService";
import * as Message from "../../components/Message/Message";
import useMutationHooks from "../../hooks/UseMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { updateUser } from "../../redux/slides/userSlide";
import Upload from "antd/es/upload/Upload";
import { Button } from "antd/es/radio";
import { UploadOutlined } from '@ant-design/icons';
const ProfilePage = () => {
  // lay state ben sign in sau do lai lay ra nhap vao
  const dispatch = useDispatch();
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
  const { data, isLoading, isError, isSuccess } = mutation;
  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
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
  const handleOnChangeAvatar = ({file}) => {
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
    <div style={{ height: "1000px", width: "1270px", margin: "0 auto" }}>
      <Title>Thông tin người dùng</Title>
      <Container>
        <Loading isLoading={isLoading}>
          {/* name */}
          <WrapperInput>
            <WrapperLabel htmlFor="name">name</WrapperLabel>
            <FormComponent
              id="name"
              style={{ marginBottom: "15px", width: "300px" }}
              value={name}
              onChange={handleOnChangeName}
              placeholder={"nhap dia chi name"}
            />
            <ButtonComponent
              onClick={handleUpdate}
              textButton={"Cập nhật"}
              style={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
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
              textButton={"Cập nhật"}
              style={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
                color: "rgb(26, 148, 255)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
          {/* phone */}
          <WrapperInput>
            <WrapperLabel htmlFor="phone">phone</WrapperLabel>
            <FormComponent
              id="phone"
              style={{ marginBottom: "15px", width: "300px" }}
              value={phone}
              onChange={handleOnChangePhone}
              placeholder={"nhap dia chi phone"}
            />
            <ButtonComponent
              onClick={handleUpdate}
              textButton={"Cập nhật"}
              style={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
                color: "rgb(26, 148, 255)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
          {/* address */}
          <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <FormComponent
              id="address"
              style={{ marginBottom: "15px", width: "300px" }}
              value={address}
              onChange={handleOnChangeAddress}
              placeholder={"nhap dia chi address"}
            />
            <ButtonComponent
              onClick={handleUpdate}
              textButton={"Cập nhật"}
              style={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
                color: "rgb(26, 148, 255)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
          {/* avatar */}
          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <Upload onChange={handleOnChangeAvatar}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            {/* <FormComponent
              id="avatar"
              style={{ marginBottom: "15px", width: "300px" }}
              value={avatar}
              onChange={handleOnChangeAvatar}
              placeholder={"nhap dia chi avatar"}
            /> */}
            <ButtonComponent
              onClick={handleUpdate}
              textButton={"Cập nhật"}
              style={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
                color: "rgb(26, 148, 255)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
        </Loading>
      </Container>
    </div>
  );
};

export default ProfilePage;