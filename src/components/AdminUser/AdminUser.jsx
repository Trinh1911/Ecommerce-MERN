import React from "react";
import { WrapperHeader } from "./styles";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
const AdminUser = () => {
  return (
    <>
      <WrapperHeader>Quản lí người dùng</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <TableComponent/>
    </>
  );
};

export default AdminUser;
