import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import { Button } from "antd";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { WrapperSearch } from "./styles";
const Search = (props) => {
  const { size, placeholder, textbutton } = props;
  return (
    <WrapperSearch>
      <InputComponent
        size={size}
        placeholder={placeholder}
        {...props}
      />
      <ButtonComponent
        size={size}
        textbutton={textbutton}
        icon={<SearchOutlined />}
        style={{
          height: "44px",
          width: "50px",
          borderRadius: "43px",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
        }}
      ></ButtonComponent>
    </WrapperSearch>
  );
};

export default Search;
