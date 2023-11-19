import { Checkbox } from "antd";
import styles  from "styled-components";
export const WrapperOrder = styles.div`
  @media (max-width:1023px) {
    width: 100%;
  }
  height: 100%;
    width: 1270px;
    margin: 0px auto;
`
export const Container = styles.div`
  @media (max-width:1023px) {
    flex-direction: column;
    margin-left: 20px;
  }
  display: flex;
  justify-content: center;
`
export const WrapperStyleHeader = styles.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`
export const WrapperStyleHeaderDilivery = styles.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  };
  margin-bottom: 4px;
`

export const WrapperLeft = styles.div`
  width: 910px;
  @media (max-width:1023px) {
    width: 100%;
  }
`

export const WrapperListOrder = styles.div`

`

export const WrapperItemOrder = styles.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
`

export const WrapperPriceDiscount = styles.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`
export const WrapperCountOrder  = styles.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const WrapperRight = styles.div`
  width: 372px;
  margin-left: 20px;
  display: flex ;
  flex-direction: column; 
  gap: 10px; 
  align-items: center
`

export const WrapperInfo = styles.div`
 @media (max-width:1023px) {
  display: none;
}
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%
`
export const WrapperInfoMobile = styles.div`
@media (max-width:1023px) {
  display: block;
  width: fit-content;
  padding: 18px 0;
  padding-left: 16px;
}
  display: none;
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%
`
export const WrapperTotal = styles.div`
  display: flex;
   align-items: flex-start; 
   justify-content: space-between;
   width: 100%;
  padding: 17px 20px;
  background: #fff ;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  @media (max-width:1023px) {
    align-items: center;
  }
    
`

export const CustomCheckbox = styles(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #9255FD;
    border-color: #9255FD;
  }
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #9255FD;
  }
`
export const OrderLaptop = styles.div`
  @media (max-width:1023px) {
    display: none;
  }
`
export const OrderMobile = styles.div`
  display: none;
  @media (max-width:1023px) {
    display: block;
  }
`
export const WrapProduct = styles.div`
  @media (max-width:1023px) {
    display: flex;
    justify-content: space-between;
    margin-left: 18px;
    margin-top: 20px;
}
`
export const Quanlity = styles.div`
  @media (max-width:1023px) {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    padding-left: 10px;
  }
`