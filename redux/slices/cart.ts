import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { OrderItemType } from "../../utils/api/types";
import { calcTotalPrice } from "../../utils/helpers/calcTotalPrice";

export interface CartState {
  totalPrice: number;
  items: OrderItemType[];
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<OrderItemType>) {
      // const findItem = state.items.find((obj) => obj.id === action.payload.id);

      state.items.push(action.payload);

      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const { addItem } = cartSlice.actions;

export const selectCartData = (state: RootState) => state.cart;
export const cartReducer = cartSlice.reducer;
