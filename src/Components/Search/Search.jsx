import React from 'react';
import styles from './Search.module.scss';
import searchLogo from '../../Assets/img/searchLogo.png';
import closeLogo from '../../Assets/img/closeLogo.svg';

export default function Search({ searchInput, setSearchInput }) {
  return (
    <div className={styles.root}>
      <img className={styles.searchLogo} src={searchLogo} alt=""></img>
      <input
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}></input>
      {searchInput && (
        <img
          className={styles.closeLogo}
          src={closeLogo}
          alt=""
          onClick={() => {
            setSearchInput('');
          }}></img>
      )}
    </div>
  );
}
