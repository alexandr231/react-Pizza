import React from 'react';
import { setSort, SortPropertyEnum } from '../Redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

type SortTypesItem = {
  name: string;
  sortProperty: SortPropertyEnum;
}
export const sortTypes: SortTypesItem[] = [
  {
    name: 'популярности(ASC)',
    sortProperty: SortPropertyEnum.RATING_ASC,
  },
  {
    name: 'популярности(DESC)',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  {
    name: 'цене(ASC)',
    sortProperty: SortPropertyEnum.PRICE_ASC,
  },
  {
    name: 'цене(DESC)',
    sortProperty: SortPropertyEnum.PRICE_DESC,
  },
  {
    name: 'названию(ASC)',
    sortProperty: SortPropertyEnum.TITLE_ASC,
  },
  {
    name: 'названию(DESC)',
    sortProperty: SortPropertyEnum.TITLE_DESC,
  },
];

const Sort: React.FC = React.memo(() => {

  const sort = useSelector((state: any) => state.filter.sort);
  const dispatch = useDispatch();

  const sortRef = React.useRef<HTMLDivElement>(null);

  const [isSortBarVisible, toggleSortBar] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current)  {let path = event.composedPath().includes(sortRef.current);
      if (!path) toggleSortBar(false);}
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"></path>
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={() => {
            toggleSortBar(!isSortBarVisible);
          }}>
          {sort.name}
        </span>
      </div>
      {isSortBarVisible ? (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((sortType, i) => (
              <li
                key={sortType.sortProperty}
                className={sortType.sortProperty === sort.sortProperty ? 'active' : ''}
                onClick={() => {
                  dispatch(setSort(sortType));
                  toggleSortBar(false);
                }}>
                {sortType.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
})

export default Sort;