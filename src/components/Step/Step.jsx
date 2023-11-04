import { Steps } from "antd";
import React from "react";

const Step = ({ current = 0, items = [] }) => {
  return (
    <Steps current={current}>
      {items.map((item) => {
        return (
          <Steps
            key={item.title}
            title={item.title}
            description={item.description}
          />
        );
      })}
    </Steps>
  );
};

export default Step;
