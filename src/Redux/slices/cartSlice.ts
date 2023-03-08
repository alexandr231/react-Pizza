import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  id: string;
  title: string;
  type: string;
  size: number;
  count: number;
  price: number;
  imageUrl: string;
};

type CartSliceState = {
  items: CartItem[],
  totalPrice: number,
  totalCount: number,
}
const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
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

      state.totalPrice = state.items.reduce((sum, pizza) => {
        return pizza.price * pizza.count + sum;
      }, 0);

      state.totalCount = state.items.reduce((count, pizza) => {
        return pizza.count + count;
      }, 0);
    },
    removePizzaFromCart(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter(
        (pizza) =>
          pizza.id !== action.payload.id ||
          pizza.size !== action.payload.size ||
          pizza.type !== action.payload.type,
      );

      state.totalPrice = state.items.reduce((sum, pizza) => {
        return pizza.price * pizza.count + sum;
      }, 0);

      state.totalCount = state.items.reduce((count, pizza) => {
        return pizza.count + count;
      }, 0);
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

      state.totalPrice = state.items.reduce((sum, pizza) => {
        return pizza.price * pizza.count + sum;
      }, 0);

      state.totalCount = state.items.reduce((count, pizza) => {
        return pizza.count + count;
      }, 0);
    },
    clearPizzasInCart(state) {
      state.items = [];

      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
// Action creators are generated for each case reducer function
export const { addPizzaToCart, removePizzaFromCart, minusPizza, clearPizzasInCart } =
  cartSlice.actions;

export default cartSlice.reducer;
