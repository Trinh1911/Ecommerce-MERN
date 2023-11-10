import styles from "styled-components";
export const Categories = styles.div`
    font-size: 15px;
    padding: 10px;
    font-weight: 500;
    cursor: pointer;
    background: rgb(255, 118, 28);
    border-radius: 16px;
    color: rgb(255, 255, 255);
    transition: all .3s;
    position: relative;
    
    &:hover {
        background: transparent;
        color:rgb(255, 118, 28);
        border: 1px solid rgb(255, 118, 28);
    }
`
