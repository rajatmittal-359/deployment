import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCheckout: false,
  checkoutData: {
    name: "",
    address: "",
    phone: "",
    payment: "cod",
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    toggleCheckout: (state) => {
      state.showCheckout = !state.showCheckout;
    },
    updateCheckoutField: (state, action) => {
      const { name, value } = action.payload;
      state.checkoutData[name] = value;
    },
    resetCheckout: (state) => {
      state.checkoutData = initialState.checkoutData;
      state.showCheckout = false;
    },
  },
});

export const { toggleCheckout, updateCheckoutField, resetCheckout } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
