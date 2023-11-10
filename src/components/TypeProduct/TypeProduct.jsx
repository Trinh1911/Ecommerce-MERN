import React from 'react'
import { Categories } from "./styles";
import { useNavigate } from 'react-router-dom';

const TypeProduct = ({name}) => {
  const navigate = useNavigate()
  const handleNavigateType = (type) => {
    navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: type})
  }
  return (
    <Categories onClick={()=> handleNavigateType(name)}>{name}</Categories>
  )
}

export default TypeProduct