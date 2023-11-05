import React,{ useEffect, useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading';
import * as OrderService from "../../service/OrderService";
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { convertPrice } from '../../untils';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus } from './styles';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation, useParams } from 'react-router-dom';

const MyOrderPage = () => {
  const user = useSelector((state) => state.user)
  const location = useLocation()
  console.log('location', location)
  const fetchMyOrder = async () => {
      const res = await OrderService.getOrderByUserId(user?.id, user?.access_token)
      return res.data
    }

  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: fetchMyOrder }, {
    // nếu có id và access_token của người dùng thì mới được phép gọi tới fetchMyOrder
    enabled: user?.id && user?.access_token
  })
  const { isLoading, data } = queryOrder
  console.log('data', data)
  return (
    <Loading isLoading={isLoading}>
      <WrapperContainer>
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <h4>Đơn hàng của tôi</h4>
          <WrapperListOrder>
            {data?.orderItems?.map((order) => {

              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{fontSize: '14px', fontWeight: 'bold'}}>Trạng thái</span>
                    <div><span style={{color: 'rgb(255, 66, 78)'}}>Giao hàng: </span>{`${order.isDelivered ? 'Đã giao hàng': 'Chưa giao hàng'}`}</div>
                    <div><span style={{color: 'rgb(255, 66, 78)'}}>Thanh toán:</span>{`${order.isPaid ? 'Đã thanh toán': 'Chưa thanh toán'}`}</div>
                  </WrapperStatus>
                  <WrapperHeaderItem> 
                    <img src={order?.image} 
                      style={{
                        width: '70px', 
                        height: '70px', 
                        objectFit: 'cover',
                        border: '1px solid rgb(238, 238, 238)',
                        padding: '2px'
                      }}
                    />
                    <div style={{
                      width: 260,
                      overflow: 'hidden',
                      textOverflow:'ellipsis',
                      whiteSpace:'nowrap',
                      marginLeft: '10px'
                    }}>{order?.name}</div>
                    <span style={{ fontSize: '13px', color: '#242424',marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
                  </WrapperHeaderItem>
                  <WrapperFooterItem>
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Tổng tiền: </span>
                      <span 
                        style={{ fontSize: '13px', color: 'rgb(56, 56, 61)',fontWeight: 700 }}
                      >{convertPrice(data?.totalPrice)}</span>
                    </div>
                    <div style={{display: 'flex', gap: '10px'}}>
                    <ButtonComponent
                        // onClick={() => handleAddCard()}
                        size={40}
                        style={{
                            height: '36px',
                            border: '1px solid rgb(11, 116, 229)',
                            borderRadius: '4px'
                        }}
                        textButton={'Hủy đơn hàng'}
                        styleTextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                      >
                      </ButtonComponent>
                      <ButtonComponent
                        // onClick={() => handleAddCard()}
                        size={40}
                        style={{
                            height: '36px',
                            border: '1px solid rgb(11, 116, 229)',
                            borderRadius: '4px'
                        }}
                        textButton={'Xem chi tiết'}
                        styleTextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                      >
                      </ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              )
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  )
}

export default MyOrderPage