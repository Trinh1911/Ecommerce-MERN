import axios from "axios"

export const UserLogin = async(data) => {
    const res = await axios.post(`http://localhost:3001/api/user/sign-in`, data)
    return res.data
}
export const UserSign = async(data) => {
    const res = await axios.post(`http://localhost:3001/api/user/sign-up`, data)
    return res.data
}