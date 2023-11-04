import { useQuery } from '@tanstack/react-query'
import React from 'react'
import * as OrderService from "../../service/OrderService";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from 'react-redux';

const MyOrderPage = () => {
  const user = useSelector((state)=> state.user)
  const fetchMyOrder = OrderService.getOrderByUserId(user?.id, user?.access_token)
  const queryOrder = useQuery({
    queryKey: ["users"],
    queryFn: fetchMyOrder,
  });
  const { isLoading, data} = queryOrder;
  console.log('data', data);
  return (
    <Loading isLoading={isLoading}><div>MyOrderPage</div></Loading>
  )
}

export default MyOrderPage