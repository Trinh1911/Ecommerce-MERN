import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import { Button } from "antd";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const Search = (props) => {
  const { size, placeholder, textButton } = props;
  return (
    <div style={{ display: "flex", width: "90%" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        style={{
          borderRight: "0",
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0",
          backgroundColor: "#fff",
        }}
      />
      <ButtonComponent
        size={size}
        textButton={textButton}
        icon={<SearchOutlined />}
        style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
      ></ButtonComponent>
    </div>
  );
};

export default Search;
