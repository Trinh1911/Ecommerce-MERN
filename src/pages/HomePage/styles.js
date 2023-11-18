import Header from "../../components/Header/Header";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import styles from "styled-components";
import { Row } from "antd";
export const WrapperCard = styles(Row)`
    &.ant-row {
        padding: 0px 21px; 
    }
    @media (max-width:1023px) {
        width: 100%;
        padding: 10px;
    }
`
export const WrapperTypeProduct = styles.div`
@media (max-width:1023px) {
    padding: 10px;
}
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 12px;
    height: 32px;
    padding: 19px 100px 5px 90px;
`
export const WrapperInfo = styles.div`
    margin: 0 63px 10px 30px;
    &:nth-child(1) {
        margin-top: 33px;
    }
    &:nth-child(4) {
        margin-bottom: 32px;
    }
`
export const InputInfo = styles.input`
    width: 400px;
    border-radius: 64px;
    height: 50px;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    font-style: italic;
    padding-left: 27px;
    border: rgba(255, 255, 255, 1);
    outline: none;
`
export const ButtonMore = styles(ButtonComponent)`
    &:hover {
        background-color: #FD7E14 !important;
        span {
            color: #fff;
            font-weight: 600;
        }
    }
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
    span {
        font-weight: 500;
    }
`
export const WrapperProduct = styles.div`
@media (max-width:1023px) {
    display: none;
}
    display: block;
    margin-top: 20px;
`
export const WrapperProductMobile = styles.div`
@media (max-width:1023px) {
    display: block;
}
    display: none;
    margin-top: 20px;
`
export const Container = styles.div`
@media (max-width:1023px) {
    width: 100%;
}
    width: 1270px;
    margin: 0 auto;
`
export const WrapType = styles.div`
@media (max-width:1023px) {
    padding: 0 8px;
    margin-top: 10px;
}
    padding: 0 120px;
    margin-bottom: 10px;
`