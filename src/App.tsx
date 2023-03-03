import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import './scss/app.scss';
import FullPizza from './Pages/FullPizza';

function App() {
  
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/cart" element={<Cart></Cart>}></Route>
            <Route path="/pizza/:id" element={<FullPizza></FullPizza>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
