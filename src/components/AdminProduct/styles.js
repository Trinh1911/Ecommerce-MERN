import { Upload } from "antd";
import styles from "styled-components";

export const WrapperHeader = styles.h1`
    color: #000;
    font-size: 14px;
`

export const WrapperUploadFile = styles(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
    & .ant-upload-list-item {
        display: none;
    }
`