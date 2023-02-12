import React from 'react';

export default function Categories({activeIndex, setActiveIndex}) {

    const categories = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map(
            (category, i) => (
            <li key={i} onClick={() => (setActiveIndex(i))} className={activeIndex===i ? 'active' : ''}>{category}</li>
            ))}
      </ul>
    </div>
  );
}
