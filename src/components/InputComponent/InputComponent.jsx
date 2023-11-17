import React from "react";
// import { Input } from "antd";
import { WrapperInput } from "./styles";

const InputComponent = ({ size, placeholder, bordered, style, ...rest }) => {
  return (
    <>
      <WrapperInput
        size={size}
        placeholder={placeholder}
        style={style}
        {...rest}
      />
    </>
  );
};

export default InputComponent;
