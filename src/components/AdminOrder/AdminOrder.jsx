import React, { useRef } from "react";
import { Form, Space } from "antd";
import { Button } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import { orderContant } from "../../contant";
import { WrapperHeader } from "./styles";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import * as OrderService from "../../service/OrderService";
import Loading from "../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import PieChartComponent from "./PieChart";
import { formatTimeStr } from "antd/es/statistic/utils";

const AdminOrder = () => {
  const user = useSelector((state) => state.user);
  // filter
  // const searchInput = useRef(null);
  // const [form] = Form.useForm();
  // lien ket voi api get all product
  const fetchOrderAll = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };
  // khi click vao lan dau tien se goi api lan dau
  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrderAll,
  });
  const { isLoading: isLoadingOrder, data: orders } = queryOrder;
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Date",
      dataIndex: "updatedAt",
      sorter: (a, b) => a.updatedAt.length - b.updatedAt.length,
      ...getColumnSearchProps("updatedAt"),
    },
    {
      title: "Time",
      dataIndex: "time",
      sorter: (a, b) => a.time.length - b.time.length,
      ...getColumnSearchProps("time"),
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps("totalPrice"),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps("paymentMethod"),
    },
  ];
  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      const date = order.updatedAt.split('T')[0];
      const timeOrder = order.updatedAt.split('T')[1].split('.')[0];
      return {
        ...order,
        key: order._id,
        totalPrice: order.totalPrice,
        updatedAt: date,
        itemsPrice: order.itemsPrice,
        time: timeOrder,
        paymentMethod: orderContant.payment[order.paymentMethod],
        userName: order?.shippingAddress?.fullName,
        address: order?.shippingAddress?.address,
        phone: order?.shippingAddress?.phone,
      };
    });
  return (
    <>
      <WrapperHeader>Quản lí đơn hàng</WrapperHeader>
      <div style={{ height: "200px", width: "200px" }}>
        <PieChartComponent data={orders?.data}/>
      </div>
      <TableComponent
        columns={columns}
        data={dataTable}
        isLoading={isLoadingOrder}
      />
    </>
  );
};

export default AdminOrder;
