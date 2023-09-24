import React, { useState } from "react";
import { Badge, Col, Popover } from "antd";
import { ContentPopover, LogoHeader, MenuItems, TextHeader, Wrapper } from "./styles";
import { SmileOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Search from "../Search/Search";
import * as UserService from "../../service/UserService";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/slides/userSlide";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingComponent/Loading";
const onSearch = (value) => console.log(value);
const Header = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleNavigateHome = () => {
    navigate("/");
  };
  const handleNavigateProfileUser = () => {
    navigate("/profile-user");
  };
  const handleLogout = async() => {
    setLoading(true);
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false);
  };
  const content = (
    <div>
      <ContentPopover onClick={handleLogout}>Đăng xuất</ContentPopover>
      <ContentPopover onClick={handleNavigateProfileUser}>Thông tin người dùng</ContentPopover>
    </div>
  );
  return (
    <div>
      <Wrapper>
        <Col span={5}>
          <LogoHeader onClick={handleNavigateHome}>KT</LogoHeader>
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
          <Loading isLoading={loading}>
            <MenuItems
              style={{ cursor: "pointer" }}
            >
              {user?.name ? (
                <>
                  <Popover content={content} trigger="click">
                      <TextHeader>{user.name}</TextHeader>
                    </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{display: 'flex'}}>
                  <SmileOutlined 
                    style={{ fontSize: "24px", marginRight: "4px" }}
                  />
                  <TextHeader>Tài Khoản</TextHeader>
                </div>
              )}
            </MenuItems>
          </Loading>
          {/*  */}
          <MenuItems style={{ marginLeft: "24px" }}>
            <Badge count={4} size="small">
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
