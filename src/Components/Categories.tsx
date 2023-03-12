import React from 'react';
import { setCategoryId } from '../Redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { RootState } from '../Redux/store';

const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  const categoryId: number = useSelector((state:RootState) => state.filter.categoryId)
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onChangeCategory = React.useCallback((i: number) => {
    dispatch(setCategoryId(i));
  }, [dispatch]);

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => {
              onChangeCategory(i);
            }}
            className={categoryId === i ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;