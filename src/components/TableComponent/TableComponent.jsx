import React, { useState } from "react";
import { Button, Divider, Table } from "antd";
import Loading from "../LoadingComponent/Loading";
const TableComponent = (props) => {
  const [rowSelectedKey, setRowSelectedKey] = useState([]);
  const {
    selectionType = "checkbox",
    data = [],
    columns = [],
    isLoading = false,
    handleDeletedMany,
  } = props;
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKey(selectedRowKeys);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === "Disabled User",
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  const handleDeletedAll = () => {
    handleDeletedMany(rowSelectedKey)
  };
  return (
    <div>
      <Loading isLoading={isLoading}>
        <div style={{ margin: "10px" }}>
          {rowSelectedKey.length > 0 && (
            <Button danger onClick={handleDeletedAll}>
              Xóa Tất Cả
            </Button>
          )}
        </div>
        <div>
          <Divider />
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            {...props}
          />
        </div>
      </Loading>
    </div>
  );
};

export default TableComponent;
