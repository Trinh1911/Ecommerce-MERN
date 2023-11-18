import React, { useEffect, useState } from "react";
import { Badge, Col, Image, Popover } from "antd";
import {
  ContentPopover,
  LogoHeader,
  MenuItems,
  MenuItemsCart,
  MenuItemsMobile,
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
  const [isOpenPopOver, setIsOpenPopOver] = useState(false);
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
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };
  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopOver(false);
  };
  // cập nhật tên người dùng khi có sự cập nhật từ trang thông tin người dùng
  useEffect(() => {
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
  }, [user?.name, user?.avatar]);
  const content = (
    <div>
      <ContentPopover onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </ContentPopover>
      {user?.isAdmin && (
        <ContentPopover onClick={() => handleClickNavigate("admin")}>
          Quản lí hệ thống
        </ContentPopover>
      )}
      <ContentPopover onClick={() => handleClickNavigate(`my-order`)}>
        Đơn hàng của tôi
      </ContentPopover>
      <ContentPopover onClick={() => handleClickNavigate()}>
        Đăng xuất
      </ContentPopover>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  const handleNavigateSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${search}`);
      setSearch("");
    }
  };
  return (
    <div
      style={{
        background: "#fff",
        borderBottom: " 1px solid #ff761c",
      }}
    >
      <Wrapper
        style={{ justifyContent: isHiddenSearch ? "space-between" : "unset" }}
      >
        <Col
          span={5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LogoHeader onClick={handleNavigateHome}>KT</LogoHeader>
          {/* ten dang nhap mobile */}
          <Loading isLoading={loading}>
            <MenuItemsMobile>
              {user?.access_token ? (
                <>
                  <Popover
                    content={content}
                    trigger="click"
                    open={isOpenPopOver}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      onClick={() => setIsOpenPopOver(!isOpenPopOver)}
                    >
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
                    style={{
                      fontSize: "24px",
                      marginRight: "4px",
                      color: "rgba(0,0,0,.88)",
                    }}
                  />
                  <TextHeader>Tài Khoản</TextHeader>
                </div>
              )}
            </MenuItemsMobile>
          </Loading>
        </Col>
        {!isHiddenSearch && (
          <Col
            xs={14}
            xl={13}
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
              onKeyPress={handleNavigateSearch}
              enterButton
            />
          </Col>
        )}
        <Col
          xs={5}
          xl={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* ten dang nhap laptop*/}
          <Loading isLoading={loading}>
            <MenuItems>
              {user?.access_token ? (
                <>
                  <Popover
                    content={content}
                    trigger="click"
                    open={isOpenPopOver}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      onClick={() => setIsOpenPopOver(!isOpenPopOver)}
                    >
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
                    style={{
                      fontSize: "24px",
                      marginRight: "4px",
                      color: "rgba(0,0,0,.88)",
                    }}
                  />
                  <TextHeader>Tài Khoản</TextHeader>
                </div>
              )}
            </MenuItems>
          </Loading>
          {!isHiddenCart && (
            <MenuItemsCart onClick={() => navigate("/order")}>
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined
                  style={{
                    fontSize: "24px",
                    marginRight: "4px",
                    color: "rgba(0,0,0,.88)",
                  }}
                />
              </Badge>
            </MenuItemsCart>
          )}
        </Col>
      </Wrapper>
    </div>
  );
};

export default Header;
