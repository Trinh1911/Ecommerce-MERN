import React, { useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../service/ProductService";
import { useEffect } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

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
  })
  // panigate
  const fetchProductType = async (type, page, limit) => {
    setIsLoading(true)
    const res = await ProductService.getAllType(type, page, limit);
    if (res?.status == "OK") {
      setIsLoading(false)
      setProduct(res?.data);
      setPanigate({...panigate, total: res?.totalPages})
    } else {
      setIsLoading(true)
    }
    console.log("res", res);
  };
  useEffect(() => {
    if(state) {
      fetchProductType(state, panigate.page, panigate.limit);
    }
  }, [state, panigate.page, panigate.limit]);
  // search

  console.log('isLoading', isLoading)
  const onChange = (current, pageSize) => {
    console.log({current, pageSize})
    setPanigate({...panigate, page: current - 1, limit: pageSize})
  };
  return (
    <Loading isLoading={isLoading}>
      <div
        style={{
          padding: " 0 120px",
          background: "#efefef",
          height: "1000px",
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
            span={4}
            style={{
              background: "#fff",
              borderRadius: "4px 0 0 4px",
              width: "200px",
              height: "fit-content",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <NavbarComponent />
          </Col>
          <Col span={20}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <Row gutter={[10, 10]}>
                {product?.filter((pro)=> {
                  if(searchDebounce === '') {
                    return pro
                  } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                    return pro
                  }
                }).map((data) => {
                  return (
                    <Col className="gutter-row" span={2 / 4}>
                      <div>
                        <CardComponent key={data._id}
                          countInStock={data.countInStock}
                          description={data.description}
                          image={data.image}
                          name={data.name}
                          price={data.price}
                          rating={data.rating}
                          type={data.type}
                          selled={data.selled}
                          discount={data.discount}
                          id={data._id}/>
                      </div>
                    </Col>
                  );
                })}
  
                <Col span={20}>
                  <Pagination
                    defaultCurrent={panigate?.page + 1}
                    total={panigate?.total}
                    onChange={onChange}
                    style={{ textAlign: "center", marginTop: "10px" }}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Loading>
  );
};

export default TypeProductPage;
