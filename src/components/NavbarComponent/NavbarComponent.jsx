import { Checkbox, Rate } from "antd";
import { Content, LableText, TextPrice, TextValue } from "./styles";
import React from "react";

const NavbarComponent = () => {
  const onChange = () => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <TextValue>{option}</TextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option) => {
              return (
                <Checkbox style={{ marginLeft: 0 }} value={option.value}>
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option) => {
          return (
            <div style={{ dispaly: "flex" }}>
              <Rate
                style={{ fontSize: "12px" }}
                disabled
                defaultValue={option}
              />
              <span> {`tu ${option}  sao`}</span>
            </div>
          );
        });
      case "price":
        return options.map((option) => {
          return <TextPrice>{option}</TextPrice>;
        });
      default:
        return {};
    }
  };
  return (
    <div>
      <LableText>label</LableText>
      <Content>{renderContent("text", ["TV", "Laptop", "Mobile"])}</Content>
      <Content>
        {renderContent("checkbox", [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ])}
      </Content>
      <Content>{renderContent("star", [1, 2, 3, 4, 5])}</Content>
      <Content>
        {renderContent("price", ["duoi 40.000", "tren 50.000"])}
      </Content>
    </div>
  );
};

export default NavbarComponent;
