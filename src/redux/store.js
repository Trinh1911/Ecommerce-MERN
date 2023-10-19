import { configureStore } from '@reduxjs/toolkit'
import productReducer from "./slides/ProductSlice"
import userReducer from "./slides/userSlide"
import orderReducer from "./slides/OrderSlice"
export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        order: orderReducer,
    },
})