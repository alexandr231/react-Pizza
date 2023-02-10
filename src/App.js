import axios from 'axios';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import './scss/app.scss';

function App() {
  const getPizzas = async () => {
    let response = await axios.get('https://63e3bb4365ae49317716207a.mockapi.io/items/');
    setPizzas(response.data);
    toggleIsFetching(false);
  };

  const [pizzas, setPizzas] = React.useState([]);
  const [isFetching, toggleIsFetching] = React.useState(true);

  React.useEffect(() => {
    getPizzas();
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
                <Route path='/' element={<Home pizzas={pizzas} isFetching={isFetching}></Home>}></Route>
                <Route path='/cart' element={<Cart></Cart>}></Route>
                <Route path='*' element={<NotFound></NotFound>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
