import React from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";

const TypeProductPage = () => {
  const onChange = () => {};
  return (
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
              <Col className="gutter-row" span={2 / 4}>
                <div>
                  <CardComponent />
                </div>
              </Col>
              <Col className="gutter-row" span={2 / 4}>
                <div>
                  <CardComponent />
                </div>
              </Col>
              <Col className="gutter-row" span={2 / 4}>
                <div>
                  <CardComponent />
                </div>
              </Col>
              <Col className="gutter-row" span={2 / 4}>
                <div>
                  <CardComponent />
                </div>
              </Col>
              <Col className="gutter-row" span={2 / 4}>
                <div>
                  <CardComponent />
                </div>
              </Col>
              <Col className="gutter-row" span={2 / 4}>
                <div>
                  <CardComponent />
                </div>
              </Col>
              <Col className="gutter-row" span={2 / 4}>
                <div>
                  <CardComponent />
                </div>
              </Col>
              <Col span={20}>
                <Pagination
                  defaultCurrent={2}
                  total={100}
                  onChange={onChange}
                  style={{ textAlign: "center", marginTop: "10px" }}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TypeProductPage;
