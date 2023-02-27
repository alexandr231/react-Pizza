import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizzaToCart(state, action) {
      let pizzaInCart = state.items.find( (pizza) => pizza.id===action.payload.id&&pizza.size===action.payload.size&&pizza.type===action.payload.type)
      if(pizzaInCart) {
        pizzaInCart.count++;
      } else {
        state.items.push({
          ...action.payload,
          count:1,
        })
      }

      state.totalPrice = state.items.reduce( (sum, pizza) => {
        return pizza.price*pizza.count+sum;
      }, 0)

      state.totalCount = state.items.reduce( (count, pizza) => {
        return pizza.count + count;
      }, 0) 
    },
    removePizzaFromCart(state, action) {
      state.items = state.items.filter( (pizza) => pizza.id!==action.payload.id||pizza.size!==action.payload.size||pizza.type!==action.payload.type);

      state.totalPrice = state.items.reduce( (sum, pizza) => {
        return pizza.price*pizza.count+sum;
      }, 0);

      state.totalCount = state.items.reduce( (count, pizza) => {
        return pizza.count + count;
      }, 0)
    },
    minusPizza(state, action) {
      let pizzaInCart = state.items.find( (pizza) => pizza.id===action.payload.id&&pizza.size===action.payload.size&&pizza.type===action.payload.type)
      if(pizzaInCart) {
        pizzaInCart.count--;
      }

      state.totalPrice = state.items.reduce( (sum, pizza) => {
        return pizza.price*pizza.count+sum;
      }, 0)

      state.totalCount = state.items.reduce( (count, pizza) => {
        return pizza.count + count;
      }, 0)
    },
    clearPizzasInCart(state) {
      state.items = [];

      state.totalPrice = 0;
      state.totalCount = 0;
    }
  },
});

export const selectCart = (state) => state.cart;
// Action creators are generated for each case reducer function
export const { addPizzaToCart, removePizzaFromCart, minusPizza, clearPizzasInCart } = cartSlice.actions;

export default cartSlice.reducer;
