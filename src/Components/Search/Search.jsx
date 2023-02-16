import React from 'react';
import styles from './Search.module.scss';
import searchLogo from '../../Assets/img/searchLogo.png';
import closeLogo from '../../Assets/img/closeLogo.svg';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { setSearchInput } from '../../Redux/slices/filterSlice';

export default function Search() {

  const searchInput = useSelector((state) => state.filter.searchInput);
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <img className={styles.searchLogo} src={searchLogo} alt=""></img>
      <input
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={searchInput}
        onChange={(e) => {
          dispatch(setSearchInput(e.target.value));
        }}></input>
      {searchInput && (
        <img
          className={styles.closeLogo}
          src={closeLogo}
          alt=""
          onClick={() => {
            dispatch(setSearchInput(''));
          }}></img>
      )}
    </div>
  );
}
