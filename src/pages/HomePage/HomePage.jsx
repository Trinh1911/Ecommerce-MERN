import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { Wrapper } from "./styles";

const HomePage = () => {
  const arr = ["Laptop", "TV", "Mobile"];
  return (
    <div style={{ padding: " 0 120px" }}>
      <Wrapper>
        {arr.map((item) => {
          return <TypeProduct key={arr} name={arr} />;
        })}
      </Wrapper>
      HomePage
    </div>
  );
};

export default HomePage;
