import React from 'react';
import Categories from '../Components/Categories';
import Pagination from '../Components/Pagination/Pagination';
import PizzaBlock from '../Components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../Components/PizzaBlock/PizzaBlockSkeleton';
import Sort from '../Components/Sort';
import { useSelector } from 'react-redux';

export default function Home() {

  const pizzas = useSelector(state => state.pizzas.items);
  const loading = useSelector(state => state.pizzas.loading);

  return (
    <div className="container">
      <div className="content__top">
        <Categories></Categories>
        <Sort></Sort>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      { loading === 'failed' 
      ? <div className='content__error'>
        <h2>Произошла ошибка😕</h2>
        <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку позже</p>
      </div>
      : <div className="content__items">
        {loading === 'pending'
          ? [...new Array(6)].map((_, i) => <Skeleton key={i}></Skeleton>)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza}></PizzaBlock>)}
      </div>}
      <Pagination></Pagination>
    </div>
  );
}
