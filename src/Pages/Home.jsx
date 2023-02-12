import React from 'react';
import Categories from '../Components/Categories';
import Pagination from '../Components/Pagination/Pagination';
import PizzaBlock from '../Components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../Components/PizzaBlock/PizzaBlockSkeleton';
import Sort from '../Components/Sort';

export default function Home({pizzas, isFetching, activeSortType, setActiveSortType, activeCategoryIndex, setActiveCategoryIndex, setCurrentPage} ) {
  return (
    <div className="container">
      <div className="content__top">
        <Categories activeIndex={activeCategoryIndex} setActiveIndex={(i)=>{setActiveCategoryIndex(i)}}></Categories>
        <Sort activeSortType={activeSortType} setActiveSortType={(i)=>{setActiveSortType(i)}} ></Sort>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isFetching
          ? [...new Array(6)].map((_, i) => <Skeleton key={i}></Skeleton>)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza}></PizzaBlock>)}
      </div>
      <Pagination setCurrentPage={setCurrentPage}></Pagination>
    </div>
  );
}
