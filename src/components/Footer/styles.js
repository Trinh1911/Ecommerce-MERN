import styles from "styled-components";
import { Row } from "antd";
export const ContainerFooter = styles.div`
    background: rgb(247, 247, 247);
    padding: 20px 120px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 30px;
    border-top: 1px solid rgb(255, 118, 28);
    margin-top: 20px;
    @media (max-width:1023px) {
        padding: 20px;
    }
`
export const WrapperFooter = styles(Row)`
    margin-top: 30px;
    @media (max-width:1023px) {
        padding: 20px;
    }
`
export const FooterList = styles.ul`
    font-size: 22px;
    padding: 10px 0;
    color: #130f40;
    font-weight: bold;
`
export const FooterItem = styles.li`
    display: block;
    font-size: 14px;
    padding: 10px 0;
    color: #004146;
`

