import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import {WrapButton} from "./styles.js"
const ButtonComponent = ({ size, bordered, style, textbutton,disabled, ...rests }) => {
  return (
    <>
      <WrapButton
        size={size}
        style={{...style,
          background: disabled ? "#ccc" : style.background
        }}
        {...rests}
      >
        {textbutton}
      </WrapButton>
    </>
  );
};
export default ButtonComponent;