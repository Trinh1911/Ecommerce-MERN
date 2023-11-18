import styles from "styled-components";
import { Image, InputNumber, Rate, Row } from "antd";
export const WrapName = styles.div`
    width: 600px;
    padding: 16px 28px 16px 0px;
    @media (max-width:1023px) {
        width: fit-content;
        padding: 0;
    }
`
export const InfoPrice = styles.div`
    display: flex;
    @media (max-width:1023px) {
        align-items: center;
        justify-content: space-between;
    }
`
export const WrapRating = styles.div`
    margin: 14px 10px;
    @media (max-width:1023px) {
        margin: 0;
    }
`
export const NameProduct = styles.h1`
    margin: 0px 0px 10px;
    padding-left: 10px;
    color: rgb(0, 65, 70);
    word-break: break-word;
    font-weight: 600;
    font-size: 38px;
    line-height: 56px;
    @media (max-width:1023px) {
        font-size: 30px;
        font-weight: 500;
    }
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
    @media (max-width:1023px) {
        font-size: 20px;
        padding: 0;
        padding-left: 10px;
    }
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
    @media (max-width:1023px) {
        margin-left: 10px;
    }
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
    }
`
export const WrapperRate = styles(Rate)`
    &.ant-rate {
        font-size: 16px;
    }
`
export const Info = styles.div`
    padding-left: 16px;
    width: 516px;
    font-size: 16px;
    white-space: pre-line;
    text-align: justify;
    @media (max-width:1023px) {
        height: 336px;
        width: 307px;
        margin-top: 15px;
        font-weight: 400;
        font-size: 13px;
        line-height: 26px;
    }
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
        @media (max-width:1023px) {
            height: 420px;
            width: 307px;
        }
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
        @media (max-width:1023px) {
            width: 350px;
        }
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
    @media (max-width:1023px) {
        font-size: 14px;
        padding-left: 5px;
    }
`
export const AttributeValue = styles.th`
    width: 60%;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    padding-left: 20px;
    text-align: center;
    @media (max-width:1023px) {
        font-size: 13px;
        font-weight: 400;
        padding-left: 10px;
    }
`
export const WrapperImage = styles.div`
        @media (max-width:1023px) {
            width: 350px;
        }
        width: 444px;
`
export const Spectification = styles.div`
    width: 1300px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    border-radius: 20px;
    box-shadow: rgb(211, 211, 211) 0px 0px 5pt 0.5pt;
    @media (max-width:1023px) {
        width: 350px;
        height: 46px;
        margin: 0 auto;
    }
`