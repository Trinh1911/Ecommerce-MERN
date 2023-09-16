import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import {WrapButton} from "./styles.js"
const ButtonComponent = ({ size, bordered, style, textButton,disabled, ...rests }) => {
  return (
    <>
      <WrapButton
        size={size}
        style={{...style,
          backgroundColor: disabled ? "#ccc" : style.backgroundColor
        }}
        {...rests}
      >
        {textButton}
      </WrapButton>
    </>
  );
};
export default ButtonComponent;