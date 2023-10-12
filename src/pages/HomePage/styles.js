import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import styles from "styled-components";
export const WrapperTypeProduct = styles.div`
    display: flex;
    align-items: center;
    gap: 12px;
    height: 32px;
`
export const ButtonMore = styles(ButtonComponent)`
    &:hover {
        background-color: rgb(13, 92, 182);
        span {
            color: #fff;
        }
    }
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
    span {
        font-weight: 500;
    }
`
