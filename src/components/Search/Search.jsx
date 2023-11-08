import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import { Button } from "antd";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const Search = (props) => {
  const { size, placeholder, textbutton } = props;
  return (
    <div style={{ display: "flex", width: "400px" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        style={{
          padding: "9px 86px 10px 29px",
          borderRadius: "43px",
          borderRight: "0",
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0",
          backgroundColor: "#fff",
        }}
        {...props}
      />
      <ButtonComponent
        size={size}
        textbutton={textbutton}
        icon={<SearchOutlined />}
        style={{
          height: "43px",
          width: "50px",
          borderRadius: "43px",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
        }}
      ></ButtonComponent>
    </div>
  );
};

export default Search;
