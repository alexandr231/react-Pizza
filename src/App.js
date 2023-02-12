import axios from 'axios';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import './scss/app.scss';

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isFetching, toggleIsFetching] = React.useState(true);
  const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0);
  const [activeSortType, setActiveSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [searchInput, setSearchInput] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    let categoryRequest = activeCategoryIndex > 0 ? `category=${activeCategoryIndex}` : '';
    let sortBy = `&sortBy=${activeSortType.sortProperty.replace('-','')}`;
    let order = activeSortType.sortProperty.includes('-') ? 'desc' : 'asc';

    const getPizzas = async () => {
    toggleIsFetching(true);
      let response = await axios.get(
        `https://63e3bb4365ae49317716207a.mockapi.io/items?page=${currentPage}&limit=4&${categoryRequest}${sortBy}&order=${order}&search=${searchInput}`,
      );
      setPizzas(response.data);
      toggleIsFetching(false);
    };

    getPizzas();
    window.scrollTo(0, 0);
  }, [activeSortType, activeCategoryIndex, searchInput,currentPage]);

  return (
    <div className="App">
      <div className="wrapper">
        <Header searchInput={searchInput} setSearchInput={setSearchInput}/>
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  pizzas={pizzas}
                  isFetching={isFetching}
                  activeSortType={activeSortType}
                  setActiveSortType={(i) => {
                    setActiveSortType(i);
                  }}
                  activeCategoryIndex={activeCategoryIndex}
                  setActiveCategoryIndex={(i) => {
                    setActiveCategoryIndex(i);
                  }}
                  setCurrentPage={setCurrentPage}
                  ></Home>
              }></Route>
            <Route path="/cart" element={<Cart></Cart>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
