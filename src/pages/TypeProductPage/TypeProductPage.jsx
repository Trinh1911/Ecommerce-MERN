import React, { useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { Button, Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../service/ProductService";
import { useEffect } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { ButtonMore } from "../HomePage/styles";
import { WrapButton } from "./styles";

const TypeProductPage = () => {
  // state search
  const SearchProduct = useSelector((state) => state?.product?.search);
  // thời gian chờ
  const searchDebounce = useDebounce(SearchProduct, 500);
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });
  // lọc sản phẩm
  const [filterRedProduct, setFilterRedProduct] = useState(product);
  const [stateFilter, setstateFilter] = useState(false);
  // panigate
  const fetchProductType = async (type, page, limit) => {
    setIsLoading(true);
    const res = await ProductService.getAllType(type, page, limit);
    if (res?.status == "OK") {
      setIsLoading(false);
      setProduct(res?.data);
      setPanigate({ ...panigate, total: res?.totalPages });
    } else {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    if (state) {
      fetchProductType(state, panigate.page, panigate.limit);
    }
  }, [state, panigate.page, panigate.limit]);
  // search

  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };
  // hàm lọc sản phẩm nhỏ hơn 5 triệu
  const handleStateClick = () => {
    setstateFilter((pre) => !pre);
    console.log("test");
    if (!stateFilter) {
      setFilterRedProduct(product);
    }
  };
  const filterProductMin = (product, value) => {
    return product.filter((item) => {
      return item.price <= value;
    });
  };
  const handleFilterMin = () => {
    if (!stateFilter) return;
    const value = 5000000;
    const filtered = filterProductMin(product, value);
    setFilterRedProduct(filtered);
  };
  // hàm lọc sản phẩm lớn hơn 5 triệu
  const filterProductMax = (product, value) => {
    return product.filter((item) => {
      return item.price >= value;
    });
  };
  const handleFilterMax = () => {
    if (!stateFilter) return;
    const value = 5000000;
    const filtered = filterProductMax(product, value);
    setFilterRedProduct(filtered);
  };
  return (
    <Loading isLoading={isLoading}>
      <div
        style={{
          padding: " 0 120px",
          paddingTop: "40px",
        }}
      >
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col
            span={5}
            style={{
              background: "#fff",
              borderRadius: "4px 0 0 4px",
              width: "200px",
              height: "fit-content",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            {/* <NavbarComponent /> */}
            <div>
              {/* min */}
              <WrapButton onClick={handleFilterMin}>
                Sản phẩm có giá nhỏ hơn 5 triệu
              </WrapButton>
              {/* max */}
              <WrapButton onClick={handleFilterMax}>
                Sản phẩm có lớn nhỏ hơn 5 triệu
              </WrapButton>
              {/* không lọc */}
              <WrapButton onClick={handleStateClick}>default</WrapButton>
            </div>
          </Col>
          <Col span={19}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <Row gutter={[10, 10]}>
                {filterRedProduct?.filter((pro) => {
                    if (searchDebounce === "") {
                      return pro;
                    } else if (
                      pro?.name
                        ?.toLowerCase()
                        ?.includes(searchDebounce?.toLowerCase())
                    ) {
                      return pro;
                    }
                  })
                  .map((data) => {
                    return (
                      <Col className="gutter-row" span={2 / 4}>
                        <div>
                          <CardComponent
                            key={data._id}
                            countInStock={data.countInStock}
                            description={data.description}
                            image={data.image}
                            name={data.name}
                            price={data.price}
                            rating={data.rating}
                            type={data.type}
                            selled={data.selled}
                            discount={data.discount}
                            dimensions={data.dimensions}
                            netWork={data.netWork}
                            wirelessSecurity={data.wirelessSecurity}
                            powerSupply={data.powerSupply}
                            descriptionType={data.descriptionType}
                            id={data._id}
                          />
                        </div>
                      </Col>
                    );
                  })}
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Pagination
              defaultCurrent={panigate?.page + 1}
              total={panigate?.total}
              onChange={onChange}
              style={{ textAlign: "center", marginTop: "10px" }}
            />
          </Col>
        </Row>
      </div>
    </Loading>
  );
};

export default TypeProductPage;
