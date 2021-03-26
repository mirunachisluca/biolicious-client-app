import React from 'react';
import styles from './Pagination.module.scss';

function Pagination({ pageSize, totalProducts, pageNumberHandler, pageIndex }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / pageSize); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <>
      {pageNumbers.length > 1 && (
        <nav className={styles.marginLeftAuto}>
          <ul className={`pagination ${styles.paginationList}`}>
            {pageNumbers.map((number) => (
              <li key={number} className={`page-item ${styles.pointerIcon}`}>
                <button
                  type="button"
                  onClick={() => pageNumberHandler(number)}
                  className={`${styles.paginationButton} ${
                    number === pageIndex ? styles.active : ''
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

export { Pagination };
