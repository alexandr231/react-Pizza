import React from 'react';
import Categories from '../Components/Categories';
import PizzaBlock from '../Components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../Components/PizzaBlock/PizzaBlockSkeleton';
import Sort from '../Components/Sort';

export default function Home({pizzas, isFetching}) {
  return (
    <div className="container">
      <div className="content__top">
        <Categories></Categories>
        <Sort></Sort>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isFetching
          ? [...new Array(6)].map((_, i) => <Skeleton key={i}></Skeleton>)
          : pizzas.map((pizza) => <PizzaBlock {...pizza}></PizzaBlock>)}
      </div>
    </div>
  );
}
