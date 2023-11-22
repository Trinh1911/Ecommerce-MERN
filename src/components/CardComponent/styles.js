import { Card, Image } from "antd";
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
    @media (max-width:1023px) {
        width: 145px;
        font-size: 14px;
    }
`
export const CardProduct = styles(Card)`
    width: 220px;
    position: relative;
    margin-top: 15px;
    background-color:${props => props.disabled ? "#ccc": "#fff"};
    cursor:${props => props.disabled ? "not-allowed": "pointer"};
    & .ant-card-body {
        padding: 10px;
    }
    @media (max-width:1023px) {
        width: 100%;
        & .ant-card-cover >* {
            width: 160px;
        }
        & .ant-card-body {
            padding: 10px 3px;
        }
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
    display: flex;
    align-items: flex-end;
    color: rgb(255, 66, 78);
    font-size: 14px;
    font-weight: 500;
    @media (max-width:1023px) {
        font-size: 14px;
    }
    & p {
        margin: 0;
        margin-right: 8px;
        width: fit-content;
        font-size: 13px;
        text-decoration: line-through;
        color: #4E4E4E;
    }
`

export const DiscountText = styles.span`
    color: rgb(255, 66, 78);
    font-size: 12px;
    font-weight: 500;
    @media (max-width:1023px) {
        font-size: 9px;
    }
`

export const StyleTextSell = styles.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120)
`