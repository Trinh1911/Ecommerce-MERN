import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import {WrapButton} from "./styles.js"
const ButtonComponent = ({ size, bordered, style, textButton, ...rest }) => {
  return (
    <>
      <WrapButton
        size={size}
        bordered={false}
        style={style}
        {...rest}
      >
        {textButton}
      </WrapButton>
    </>
  );
};

export default ButtonComponent;
