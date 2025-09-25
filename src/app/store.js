import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/slice/cartSlice'
import authReducer from "../features/slice/authslice";
import apiReducer from '../features/slice/apislice'
import checkoutReducer from "../features/slice/checkoutSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth : authReducer,
    api :apiReducer,
    checkout: checkoutReducer, 
  },
})
