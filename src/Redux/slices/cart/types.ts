export type CartItem = {
  id: string;
  title: string;
  type: string;
  size: number;
  count: number;
  price: number;
  imageUrl: string;
};

export type CartSliceState = {
  items: CartItem[],
  totalPrice: number,
  totalCount: number,
}