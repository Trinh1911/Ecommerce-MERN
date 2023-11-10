import { axiosJWT } from "./UserService"
export const CreateOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`http://localhost:3000/api/order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getOrderByUserId = async (id,access_token) => {
    const res = await axiosJWT.get(`http://localhost:3000/api/order/get-all-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }
  export const getDetailsOrder = async (id,access_token) => {
    const res = await axiosJWT.get(`http://localhost:3000/api/order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }
//   sao lại hoán đổi vị trí ?
  export const cancelOrder = async (id,access_token, orderItems) => {
    const res = await axiosJWT.delete(`http://localhost:3000/api/order/cancel-order/${id}`,{data: orderItems}, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }
  export const getAllOrder = async (access_token) => {
    const res = await axiosJWT.get(`http://localhost:3000/api/order/get-all-order`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}