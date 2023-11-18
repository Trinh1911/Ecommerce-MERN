import { Upload } from "antd";
import styles from "styled-components";
export const Wrapper = styles.div`
    margin: 0px auto;
    width: 1270px;
    @media (max-width:1023px) {
        width: 100%;
    }
`
export const Heading = styles.div`
    font-size: 30px;
    font-weight: 500;
    line-height: 50px;
    margin-left: 8px;
    margin-top: 8px;
    padding: 10px 0px;
    @media (max-width:1023px) {
        font-size: 24px;
    }
`