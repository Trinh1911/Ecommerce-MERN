import { Card } from "antd";
import styles from "styled-components";
export const NameProduct = styles.div`
    height: 24px;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    margin: 17px 0;
    color: rgb(56, 56, 61);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
`
export const CardProduct = styles(Card)`
    width: 200px;
    position: relative;
    margin-top: 15px;
    & .ant-card-body {
        padding: 10px;
    }
`
export const SaleText = styles.div`
    font-size: 13px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0px;
`
export const PriceText = styles.div`
    color: rgb(255, 66, 78);
    font-size: 16px;
    font-weight: 500;
`

export const DiscountText = styles.span`
    color: rgb(255, 66, 78);
    font-size: 12px;
    font-weight: 500;
`

export const StyleTextSell = styles.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120)
`