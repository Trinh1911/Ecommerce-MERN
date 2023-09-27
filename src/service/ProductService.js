import axios from "axios"

export const getAllProduct = async () => {
    const res = await axios.get(`http://localhost:3000/api/product/all-product`)
    return res.data
}