import { Modal } from "antd";
import styles from "styled-components";
export const WrapperModal = styles(Modal)`
.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
    color: #FD7E14;
    border-color: #f6a35e;
}
.ant-btn-primary:not(:disabled):not(.ant-btn-disabled):hover {
    color: #fff;
    background: linear-gradient(90deg, #ffba00 0%, #ff6c00 100%);
    opacity: 0.8;
}
.ant-btn-primary:not(:disabled):not(.ant-btn-disabled) {
    color: #fff;
    background: linear-gradient(90deg, #ffba00 0%, #ff6c00 100%);
}
`