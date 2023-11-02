import { Modal } from "antd";
import React from "react";
import { WrapperModal } from "./styles";

const ModalComponent = ({
  title = "Modal",
  isOpen = false,
  children,
  ...rests
}) => {
  return (
    <WrapperModal title={title} open={isOpen} {...rests}>
      {children}
    </WrapperModal>
  );
};

export default ModalComponent;
