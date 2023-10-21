import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productReducer from "./slides/ProductSlice"
import userReducer from "./slides/userSlide"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import orderReducer from "./slides/OrderSlice"
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['product', 'user']
}
const rootReducer = combineReducers({
    product: productReducer,
    user: userReducer,
    order: orderReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export let persistor = persistStore(store)