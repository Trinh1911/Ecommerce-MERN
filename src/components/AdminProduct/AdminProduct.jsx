import React, { useEffect, useState, useRef } from "react";
import {  Form, Select, Space } from "antd";
import { Button } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader, WrapperUploadFile } from "./styles";
import { SearchOutlined } from "@ant-design/icons";
import { getBase64, renderOptions } from "../../untils";
import InputComponent from "../InputComponent/InputComponent";
import useMutationHooks from "../../hooks/UseMutationHook";
import * as ProductService from "../../service/ProductService";
import Loading from "../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import * as Message from "../../components/Message/Message";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [typeProduct, setTypeProduct] = useState([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [typeSelect, setTypeSelect] = useState("");
  const user = useSelector((state) => state.user);
  // filter
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  // product
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    discount: "",
    countInStock: "",
    newType: "",
  });
  // product update
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    discount: "",
    image: "",
    type: "",
    countInStock: "",
  });
  const [form] = Form.useForm();
  // gia tri duoc dua vao mutation
  const mutation = useMutationHooks((data) => {
    const {
      name,
      price,
      discount,
      description,
      rating,
      image,
      type,
      countInStock: countInStock,
    } = data;
    const res = ProductService.createProduct({
      name,
      price,
      discount,
      description,
      rating,
      image,
      type,
      countInStock,
    });
    return res;
  });
  // gia tri duoc dua vao mutation update product
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });
  // deleted
  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deletedProduct(id, token);
    return res;
  });
  // deleted many
  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = ProductService.deleteManyProduct(ids, token);
    return res;
  });
  // lien ket voi api get all product
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  // get type product
  const fetchTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };
  // update product
  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        discount: res?.data?.discount,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
      });
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    form.setFieldsValue(productDetails);
  }, [form, productDetails]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);
  // khi click vao lan dau tien se goi api lan dau
  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };
  const { data, isLoading, isError, isSuccess } = mutation;
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
  const {
    data: dataDeletedMany,
    isLoading: isLoadingDeletedMany,
    isError: isErrorDeletedMany,
    isSuccess: isSuccessDeletedMany,
  } = mutationDeletedMany;
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
  });
  const TypeProduct = useQuery({
    queryKey: ["type-product"],
    queryFn: fetchTypeProduct,
  });
  const { isLoading: isLoadingProducts, data: products } = queryProduct;
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
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 50",
          value: ">=",
        },
        {
          text: "<= 50",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 50;
        }
        return record.price <= 50;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">= 3",
          value: ">=",
        },
        {
          text: "<= 3",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.rating >= 3;
        }
        return record.rating <= 3;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });
  // khi tao 1 san moi thanh cong thi
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      Message.success();
      handleCancel();
    } else if (isError) {
      Message.error();
    }
  }, [isSuccess]);
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
  // delete many
  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      Message.success();
    } else if (isErrorDeletedMany) {
      Message.error();
    }
  }, [isSuccessDeletedMany]);
  // set product vao gia tri ban dau khi update da thanh cong
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setProductDetails({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: "",
      countInStock: "",
    });
    form.resetFields();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setProduct({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: "",
      countInStock: "",
    });
    form.resetFields();
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  // lay gia tri cua nguoi dung nhap vao
  const handleOnchange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeDetails = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setProduct({
      ...product,
      image: file.preview,
    });
  };
  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setProductDetails({
      ...productDetails,
      image: file.preview,
    });
  };
  // delete
  const handleDeletedProduct = () => {
    mutationDeleted.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  // delete many
  const handleDeletedManyProduct = (ids) => {
    mutationDeletedMany.mutate(
      {
        ids: ids,
        token: user?.access_token,
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  // khi click vao finish thi gia tri nhap vao se duoc luu vao mutation
  const onFinish = () => {
    const params = {
      name: product.name,
      price: product.price,
      description: product.description,
      rating: product.rating,
      image: product.image,
      type: product.type === 'add type' ? product.newType : product.type,
      countInStock: product.countInStock,
      discount: product.discount
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  };
  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...productDetails },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
    console.log("nhan duoc");
  };
  // select
  const handleChangeSelect = (value) => {
      setProduct({
        ...product,
        type: value,
      });
  };
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
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <TableComponent
        columns={columns}
        isLoading={isLoadingProducts}
        handleDeletedMany={handleDeletedManyProduct}
        data={dataTable}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id);
            },
          };
        }}
      />
      {/* tao sp */}
      <ModalComponent
        forceRender
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Loading isLoading={loading}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <InputComponent
                value={product["name"]}
                onChange={handleOnchange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your type!",
                },
              ]}
            >
              <Select
                name="type"
                style={{
                  width: 120,
                }}
                value={product.type}
                onChange={handleChangeSelect}
                options={renderOptions(TypeProduct?.data?.data)}
              />
            </Form.Item>
            {product.type === "add type" && (
              <Form.Item
                label="New type"
                name="newType"
                rules={[
                  {
                    required: true,
                    message: "Please input your type!",
                  },
                ]}
              >
                  <InputComponent
                    value={product.newType}
                    onChange={handleOnchange}
                    name="newType"
                  />
              </Form.Item>
            )}
            <Form.Item
              label="count InStock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Please input your count InStock!",
                },
              ]}
            >
              <InputComponent
                value={product.countInStock}
                onChange={handleOnchange}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input your rating!",
                },
              ]}
            >
              <InputComponent
                value={product.rating}
                onChange={handleOnchange}
                name="rating"
              />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <InputComponent
                value={product.price}
                onChange={handleOnchange}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Please input your discount!",
                },
              ]}
            >
              <InputComponent
                value={product.discount}
                onChange={handleOnchange}
                name="discount"
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your  description!",
                },
              ]}
            >
              <InputComponent
                value={product.description}
                onChange={handleOnchange}
                name="description"
              />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[
                { required: true, message: "Please input your count image!" },
              ]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button>Select File</Button>
                {product?.image && (
                  <img
                    src={product?.image}
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
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      {/* update */}
      <DrawerComponent
        title="Chi tiết sản phẩm"
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
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <InputComponent
                value={productDetails["name"]}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your type!",
                },
              ]}
            >
              <InputComponent
                value={productDetails["type"]}
                onChange={handleOnchangeDetails}
                name="type"
              />
            </Form.Item>
            <Form.Item
              label="count InStock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Please input your count InStock!",
                },
              ]}
            >
              <InputComponent
                value={productDetails.countInStock}
                onChange={handleOnchangeDetails}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input your rating!",
                },
              ]}
            >
              <InputComponent
                value={productDetails.rating}
                onChange={handleOnchangeDetails}
                name="rating"
              />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <InputComponent
                value={productDetails.price}
                onChange={handleOnchangeDetails}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <InputComponent
                value={productDetails.discount}
                onChange={handleOnchangeDetails}
                name="discount"
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your  description!",
                },
              ]}
            >
              <InputComponent
                value={productDetails.description}
                onChange={handleOnchangeDetails}
                name="description"
              />
            </Form.Item>
            <Form.Item
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
                {productDetails?.image && (
                  <img
                    src={productDetails?.image}
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
            </Form.Item>
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
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeletedProduct}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc muốn xóa sản phẩm này không</div>
        </Loading>
      </ModalComponent>
    </>
  );
};

export default AdminProduct;
