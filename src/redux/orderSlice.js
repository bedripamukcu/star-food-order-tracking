import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderNumbers: [],
  },
  reducers: {
    updateOrderNumbers(state, action) {
      state.orderNumbers = action.payload;
    },
  },
});

export const { updateOrderNumbers } = orderSlice.actions;
export default orderSlice;
