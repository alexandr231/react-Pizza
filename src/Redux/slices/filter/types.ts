export enum SortPropertyEnum {
  RATING_ASC = 'rating',
  RATING_DESC = '-rating',
  TITLE_ASC = 'title',
  TITLE_DESC = '-title',
  PRICE_ASC = 'price',
  PRICE_DESC = '-price'
}
export type Sort = {
  name: string,
  sortProperty: SortPropertyEnum,
}

export type FilterSliceState = {
  categoryId: number,
  sort: Sort,
  currentPage:number,
  searchInput:string,
}