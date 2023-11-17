import styles from "styled-components";
import { Input } from "antd";
export const WrapperInput = styles(Input)`
    @media (max-width:1023px) {
        padding: 10px 12px;
    }
    padding: 9px 86px 10px 29px;
    border-radius: 43px;
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #fff;
    box-shadow: 0 0 5pt 0.5pt #D3D3D3;
`