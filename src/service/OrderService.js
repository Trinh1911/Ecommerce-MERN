import { axiosJWT } from "./UserService"
// export const CreateOrder = async (access_token, data) => {
//     const res = await axiosJWT.put(`http://localhost:3000/api/order/create-order`, data, {
//         headers: {
//             token: `Bearer ${access_token}`,
//         }
//     })
//     return res.data
// }
export const CreateOrder = async (data) => {
    const res = await axiosJWT.put(`http://localhost:3000/api/order/create-order`, data
    )
    return res.data
}
