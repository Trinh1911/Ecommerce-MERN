import React, { useEffect, useState } from "react";
import { Badge, Col, Image, Popover } from "antd";
import {
  ContentPopover,
  LogoHeader,
  MenuItems,
  TextHeader,
  Wrapper,
} from "./styles";
import {
  SmileOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Search from "../Search/Search";
import * as UserService from "../../service/UserService";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/slides/userSlide";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/slides/ProductSlice";

const Header = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
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
  const handleNavigateAdmin = () => {
    navigate("/admin");
  };
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };
  // cập nhật tên người dùng khi có sự cập nhật từ trang thông tin người dùng
  useEffect(() => {
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
  }, [user?.name, user?.avatar]);
  const content = (
    <div>
      {user?.isAdmin && (
        <ContentPopover onClick={handleNavigateAdmin}>
          Quản lí hệ thống
        </ContentPopover>
      )}
      <ContentPopover onClick={handleNavigateProfileUser}>
        Thông tin người dùng
      </ContentPopover>
      <ContentPopover onClick={handleLogout}>Đăng xuất</ContentPopover>
    </div>
  );
  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  return (
    <div style={{background: 'linear-gradient(180deg, #252324 0%, #403C3D 100%)'}}>
      <Wrapper
        style={{ justifyContent: isHiddenSearch ? "space-between" : "unset" }}
      >
        <Col span={5} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <LogoHeader onClick={handleNavigateHome}>KT</LogoHeader>
        </Col>
        {!isHiddenSearch && (
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
              onChange={onSearch}
              enterButton
            />
          </Col>
        )}
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
            <MenuItems>
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {user?.avatar ? (
                        <Image
                        preview={false}
                          src={user?.avatar}
                          style={{
                            height: "30px",
                            width: "30px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                          alt="avatar"
                        />
                      ) : (
                        <UserOutlined
                          style={{ fontSize: "24px", marginRight: "4px" }}
                        />
                      )}
                      <TextHeader>
                        {userName?.length ? userName : user?.email}
                      </TextHeader>
                    </div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ display: "flex" }}>
                  <SmileOutlined
                    style={{ fontSize: "24px", marginRight: "4px" }}
                  />
                  <TextHeader>Tài Khoản</TextHeader>
                </div>
              )}
            </MenuItems>
          </Loading>
          {/*  */}
          {!isHiddenCart && (
            <MenuItems
              style={{ marginLeft: "24px", cursor: "pointer" }}
              onClick={() => navigate("/order")}
            >
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined
                  style={{
                    fontSize: "24px",
                    marginRight: "4px",
                    color: "#fff",
                  }}
                />
              </Badge>
            </MenuItems>
          )}
        </Col>
      </Wrapper>
    </div>
  );
};

export default Header;
