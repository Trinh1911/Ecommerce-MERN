import { InputWrap } from "./styles";
import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
const FormComponent = (props) => {
  const { placeholder, style, ...rest } = props
  const handleOnChangeInput = (e) => {
    props.onChange(e.target.value)
  }
  return (
    <>
      <InputWrap
        placeholder={placeholder}
        value={props.value}
        style={style}
        {...rest}
        onChange={handleOnChangeInput}
      />
    </>
  );
};

export default FormComponent;