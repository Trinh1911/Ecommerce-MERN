import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import {WrapButton} from "./styles.js"
const ButtonComponent = ({ size, bordered, style, textButton,disabled, ...rest }) => {
  return (
    <>
      <WrapButton
        size={size}
        style={{...style,
          backgroundColor: disabled ? "#ccc" : style.backgroundColor
        }}
        {...rest}
      >
        {textButton}
      </WrapButton>
    </>
  );
};

export default ButtonComponent;
