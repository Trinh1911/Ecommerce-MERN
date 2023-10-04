import React, { useEffect, useState, useRef } from "react";
import { Checkbox, Divider, Form, Space } from "antd";
import { Button } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader, WrapperUploadFile } from "./styles";
import { SearchOutlined } from "@ant-design/icons";
import { getBase64 } from "../../untils";
import InputComponent from "../InputComponent/InputComponent";
import useMutationHooks from "../../hooks/UseMutationHook";
import * as UserService from "../../service/UserService";
import Loading from "../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import * as Message from "../../components/Message/Message";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminUser = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state.user);
  // filter
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  // product
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  });
  // product update
  const [stateUserDetail, setUserDetail] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  });
  const [form] = Form.useForm();
  // gia tri duoc dua vao mutation update product
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });
  // deleted
  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserService.deletedUser(id, token);
    return res;
  });

  // lien ket voi api get all product
  const fetchUserAll = async () => {
    const res = await UserService.getAllUser();
    return res;
  };
  // update product
  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected);
    if (res?.data) {
      setUserDetail({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
      });
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    form.setFieldsValue(stateUserDetail);
  }, [form, stateUserDetail]);

  useEffect(() => {
    if (rowSelected) {
      setIsLoadingUpdate(true);
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected]);
  // khi click vao lan dau tien se goi api lan dau
  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isError: isErrorUpdated,
    isSuccess: isSuccessUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isError: isErrorDeleted,
    isSuccess: isSuccessDeleted,
  } = mutationDeleted;

  const queryUser = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserAll,
  });
  const { isLoading: isLoadingUser, data: users } = queryUser;
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
      </div>
    );
  };

  // search
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
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
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "IsAdmin",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    users?.data?.length &&
    users?.data?.map((user) => {
      return {
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? "true" : "false",
      };
    });
  // update
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      Message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      Message.error();
    }
  }, [isSuccessUpdated]);
  // delete
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      Message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      Message.error();
    }
  }, [isSuccessDeleted]);
  // set product vao gia tri ban dau khi update da thanh cong
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setUserDetail({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  // lay gia tri cua nguoi dung nhap vao
  const handleOnchange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeDetails = (e) => {
    setUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      image: file.preview,
    });
  };
  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setUserDetail({
      ...stateUserDetail,
      image: file.preview,
    });
  };
  // delete
  const handleDeletedUser = () => {
    mutationDeleted.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
      },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  // khi click vao finish thi gia tri nhap vao se duoc luu vao mutation
  const onUpdateUser = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateUserDetail },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
    console.log("nhan duoc");
  };
  return (
    <>
      <WrapperHeader>Quản lí người dùng</WrapperHeader>
      <TableComponent
        columns={columns}
        isLoading={isLoadingUser}
        data={dataTable}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id);
            },
          };
        }}
      />
      {/* update */}
      <DrawerComponent
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="50%"
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <InputComponent
                value={stateUserDetail["name"]}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <InputComponent
                value={stateUserDetail["email"]}
                onChange={handleOnchangeDetails}
                name="email"
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone!",
                },
              ]}
            >
              <InputComponent
                value={stateUserDetail.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>
            {/* <Form.Item
              label="Image"
              name="image"
              rules={[
                { required: true, message: "Please input your count image!" },
              ]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
              >
                <Button>Select File</Button>
                {stateUserDetail?.image && (
                  <img
                    src={stateUserDetail?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item> */}
            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      {/* xoa sp */}
      <ModalComponent
      forceRender
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeletedUser}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc muốn xóa tài khoản này không</div>
        </Loading>
      </ModalComponent>
    </>
  );
};

export default AdminUser;
