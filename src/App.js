import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import './scss/app.scss';

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isFetching, toggleIsFetching] = React.useState(true);

  const {categoryId, sort, currentPage, searchInput} = useSelector((state) => state.filter);

  React.useEffect(() => {
    let categoryRequest = categoryId > 0 ? `category=${categoryId}` : '';
    let sortBy = `&sortBy=${sort.sortProperty.replace('-','')}`;
    let order = sort.sortProperty.includes('-') ? 'desc' : 'asc';

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
  }, [sort, categoryId, searchInput,currentPage]);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  pizzas={pizzas}
                  isFetching={isFetching}
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
