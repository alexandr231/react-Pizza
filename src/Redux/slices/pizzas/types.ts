export type Pizza = {
  type: string,
  size: number,
  title: string,
  price: number,
  imageUrl: string,
  id: string,
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'failed'
}

export type PizzaSliceState = {
  items: Pizza[],
  loading: Status,
}

export type SearchPizzaParams = {
  currentPage: string, 
  categoryId: string, 
  sortBy: string, 
  order: string, 
  searchInput: string
}