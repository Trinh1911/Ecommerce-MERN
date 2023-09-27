import React, { useState } from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { getItem } from "../../untils";
import Header from "../../components/Header/Header";
const AdminPage = () => {
  const [openKeys, setOpenKeys] = useState(["user"]);
  const [keySelected, setKeySelected] = useState("");
  const items = [
    getItem("Người dùng", "sub1", <UserOutlined />, [
      getItem("Option 1", "1"),
      getItem("Option 2", "2"),
      getItem("Option 3", "3"),
      getItem("Option 4", "4"),
    ]),
    getItem("Sản phẩm", "sub2", <AppstoreOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Submenu", "sub3", null, [
        getItem("Option 7", "7"),
        getItem("Option 8", "8"),
      ]),
    ]),
    getItem("Đơn hàng", "sub4", <ShoppingCartOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];
  const rootSubmenuKeys = ["user", "product"];
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const handleClick = ({ key }) => {
    setKeySelected(key);
  };
  return (
    <>
      <Header isHiddenSearch isHiddenCart/>
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            width: 256,
          }}
          items={items}
          onClick={handleClick}
        />
        <div style={{ flex: 1 }}>
          {keySelected === "6" && <span>noi dung muc 6</span>}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
