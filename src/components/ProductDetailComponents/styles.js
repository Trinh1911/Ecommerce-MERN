import styles from "styled-components";
import { InputNumber } from "antd";
export const NameProduct = styles.h1`
    margin: 0px 0px 10px;
    padding-left: 10px;
    color: rgb(0, 65, 70);
    word-break: break-word;
    font-weight: 600;
    font-size: 38px;
    line-height: 56px;
}
`
export const SaleProduct = styles.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`
export const Price = styles.div`
    display: flex;
    border-radius: 4px;
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
    display: flex;
    align-items: center;
    margin-left: 16px;
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
export const Title = styles.div`
    width: 292px;
    height: 56px;
    line-height: 56px;
    margin-right: 19px;
    font-size: 16px;
    text-align: center;
    &:after {
        content: "";
        display: block;
        width: 0;
        height: 2px;
        background: rgb(255, 118, 28);
        transition: width .3s;
    }
    &:hover::after {
        width: 100%;
    }
`
export const WrapContent = styles.div`
        width: 1200px;
        margin: 20px auto;
        margin-bottom: 40px;
        padding: 10px;
        height: 300px;
        border-radius: 20px;
        font-size: 16px;
        white-space: pre-line;
        text-align: justify;
        border: 1px solid #eae7e7;
`
export const TableContent = styles.table`
        width: 1200px;
        margin: 20px auto;
        margin-bottom: 40px;
        padding: 10px;
        height: 300px;
        border-radius: 20px;
        font-size: 16px;
        white-space: pre-line;
        text-align: justify;
        border: 1px solid #eae7e7;
`
export const ContentDescription = styles.p`
        margin: 2rem 10px;
`
export const AttributeItem = styles.th`
    width: 40%;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    padding-left: 20px;
    text-align: center;
`
export const AttributeValue = styles.th`
    width: 60%;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    padding-left: 20px;
    text-align: center;
`