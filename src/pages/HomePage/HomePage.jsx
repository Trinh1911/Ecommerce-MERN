import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { ButtonMore, WrapperTypeProduct } from "./styles";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductService from "../../service/ProductService";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import { Col, Row } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
const HomePage = () => {
  // fillter
  const SearchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(SearchProduct, 1000);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [limit, setLimit] = useState(6);
  const [typeProduct, setTypeProduct] = useState([])
  // lọc product
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };
  // get type product
  const fetchTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if(res?.status === 'OK') {
      setTypeProduct(res?.data)
    }
  };
  // loc product
  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchDebounce], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  // get type product
  useEffect(()=> {
    fetchTypeProduct()
  }, [])
  return (
    <Loading isLoading={isLoading || isLoadingSearch}>
      <div style={{ padding: " 0 120px" }}>
        <WrapperTypeProduct>
          {typeProduct.map((item) => {
            return <TypeProduct key={item} name={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div className="body" style={{ width: "100%", backgroundColor: "#fff" }}>
        <div
          id="container"
          style={{ height: "1000px", width: "1270px", margin: "0 auto" }}
        >
          <SliderComponent arraySlider={[slider1, slider2, slider3]} />
          <div
            style={{
              marginTop: "20px",
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
              {products?.data?.map((product) => {
                return (
                  <Col className="gutter-row" span={4}>
                    <div>
                      <CardComponent
                        key={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        type={product.type}
                        selled={product.selled}
                        discount={product.discount}
                        id={product._id}
                      />
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
          <div
            style={{
              width: "100%",
              marginTop: "15px",
            }}
          >
            <ButtonMore
              textButton={isPreviousData ? "Load more" : "xem them"}
              type="outline"
              style={{
                display: "block",
                width: "240px",
                height: "38px",
                margin: "0 auto",
                borderRadius: "4px",
                border: "1px solid rgb(11, 116, 229)",
                color: `${
                  products?.total === products?.data?.length
                    ? "#ccc"
                    : "rgb(11, 116, 229)"
                }`,
              }}
              styleTextButton={{
                fontWeight: 500,
                color: products?.total === products?.data?.length && "#fff",
              }}
              disabled={
                products?.total === products?.data?.length ||
                products?.totalPage === 1
              }
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
