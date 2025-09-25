import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.cartItems.find((item) =>
        item.id === action.payload.id
      )
      if (existing) {
        existing.quantity = existing.quantity + 1
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      )
    },
    clearCart: (state) => {
      state.cartItems = []
    },

    increaseQuantity: (state, action) => {
  const item = state.cartItems.find(i => i.id === action.payload);
  if (item) item.quantity += 1;
},
decreaseQuantity: (state, action) => {
  const item = state.cartItems.find(i => i.id === action.payload);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
  }
},

  },
})

export const { addToCart, removeFromCart, clearCart,increaseQuantity,decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer
