import {CartItem} from '../Redux/slices/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum: number, pizza: CartItem) => {
    return pizza.price * pizza.count + sum;
  }, 0);
}