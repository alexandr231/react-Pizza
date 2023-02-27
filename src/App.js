import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import './scss/app.scss';
import { fetchPizzas } from './Redux/slices/pizzasSlice';
import { sortTypes } from './Components/Sort';
import { setFilters } from './Redux/slices/filterSlice';
import qs from 'qs';

function App() {
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
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/cart" element={<Cart></Cart>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
