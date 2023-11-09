import styles from "styled-components";
export const WrapperLeft = styles.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 40px 45px 24px;
    background: rgb(255, 255, 255);
    border-radius: 20px;
    
`
export const WrapperRight = styles.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 100%;
    background: linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%);
    
    .content {
        margin: 30px 0px 0px;
        text-align: center;
    }
    .content h4 {
        margin: 0px 0px 5px;
        color: rgb(11, 116, 229);
        font-size: 17px;
        font-weight: 500;
    }
    .content span {
        font-size: 13px;
        color: rgb(11, 116, 229);
        font-weight: 500;
    }
`