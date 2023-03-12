import {CartItem} from '../Redux/slices/cart/types';

export const calcTotalCount = (items: CartItem[]) => {
  return items.reduce((count, pizza) => {
    return pizza.count + count;
  }, 0);
}