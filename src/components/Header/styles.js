import { Row } from "antd";
import styles from "styled-components";
export const Wrapper = styles(Row)`
    display: flex;
    max-width: 1440px;
    height: 90px;
    margin: 0 auto;
`
export const LogoHeader = styles(Row)`
    @media (max-width:1023px) {
        display: none;
    }
    display: flex;
    font-size: 25px;
    color: rgba(0,0,0,.88);
    font-weight: bold;
    text-align: left;
`
export const TextHeader = styles(Row)`
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: rgba(0,0,0,.88);
`
export const MenuItems = styles(Row)`
    @media (max-width:1023px) {
        display: none;
    }
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
`
export const MenuItemsCart = styles(Row)`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
`
export const MenuItemsMobile = styles(Row)`
    @media (max-width:1023px) {
        display:flex;
    }
    display: none;
    position: relative;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
`
export const ContentPopover = styles(Row)`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`