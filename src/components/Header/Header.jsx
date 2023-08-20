import React from "react";
import { Col } from "antd";
import { Input, Space } from "antd";
import { LogoHeader, MenuItems, TextHeader, WrapperHeader } from "./styles";
import { SmileOutlined, ShoppingCartOutlined } from "@ant-design/icons";
const onSearch = (value) => console.log(value);
const Header = () => {
  const { Search } = Input;
  return (
    <div>
      <WrapperHeader gutter={16}>
        <Col span={5}>
          <LogoHeader>KT</LogoHeader>
        </Col>
        <Col span={13} style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col span={6} style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
          <MenuItems>
            <SmileOutlined style={{ fontSize: "24px", marginRight: "4px" }} />
            <TextHeader>Tài Khoản</TextHeader>
          </MenuItems>
          <MenuItems style={{marginLeft: '24px'}}>
            <ShoppingCartOutlined
              style={{ fontSize: "24px", marginRight: "4px" }}
            />
          </MenuItems>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default Header;
