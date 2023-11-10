import React from 'react'
import { Wrapper } from "./styles";
import { useNavigate } from 'react-router-dom';

const TypeProduct = ({name}) => {
  const navigate = useNavigate()
  const handleNavigateType = (type) => {
    navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: type})
  }
  return (
    <div style={{fontSize: '15px', padding: '0 10px', fontWeight: '500'}} onClick={()=> handleNavigateType(name)}>{name}</div>
  )
}

export default TypeProduct