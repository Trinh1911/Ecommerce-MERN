import React from "react";
import ProductDetailComponents from "../../components/ProductDetailComponents/ProductDetailComponents.jsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: "0 120px",
        backgroundColor: "#efefef",
        height: "1000px",
      }}
    >
      <div>
        <span
        style={{cursor: "pointer", fontWeight: "bold"}}
          onClick={() => {
            navigate("/");
          }}
        >
          Trang chủ
        </span>
        - chi tiết sản phẩm
      </div>
      <ProductDetailComponents idProduct={id} />
    </div>
  );
};

export default ProductDetailPage;