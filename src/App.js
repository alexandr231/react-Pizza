import Categories from './Components/Categories';
import Header from './Components/Header';
import PizzaBlock from './Components/PizzaBlock';
import Sort from './Components/Sort';
import './scss/app.scss';

function App() {
  return (
    <div className="App">
      <div class="wrapper">
        <Header />
        <div class="content">
          <div class="container">
            <div class="content__top">
              <Categories></Categories>
              <Sort></Sort>
            </div>
            <h2 class="content__title">Все пиццы</h2>
            <div class="content__items">
              <PizzaBlock name='По кайфу' price={500}/>
              <PizzaBlock name='Крысиная' price={400}/>
              <PizzaBlock name='С тушенкой' price={300}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
