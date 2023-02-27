import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import './scss/app.scss';
import { fetchPizzas } from './Redux/slices/pizzasSlice'

function App() {

  const {categoryId, sort, currentPage, searchInput} = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let categoryRequest = categoryId > 0 ? `category=${categoryId}` : '';
    let sortBy = `&sortBy=${sort.sortProperty.replace('-','')}`;
    let order = sort.sortProperty.includes('-') ? 'desc' : 'asc';

    dispatch(fetchPizzas({currentPage, categoryRequest, sortBy, order, searchInput}));

    window.scrollTo(0, 0);
  }, [sort, categoryId, searchInput,currentPage, dispatch]);

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
