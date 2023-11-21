import React, { useMemo, useState } from "react";
import { Button, Divider, Table } from "antd";
import Loading from "../LoadingComponent/Loading";
import { Excel } from "antd-table-saveas-excel";
const TableComponent = (props) => {
  const [rowSelectedKey, setRowSelectedKey] = useState([]);
  const {
    selectionType = "checkbox",
    data:dataSource = [],
    columns = [],
    isLoading = false,
    handleDeletedMany,
  } = props;
  // lấy mảng mới không có action để tạo ra file xls
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== 'action')
    return arr
  }, [columns])
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
    handleDeletedMany(rowSelectedKey);
  };
  // export exel
  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };
  return (
    <div>
      <Loading isLoading={isLoading}>
        <div style={{ margin: "10px", marginLeft: "0" }}>
          {rowSelectedKey.length > 0 && (
            <Button danger onClick={handleDeletedAll}>
              Xóa Tất Cả
            </Button>
          )}
        </div>
        <Button onClick={exportExcel}>Export Exel</Button>
        <div>
          <Divider />
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={dataSource}
            {...props}
          />
        </div>
      </Loading>
    </div>
  );
};

export default TableComponent;
