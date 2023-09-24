import React, { useState } from "react";
import { Container, Title, WrapperLabel, WrapperInput } from "./styles";
import FormComponent from "../../components/FormComponent/FormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleUpdate = () => {};
  return (
    <div style={{ height: "1000px", width: "1270px", margin: "0 auto" }}>
      <Title>Thông tin người dùng</Title>
      <Container>
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
      </Container>
    </div>
  );
};

export default ProfilePage;
