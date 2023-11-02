import styles from "styled-components";
import { Button } from "antd";
export const WrapButton = styles(Button)`
    .ant-btn-primary:not(:disabled):not(.ant-btn-disabled):hover {
        background-color: #ffffff;
        border-color: #d9d9d9;
    }
    .ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
        color: #4096ff;
        border-color: #FD7E14;
    }
`