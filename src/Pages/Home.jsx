import React from 'react';
import Categories from '../Components/Categories';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Components/Pagination/Pagination';
import PizzaBlock from '../Components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../Components/PizzaBlock/PizzaBlockSkeleton';
import Sort from '../Components/Sort';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPizzas } from '../Redux/slices/pizzasSlice';
import { sortTypes } from '../Components/Sort';
import { setFilters } from '../Redux/slices/filterSlice';
import qs from 'qs';

export default function Home() {
  const pizzas = useSelector((state) => state.pizzas.items);
  const loading = useSelector((state) => state.pizzas.loading);

  const navigate = useNavigate();
  let isMounted = React.useRef(false);
  let isSearch = React.useRef(false);
  const { categoryId, sort, currentPage, searchInput } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  //Если первый рендер уже был, то вставляем параметры в URL
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  //Если это первый рендер и параметры есть в строке, то сохраняем их в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortTypes.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );

      isSearch.current = true;
    }
  }, [dispatch]);

  //Запрашиваем пиццы, кроме случая с параметрами в строке при первом рендере
  React.useEffect(() => {
    let categoryRequest = categoryId > 0 ? `category=${categoryId}` : '';
    let sortBy = `&sortBy=${sort.sortProperty.replace('-', '')}`;
    let order = sort.sortProperty.includes('-') ? 'desc' : 'asc';

    if (!isSearch.current) {
      dispatch(fetchPizzas({ currentPage, categoryRequest, sortBy, order, searchInput }));
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [sort, categoryId, searchInput, currentPage, dispatch]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories></Categories>
        <Sort></Sort>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {loading === 'failed' ? (
        <div className="content__error">
          <h2>Произошла ошибка😕</h2>
          <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">
          {loading === 'pending'
            ? [...new Array(6)].map((_, i) => <Skeleton key={i}></Skeleton>)
            : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza}></PizzaBlock>)}
        </div>
      )}
      <Pagination></Pagination>
    </div>
  );
}
