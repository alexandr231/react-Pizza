import { calcTotalCount } from './../../../utils/calcTotalCount';
import { calcTotalPrice } from './../../../utils/calcTotalPrice';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLs } from "../../../utils/getCartFromLS";
import { CartItem, CartSliceState } from "./types";

const {items, totalPrice, totalCount} = getCartFromLs();

const initialState: CartSliceState = {
  items,
  totalPrice,
  totalCount
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizzaToCart(state, action: PayloadAction<CartItem>) {
      let pizzaInCart = state.items.find(
        (pizza) =>
          pizza.id === action.payload.id &&
          pizza.size === action.payload.size &&
          pizza.type === action.payload.type,
      );
      if (pizzaInCart) {
        pizzaInCart.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);

      state.totalCount = calcTotalCount(state.items);
    },
    removePizzaFromCart(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter(
        (pizza) =>
          pizza.id !== action.payload.id ||
          pizza.size !== action.payload.size ||
          pizza.type !== action.payload.type,
      );

      state.totalPrice = calcTotalPrice(state.items);

      state.totalCount = calcTotalCount(state.items);
    },
    minusPizza(state, action: PayloadAction<CartItem>) {
      let pizzaInCart = state.items.find(
        (pizza) =>
          pizza.id === action.payload.id &&
          pizza.size === action.payload.size &&
          pizza.type === action.payload.type,
      );
      if (pizzaInCart) {
        pizzaInCart.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);

      state.totalCount = calcTotalCount(state.items);
    },
    clearPizzasInCart(state) {
      state.items = [];

      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPizzaToCart, removePizzaFromCart, minusPizza, clearPizzasInCart } =
  cartSlice.actions;

export default cartSlice.reducer;