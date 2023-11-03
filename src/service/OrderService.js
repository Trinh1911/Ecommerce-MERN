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