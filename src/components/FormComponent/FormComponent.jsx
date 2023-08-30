import { InputWrap } from "./styles";
import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
const FormComponent = ({ placeholder, style, ...rest }) => {
  const [ValueInput, setValueInput] = useState("");
  return (
    <>
      {/* <EyeOutlined/> */}
      <InputWrap
        placeholder={placeholder}
        ValueInput={ValueInput}
        style={style}
        {...rest}
      />
    </>
  );
};

export default FormComponent;
