import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { Search, X } from 'react-bootstrap-icons';

import styles from './SearchBar.module.scss';

function SearchBar({ state, onChange, searchHandler, clearSearchHandler }) {
  return (
    <>
      <Form inline className={styles.justifyCenter}>
        <FormControl
          type="text"
          placeholder="Search"
          className={`${styles.input} mr-sm-2 font-weight-light shadow`}
          value={state.searchString}
          onChange={onChange}
          onClick={clearSearchHandler}
        />

        {/* {!state.searchActive && ( */}
        <button
          type="submit"
          className={`${styles.searchButton}`}
          onClick={searchHandler}
        >
          <Search />
        </button>
        {/* )} */}

        {/* {state.searchActive && (
          <button
            type="submit"
            className={`${styles.searchButton}`}
            onClick={clearSearchHandler}
          >
            <X className={`${styles.clearButton}`} />
          </button>
        )} */}
      </Form>
    </>
  );
}
export { SearchBar };
