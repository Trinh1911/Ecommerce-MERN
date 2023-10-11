import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllProduct = async (search) => {
    let res = {}
    if (search.length > 0) {
        res = await axios.get(`http://localhost:3000/api/product/all-product?filter=name&filter=${search}`)
    } else {
        res = await axios.get(`http://localhost:3000/api/product/all-product`)
    }
    return res.data
}
export const createProduct = async (data) => {
    const res = await axios.post(`http://localhost:3000/api/product/create`, data)
    return res.data
}
export const getDetailsProduct = async (id) => {
    const res = await axiosJWT.get(`http://localhost:3000/api/product/get-details/${id}`)
    return res.data
}
export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`http://localhost:3000/api/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const deletedProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`http://localhost:3000/api/product/delete-product/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const deleteManyProduct = async (data, access_token,) => {
    const res = await axiosJWT.post(`http://localhost:3000/api/product/delete-product-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}