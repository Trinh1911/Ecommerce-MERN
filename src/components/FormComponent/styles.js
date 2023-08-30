import styles from "styled-components";
import { Input } from "antd";
export const InputWrap = styles(Input)`
    position: relative;
    width: 100%;
    padding: 10px 0px;
    border: none;
    font-size: 14px;
    color: rgb(36, 36, 36);
    outline: none;
    border-bottom: 1px solid rgb(224, 224, 224);
    &:focus {
        border-color: rgb(224, 224, 224) !important;
        box-shadow: none !important;
        border-inline-end-width: 0 !important;
    }
    &:hover {
        border-color: rgb(224, 224, 224) !important;
    }
`