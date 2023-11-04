import { axiosJWT } from "./UserService"
export const CreateOrder = async (data, access_token) => {
    console.log('access_token, data', access_token, data)
    const res = await axiosJWT.post(`http://localhost:3000/api/order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getOrderByUserId = async (id,access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-order-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }