import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { setCurrentPage } from '../../Redux/slices/filter/slice'

export default function Pagination() {
  const currentPage = useSelector((state:any) => state.filter.currentPage)
  const dispatch = useDispatch();
  return (
    <ReactPaginate className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => {
            dispatch(setCurrentPage(event.selected+1));
        }}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        forcePage={currentPage-1}
      />
  )
}
