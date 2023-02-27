import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function FullPizza() {
  const { id } = useParams();
  const [ pizza, setPizza ] = React.useState();

  React.useEffect(() => {
    const fetchFullPizza = async () => {
      try {
        const response = await axios.get(`https://63e3bb4365ae49317716207a.mockapi.io/items/` + id);
        setPizza(response.data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
      }
    };
    fetchFullPizza();
  }, [id]);

  if (!pizza) {
    return <div>Загрузка...</div>
  }
  return (
    <div className='container'>
      <h2>{pizza.title}</h2>
      <img src={pizza.imageUrl} alt=""></img>
      <h4>{pizza.price}</h4>
    </div>
  );
}
