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
  const SearchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(SearchProduct, 1000)
  const refSearch = useRef()
  const [stateProduct, setStateProduct] = useState([])
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)
  // lay product
  const arr = ["Laptop", "TV", "Mobile"];
  const fetchProductAll = async (search) => {
    const res = await ProductService.getAllProduct(search); 
    if(search?.length > 0 || refSearch.current) {
      setStateProduct(res?.data)
  }else {
    return res;
  }
  };
  useEffect(() =>{
    if(refSearch.current) {
      setIsLoadingSearch(true)
      fetchProductAll(searchDebounce)
    }
    refSearch.current = true
    setIsLoadingSearch(false)
  }, [searchDebounce])
 
  const { isLoading, data: products } = useQuery(
    ["products"],
    fetchProductAll,
    {
      retry: 3,
      retryDelay: 1000,
    }
  );
   useEffect(() =>{
    if(products?.data?.length > 0) {
      setStateProduct(products?.data)
    }
  }, [products])
  return (
    <Loading isLoading={isLoading || isLoadingSearch}>
      <div style={{ padding: " 0 120px" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
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
              {stateProduct?.map((product) => {
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
            {/* <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent /> */}
          </div>
          <div
            style={{
              width: "100%",
              marginTop: "15px",
            }}
          >
            <ButtonMore
              textButton="xem them"
              type="outline"
              style={{
                display: "block",
                width: "240px",
                height: "38px",
                margin: "0 auto",
                borderRadius: "4px",
                border: "1px solid rgb(11, 116, 229)",
                color: "rgb(11, 116, 229)",
              }}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
