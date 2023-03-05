import React from 'react';
import styles from './Search.module.scss';
import searchLogo from '../../Assets/img/searchLogo.png';
import closeLogo from '../../Assets/img/closeLogo.svg';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { setSearchInput } from '../../Redux/slices/filterSlice';
import debounce from 'lodash.debounce';

export default function Search() {
  const searchInput = useSelector((state: any) => state.filter.searchInput);
  const dispatch = useDispatch();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [ inputValue, setValue ]  = React.useState('');

  const updateSearchInput = React.useMemo(
    () => debounce((str) => {
      dispatch(setSearchInput(str));
    }, 250), [dispatch]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchInput(e.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.searchLogo} src={searchLogo} alt=""></img>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={inputValue}
        onChange={onChangeValue}></input>
      {searchInput && (
        <img
          className={styles.closeLogo}
          src={closeLogo}
          alt=""
          onClick={() => {
            dispatch(setSearchInput(''));
            setValue('');
            inputRef.current?.focus();
          }}></img>
      )}
    </div>
  );
}
