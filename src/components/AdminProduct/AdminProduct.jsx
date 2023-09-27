import React from 'react'
import { Divider, Radio, Table } from "antd";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader } from './styles'

const AdminProduct = () => {
  return (
    <>
      <WrapperHeader>Quản lí sản phẩm</WrapperHeader>
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
  )
}

export default AdminProduct