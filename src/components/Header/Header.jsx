import React from "react";
import { Col } from "antd";
import { LogoHeader, MenuItems, TextHeader, Wrapper } from "./styles";
import { SmileOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Search from "../Search/Search";
const onSearch = (value) => console.log(value);
const Header = () => {
  return (
    <div>
      <Wrapper gutter={16}>
        <Col span={5}>
          <LogoHeader>KT</LogoHeader>
        </Col>
        <Col
          span={13}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Search
            placeholder="input search text"
            size="default"
            textButton="Search"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col
          span={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MenuItems>
            <SmileOutlined style={{ fontSize: "24px", marginRight: "4px" }} />
            <TextHeader>Tài Khoản</TextHeader>
          </MenuItems>
          <MenuItems style={{ marginLeft: "24px" }}>
            <ShoppingCartOutlined
              style={{ fontSize: "24px", marginRight: "4px" }}
            />
          </MenuItems>
        </Col>
      </Wrapper>
    </div>
  );
};

export default Header;
