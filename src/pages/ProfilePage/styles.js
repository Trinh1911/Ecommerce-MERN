import { Upload } from "antd";
import styles from "styled-components";
export const Title = styles.div`
    color: #000;
    font-size: 18px;
    margin: 4px 0;
`
export const Container = styles.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 600px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 30px;
`
export const WrapperLabel = styles.label`
    color: #000;
    font-size: 12px;
    line-height: 30px;
    font-weight: 600;
    width: 60px;
    text-align: left;
`

export const WrapperInput = styles.div`
    display: flex;
    align-items: baseline;
    gap: 20px;
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
`