import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
const ButtonComponent = ({ size, bordered, style, textButton, ...rest }) => {
  return (
    <>
      <Button
        size={size}
        bordered={false}
        style={style}
        {...rest}
      >
        {textButton}
      </Button>
    </>
  );
};

export default ButtonComponent;
