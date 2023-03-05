import React from 'react';
import { setCategoryId } from '../Redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux/es/exports';

export default function Categories() {
  const dispatch = useDispatch();

  const categoryId: number = useSelector((state:any) => state.filter.categoryId)
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => {
              dispatch(setCategoryId(i));
            }}
            className={categoryId === i ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
