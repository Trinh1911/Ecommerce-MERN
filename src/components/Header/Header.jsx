import React from "react";
import { Badge, Col } from "antd";
import { LogoHeader, MenuItems, TextHeader, Wrapper } from "./styles";
import { SmileOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const onSearch = (value) => console.log(value);
const Header = () => {
  const navigate = useNavigate()
  const user = useSelector((state)=> state.user)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  console.log('user', user)
  return (
    <div>
      <Wrapper>
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
          {/* ten dang nhap */}
          <MenuItems onClick={handleNavigateLogin} style={{cursor:'pointer'}}>
            {user?.name ? (
            <TextHeader>{user?.name}</TextHeader>
            ) : (
              <>
                <SmileOutlined style={{ fontSize: "24px", marginRight: "4px" }} />
                <TextHeader>Tài Khoản</TextHeader>
              </>
            )}
          </MenuItems>
          {/*  */}
          <MenuItems style={{ marginLeft: "24px" }}>
            <Badge count={4} size='small'>
              <ShoppingCartOutlined
                style={{ fontSize: "24px", marginRight: "4px", color: "#fff" }}
              />
            </Badge>
          </MenuItems>
        </Col>
      </Wrapper>
    </div>
  );
};

export default Header;
