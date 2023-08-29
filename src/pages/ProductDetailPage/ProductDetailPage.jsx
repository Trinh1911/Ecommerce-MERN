import React from "react";
import ProductDetailComponents from "../../components/ProductDetailComponents/ProductDetailComponents.jsx";
const ProductDetailPage = () => {
  return (
    <div
      style={{
        padding: "0 120px",
        backgroundColor: "#efefef",
        height: "1000px",
      }}
    >
      <div>Trang chu</div>
      <ProductDetailComponents />
    </div>
  );
};

export default ProductDetailPage;
