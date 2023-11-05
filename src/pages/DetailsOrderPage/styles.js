import styles from "styled-components"
export const WrapperHeaderUser = styles.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const WrapperInfoUser = styles.div`
  .name-info {
    font-size: 13px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    text-transform: uppercase;
  }
  .address,.phone-info,.delivery-info,.delivery-fee,.payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 13px;
    margin-top: 8px;
  }
  .name-delivery {}
    color: rgb(234, 133, 0); 
    font-weight: bold;
    text-transform: uppercase;
  }
  .status-payment {
    margin-top: 8px;
    color: rgb(234, 133, 0); 
  }
`
export const WrapperLabel = styles.div`
  color: rgb(36, 36, 36);
  font-size: 13px;
  text-transform: uppercase;
  margin-bottom: 15px;
`

export const WrapperContentInfo = styles.div`
  height: 118px;
  width: 320px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
`

export const WrapperStyleContent = styles.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`
export const WrapperProduct = styles.div`
  display:flex;
  align-items:flex-start;
  margin-top: 10px;
`
export const WrapperNameProduct = styles.div`
  display:flex;
  align-items: flex-start;
  width: 670px;
`
export const WrapperItem = styles.div`
  width: 200px;
  font-weight: bold;
  &:last-child {
    color: red;
  }

`

export const WrapperItemLabel = styles.div`
  width: 200px;
  &:last-child {
    font-weight: bold;
  }
`




export const WrapperAllPrice = styles.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`