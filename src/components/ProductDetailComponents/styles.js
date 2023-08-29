import styles from "styled-components";
import { InputNumber } from "antd";
export const NameProduct = styles.h1`
    margin: 0px 0px 4px;
    color: rgb(36, 36, 36);
    font-size: 24px;
    font-weight: 300;
    line-height: 32px;
    word-break: break-word;
`
export const SaleProduct = styles.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`
export const Price = styles.div`
    display: flex;
    border-radius: 4px;
    background-color: rgb(250, 250, 250);
    padding: 0px 16px 12px;
`
export const CurrentPrice = styles.div`
    font-size: 32px;
    color: rgb(255, 66, 78);
    line-height: 40px;
    margin-right: 8px;
    padding: 10px;
    font-weight: 500;
`
export const ExportGoods = styles.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl
    };
    span.change-address {
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
`
export const Quanlity = styles.div`
    
`
export const WrapperInputNumber = styles(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-width: 1px 0;
        border-radius: 0;
        color: #e2e2e2;
        text-align: center;
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    };
`