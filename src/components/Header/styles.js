import { Row } from "antd";
import styles from "styled-components";
export const Wrapper = styles(Row)`
    display: flex;
    max-width: 1440px;
    height: 90px;
    margin: 0 auto;
`
export const LogoHeader = styles(Row)`
    font-size: 25px;
    color: #fff;
    font-weight: bold;
    text-align: left;
`
export const TextHeader = styles(Row)`
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #fff;
`
export const MenuItems = styles(Row)`
    position: relative;
    display: flex;
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