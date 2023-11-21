import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  ButtonMore,
  Container,
  InputInfo,
  WrapType,
  WrapperCard,
  WrapperInfo,
  WrapperProduct,
  WrapperProductMobile,
  WrapperTypeProduct,
} from "./styles";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductService from "../../service/ProductService";
import CountDown from "../../components/Coutdown/Coutdown";
import slider3 from "../../assets/images/slider/slider-4.webp";
import slider2 from "../../assets/images/slider/slider-3.webp";
import slider1 from "../../assets/images/slider/slider-2.webp";
import Cisco from "../../assets/images/brand/Logo Cisco.png";
import Aruba from "../../assets/images/brand/Logo aruba.png";
import Huawei from "../../assets/images/brand/Logo huawei.png";
import Unifi from "../../assets/images/brand/Logo unifi.png";
import { Col, Image, Row } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import Footer from "../../components/Footer/Footer";
const HomePage = () => {
  // fillter
  const SearchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(SearchProduct, 1000);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [limit, setLimit] = useState(5);
  const [typeProduct, setTypeProduct] = useState([]);
  // lọc product
  const fetchProductAll = async (context) => {
    console.log("context", context?.queryKey && context?.queryKey[1]);
    const limit = context?.queryKey && context?.queryKey[1];
    // const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct("", Number(limit));
    return res;
  };
  // get type product
  const fetchTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
    }
  };
  // loc product
  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  // get type product
  useEffect(() => {
    fetchTypeProduct();
  }, []);
  return (
    <Loading isLoading={isLoading || isLoadingSearch}>
      <WrapType>
        <WrapperTypeProduct>
          {typeProduct.map((item) => {
            return <TypeProduct key={item} name={item} />;
          })}
        </WrapperTypeProduct>
      </WrapType>
      <div className="body" style={{ width: "100%", backgroundColor: "#fff" }}>
        <Container>
          <SliderComponent arraySlider={[slider1, slider2, slider3]} />
          {/* thuong hieu */}
          <Row
            gutter={{ xs: 12, sm: 16, md: 24, lg: 32 }}
            style={{ marginTop: "57px", width: "100%" }}
          >
            <Col className="gutter-row" xl={6} xs={12}>
              <Image src={Cisco} preview={false} />
            </Col>
            <Col className="gutter-row" xl={6} xs={12}>
              <Image src={Aruba} preview={false} />
            </Col>
            <Col className="gutter-row" xl={6} xs={12}>
              <Image src={Huawei} preview={false} />
            </Col>
            <Col className="gutter-row" xl={6} xs={12}>
              <Image src={Unifi} preview={false} />
            </Col>
          </Row>
          {/* san pham ban chay lap top*/}
          <WrapperProduct>
            <div
              style={{
                fontSize: "30px",
                fontWeight: "500",
                lineHeight: "50px",
                marginLeft: "8px",
                marginTop: "8px",
                borderBottom: "1px solid #ff761c",
                padding: "10px 0",
              }}
            >
              Sản phẩm bán chạy
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <WrapperCard
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
                style={{ width: "100%" }}
              >
                {products?.data?.map((product) => {
                  return (
                    product?.selled >= 10 && (
                      <Col className="gutter-row" span={2 / 4}>
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
                    )
                  );
                })}
              </WrapperCard>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "15px",
              }}
            >
              <ButtonMore
                textbutton={isPreviousData ? "Load more" : "Xem Thêm"}
                type="outline"
                style={{
                  display: "block",
                  width: "240px",
                  height: "38px",
                  fontSize: "17px",
                  margin: "25px auto",
                  borderRadius: "4px",
                  border: "1px solid #FD7E14",
                  boxShadow: " 1px 1px 11px rgba(0, 0, 0, 0.18)",
                  borderRadius: "25px",
                  cursor: "pointer",
                  backgroundColor: "rgba(255, 255, 255)",
                  color: `${
                    products?.total === products?.data?.length ? "#fff" : "#000"
                  }`,
                }}
                styleTextButton={{
                  fontWeight: 500,
                  color:
                    products?.total === products?.data?.length && "#FD7E14",
                }}
                disabled={
                  products?.total === products?.data?.length ||
                  products?.totalPage === 1
                }
                onClick={() => setLimit((prev) => prev + 6)}
              />
            </div>
          </WrapperProduct>
          {/* san pham ban chay mobile*/}
          <WrapperProductMobile>
            <div
              style={{
                fontSize: "30px",
                fontWeight: "500",
                lineHeight: "50px",
                marginLeft: "8px",
                marginTop: "8px",
                borderBottom: "1px solid #ff761c",
                padding: "10px 0",
              }}
            >
              Sản phẩm bán chạy
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <WrapperCard
                gutter={{
                  xs: 12,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                {products?.data?.map((product) => {
                  return (
                    product?.selled >= 10 && (
                      <Col className="gutter-row" xs={12}>
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
                    )
                  );
                })}
              </WrapperCard>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "15px",
              }}
            >
              <ButtonMore
                textbutton={isPreviousData ? "Load more" : "Xem Thêm"}
                type="outline"
                style={{
                  display: "block",
                  width: "180px",
                  height: "38px",
                  fontSize: "17px",
                  margin: "25px auto",
                  borderRadius: "4px",
                  border: "1px solid #FD7E14",
                  boxShadow: " 1px 1px 11px rgba(0, 0, 0, 0.18)",
                  borderRadius: "25px",
                  cursor: "pointer",
                  backgroundColor: "rgba(255, 255, 255)",
                  color: `${
                    products?.total === products?.data?.length ? "#fff" : "#000"
                  }`,
                }}
                styleTextButton={{
                  fontWeight: 500,
                  color:
                    products?.total === products?.data?.length && "#FD7E14",
                }}
                disabled={
                  products?.total === products?.data?.length ||
                  products?.totalPage === 1
                }
                onClick={() => setLimit((prev) => prev + 6)}
              />
            </div>
          </WrapperProductMobile>
          {/* tat ca san pham */}
          <WrapperProduct>
            <div
              style={{
                fontSize: "30px",
                fontWeight: "500",
                lineHeight: "50px",
                marginLeft: "8px",
                marginTop: "8px",
                borderBottom: "1px solid #ff761c",
                padding: "10px 0",
              }}
            >
              Tất cả sản phẩm
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <WrapperCard
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                {products?.data?.map((product) => {
                  return (
                    <Col className="gutter-row" span={2 / 4}>
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
              </WrapperCard>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "15px",
              }}
            >
              <ButtonMore
                textbutton={isPreviousData ? "Load more" : "Xem Thêm"}
                type="outline"
                style={{
                  display: "block",
                  width: "240px",
                  height: "38px",
                  fontSize: "17px",
                  margin: "25px auto",
                  borderRadius: "4px",
                  border: "1px solid #FD7E14",
                  boxShadow: " 1px 1px 11px rgba(0, 0, 0, 0.18)",
                  borderRadius: "25px",
                  cursor: "pointer",
                  backgroundColor: "rgba(255, 255, 255)",
                  color: `${
                    products?.total === products?.data?.length ? "#fff" : "#000"
                  }`,
                }}
                styleTextButton={{
                  fontWeight: 500,
                  color:
                    products?.total === products?.data?.length && "#FD7E14",
                }}
                disabled={
                  products?.total === products?.data?.length ||
                  products?.totalPage === 1
                }
                onClick={() => setLimit((prev) => prev + 6)}
              />
            </div>
          </WrapperProduct>
          {/*tat ca san pham mobile*/}
          <WrapperProductMobile>
            <div
              style={{
                fontSize: "30px",
                fontWeight: "500",
                lineHeight: "50px",
                marginLeft: "8px",
                marginTop: "8px",
                borderBottom: "1px solid #ff761c",
                padding: "10px 0",
              }}
            >
              Sản phẩm bán chạy
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <WrapperCard
                gutter={{
                  xs: 12,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                {products?.data?.map((product) => {
                  return (
                    product?.selled >= 10 && (
                      <Col className="gutter-row" xs={12}>
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
                    )
                  );
                })}
              </WrapperCard>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "15px",
              }}
            >
              <ButtonMore
                textbutton={isPreviousData ? "Load more" : "Xem Thêm"}
                type="outline"
                style={{
                  display: "block",
                  width: "180px",
                  height: "38px",
                  fontSize: "17px",
                  margin: "25px auto",
                  borderRadius: "4px",
                  border: "1px solid #FD7E14",
                  boxShadow: " 1px 1px 11px rgba(0, 0, 0, 0.18)",
                  borderRadius: "25px",
                  cursor: "pointer",
                  backgroundColor: "rgba(255, 255, 255)",
                  color: `${
                    products?.total === products?.data?.length ? "#fff" : "#000"
                  }`,
                }}
                styleTextButton={{
                  fontWeight: 500,
                  color:
                    products?.total === products?.data?.length && "#FD7E14",
                }}
                disabled={
                  products?.total === products?.data?.length ||
                  products?.totalPage === 1
                }
                onClick={() => setLimit((prev) => prev + 6)}
              />
            </div>
          </WrapperProductMobile>
          {/* san pham giam gia */}
          <WrapperProduct>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "30px",
                fontWeight: "500",
                lineHeight: "50px",
                marginLeft: "8px",
                marginTop: "8px",
                borderBottom: "2px solid #FD7E14",
                padding: "10px 0",
              }}
            >
              Khuyến mãi hot
              <CountDown />
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <WrapperCard
                gutter={{
                  xs: 12,
                  sm: 8,
                  md: 8,
                  lg: 32,
                }}
              >
                {products?.data?.map((product) => {
                  return (
                    product?.discount && (
                      <Col className="gutter-row" span={2 / 4}>
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
                            dimensions={product.dimensions}
                            netWork={product.netWork}
                            wirelessSecurity={product.wirelessSecurity}
                            powerSupply={product.powerSupply}
                            descriptionType={product.descriptionType}
                            id={product._id}
                          />
                        </div>
                      </Col>
                    )
                  );
                })}
              </WrapperCard>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "15px",
              }}
            >
              <ButtonMore
                textbutton={isPreviousData ? "Load more" : "Xem Thêm"}
                type="outline"
                style={{
                  display: "block",
                  width: "240px",
                  height: "38px",
                  fontSize: "17px",
                  margin: "25px auto",
                  borderRadius: "4px",
                  border: "1px solid #FD7E14",
                  boxShadow: " 1px 1px 11px rgba(0, 0, 0, 0.18)",
                  borderRadius: "25px",
                  cursor: "pointer",
                  backgroundColor: "rgba(255, 255, 255)",
                  color: `${
                    products?.total === products?.data?.length ? "#fff" : "#000"
                  }`,
                }}
                styleTextButton={{
                  fontWeight: 500,
                  color:
                    products?.total === products?.data?.length && "#FD7E14",
                }}
                disabled={
                  products?.total === products?.data?.length ||
                  products?.totalPage === 1
                }
                onClick={() => setLimit((prev) => prev + 6)}
              />
            </div>
          </WrapperProduct>
          {/* tat ca san pham giam gia mobile*/}
          <WrapperProductMobile>
            <div
              style={{
                fontSize: "30px",
                fontWeight: "500",
                lineHeight: "50px",
                marginLeft: "8px",
                marginTop: "8px",
                borderBottom: "1px solid #ff761c",
                padding: "10px 0",
              }}
            >
              Sản phẩm bán chạy
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <WrapperCard
                gutter={{
                  xs: 12,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                {products?.data?.map((product) => {
                  return (
                    product?.selled >= 10 && (
                      <Col className="gutter-row" xs={12}>
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
                    )
                  );
                })}
              </WrapperCard>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "15px",
              }}
            >
              <ButtonMore
                textbutton={isPreviousData ? "Load more" : "Xem Thêm"}
                type="outline"
                style={{
                  display: "block",
                  width: "180px",
                  height: "38px",
                  fontSize: "17px",
                  margin: "25px auto",
                  borderRadius: "4px",
                  border: "1px solid #FD7E14",
                  boxShadow: " 1px 1px 11px rgba(0, 0, 0, 0.18)",
                  borderRadius: "25px",
                  cursor: "pointer",
                  backgroundColor: "rgba(255, 255, 255)",
                  color: `${
                    products?.total === products?.data?.length ? "#fff" : "#000"
                  }`,
                }}
                styleTextButton={{
                  fontWeight: 500,
                  color:
                    products?.total === products?.data?.length && "#FD7E14",
                }}
                disabled={
                  products?.total === products?.data?.length ||
                  products?.totalPage === 1
                }
                onClick={() => setLimit((prev) => prev + 6)}
              />
            </div>
          </WrapperProductMobile>
          {/* map */}
          <WrapperProduct>
            <div
              style={{
                fontSize: "30px",
                fontWeight: "500",
                lineHeight: "50px",
                marginLeft: "8px",
                marginTop: "8px",
                borderBottom: "1px solid #ff761c",
                padding: "10px 0",
              }}
            >
              Địa Chỉ Cửa Hàng
            </div>
            <div style={{ textAlign: "center" }}>
              <iframe
                style={{ borderRadius: "20px", marginTop: "20px" }}
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d23651.30408792001!2d106.62409558413344!3d10.868459536359174!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1690950899112!5m2!1svi!2s"
                allowfullscreen=""
                loading="lazy"
                width="800"
                height="450"
              ></iframe>
            </div>
          </WrapperProduct>
        </Container>
        {/* footer */}
        <Footer />
      </div>
    </Loading>
  );
};

export default HomePage;
