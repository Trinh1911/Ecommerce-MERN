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
        height: "1000px",
      }}
    >
      <div style={{marginTop: '22px', marginLeft: "54px", fontSize: '16px'}}>
        <span
        style={{cursor: "pointer", fontWeight: "bold", color: "#FD7E14", marginRight: "5px"}}
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