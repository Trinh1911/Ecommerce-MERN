import { Radio } from "antd";

import styles from "styled-components";

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
export const WrapperLeft = styles.div`
  width: 910px;
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

export const WrapperCountOrder = styles.div`
  display: flex;

  align-items: center;

  width: 84px;

  border: 1px solid #ccc;

  border-radius: 4px;

`




export const WrapperRight = styles.div`

  width: 320px;

  margin-left: 20px;

  display: flex ;

  flex-direction: column; 

  gap: 10px; 

  align-items: center

`




export const WrapperInfo = styles.div`

  padding: 17px 20px;

  border-bottom: 1px solid #f5f5f5;

  background: #fff;

  border-top-right-radius: 6px;

  border-top-left-radius: 6px;

`




export const WrapperTotal = styles.div`

  display: flex;

   align-items: flex-start; 

   justify-content: space-between;

    padding: 17px 20px;

    background: #fff ;

    border-bottom-right-radius: 6px;

    border-bottom-left-radius: 6px;

`




export const Lable = styles.span`

  font-size: 12px;

  color: #000;

  font-weight: bold

`




export const WrapperRadio = styles(Radio.Group)`

  margin-top: 6px;

  background: rgb(240, 248, 255);

  border: 1px solid rgb(194, 225, 255);

  width: 500px;

  border-radius: 4px;

  height: 100px;

  padding: 16px;

  font-weight: normal;

  display:flex;

  flex-direction: column;

  gap: 10px;

  justify-content: center;

`