import React from 'react';
import { DropdownButton, Dropdown, Form, FormControl } from 'react-bootstrap';
import { Search, X } from 'react-bootstrap-icons';
import { useHistory, useLocation } from 'react-router-dom';

import { Pagination } from '../pagination/Pagination';
import { ProductCard } from './ProductCard';
import { axiosInstance } from '../../api/axios';
import { BrandFilter } from '../filters/BrandFilter';
import { convertToUrl, convertFromUrl } from '../../helpers/convertToUrl';
import { parseQueryString } from '../../helpers/parseQueryString';
import { getUrlSerachParams } from '../../helpers/getUrlSearchParams';
import styles from './ProductsList.module.scss';
import {
  productsListReducer,
  initialState
} from '../../store/products/productsListReducer';
import {
  CHANGE_PAGE_INDEX,
  CLEAR_SEARCH,
  DELETE_BRAND_FILTER,
  FETCH_BRANDS,
  FETCH_PRODUCTS,
  FILTER_BY_BRAND,
  RESET_URL,
  SEARCH,
  SET_DROPDOWN,
  SORT_BY
} from '../../store/products/productsListActionTypes';

const sorting = Object.freeze({
  priceAsc: 'Price: ascending',
  priceDesc: 'Price: descending',
  alphabetical: 'Sort by A-Z'
});

const apiURL = '/products';

function getBrandsMap(brands) {
  return brands.reduce(
    (acc, cur) => ({ ...acc, [convertToUrl(cur.name)]: cur.id }),
    {}
  );
}

function ProductsList({ categoryId, subcategoryId, name }) {
  const [state, dispatch] = React.useReducer(productsListReducer, {
    ...initialState,
    categoryId,
    subcategoryId
  });

  const history = useHistory();
  const queryString = useLocation().search;

  const mappedBrands = React.useMemo(() => getBrandsMap(state.brands.results), [
    state.brands.results
  ]);

  React.useEffect(
    function fetchProducts() {
      axiosInstance
        .get(apiURL, {
          params: {
            categoryId,
            subcategoryId,
            brandId: state.apiParams.brandId,
            sort: state.apiParams.sort,
            search: state.apiParams.search,
            pageIndex: state.apiParams.pageIndex,
            pageSize: state.apiParams.pageSize
          }
        })
        .then((response) => {
          if (response.status === 200) {
            dispatch({ type: FETCH_PRODUCTS, payload: response.data });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [
      categoryId,
      subcategoryId,
      state.apiParams.brandId,
      state.apiParams.sort,
      state.apiParams.search,
      state.apiParams.pageIndex,
      state.apiParams.pageSize
    ]
  );

  React.useEffect(
    function fetchBrands() {
      axiosInstance
        .get('/productbrands/category', {
          params: {
            categoryId,
            subcategoryId
          }
        })
        .then((response) => {
          if (response.status === 200) {
            dispatch({ type: FETCH_BRANDS, payload: response.data });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [categoryId, subcategoryId]
  );

  React.useEffect(
    function queryParamsHandler() {
      const queryParams = parseQueryString(queryString);

      if (queryString === '') {
        dispatch({ type: RESET_URL });
      } else {
        if (queryParams.sort) {
          dispatch({ type: SORT_BY, payload: queryParams.sort });
          dispatch({
            type: SET_DROPDOWN,
            payload:
              queryParams.sort === ''
                ? sorting.alphabetical
                : sorting[queryParams.sort]
          });
        }

        if (queryParams.brand) {
          dispatch({
            type: FILTER_BY_BRAND,
            payload: {
              brandId: mappedBrands[queryParams.brand],
              brandName: queryParams.brand
            }
          });
        }

        if (queryParams.search) {
          dispatch({
            type: SEARCH,
            payload: convertFromUrl(queryParams.search)
          });
        }
      }
    },
    [queryString, mappedBrands]
  );

  const pageNumberHandler = (pageNumber) => {
    dispatch({ type: CHANGE_PAGE_INDEX, payload: pageNumber });
  };

  const brandHandler = (brandId, brandName) => {
    const newUrlParams = { ...state.urlParams };

    newUrlParams.brand = convertToUrl(brandName);

    dispatch({
      type: FILTER_BY_BRAND,
      payload: { brandId, brandName: convertToUrl(brandName) }
    });

    const urlSearchParams = getUrlSerachParams(newUrlParams);

    history.replace({ search: urlSearchParams.toString() });
  };

  const searchHandler = (e) => {
    e.preventDefault();

    if (state.searchString) {
      dispatch({ type: SEARCH, payload: state.searchString });
    }

    const newUrlParams = { ...state.urlParams };

    newUrlParams.search = convertToUrl(state.searchString);

    const urlSearchParams = getUrlSerachParams(newUrlParams);

    history.replace({ search: urlSearchParams.toString() });
  };

  const dropdownValueHandler = (text) => {
    const newUrlParams = { ...state.urlParams };

    switch (text) {
      case sorting.priceAsc:
        dispatch({ type: SORT_BY, payload: 'priceAsc' });
        newUrlParams.sort = 'priceAsc';
        break;
      case sorting.priceDesc:
        dispatch({ type: SORT_BY, payload: 'priceDesc' });
        newUrlParams.sort = 'priceDesc';
        break;
      case sorting.alphabetical:
        dispatch({ type: SORT_BY, payload: '' });
        newUrlParams.sort = '';
        break;
      default:
        break;
    }

    const urlSearchParams = getUrlSerachParams(newUrlParams);

    history.replace({ search: urlSearchParams.toString() });

    dispatch({ type: SET_DROPDOWN, payload: text });
  };

  const clearBrandsHandler = () => {
    const newUrlParams = { ...state.urlParams };

    newUrlParams.brand = '';

    dispatch({ type: DELETE_BRAND_FILTER });

    const urlSearchParams = getUrlSerachParams(newUrlParams);

    history.replace({ search: urlSearchParams.toString() });
  };

  const clearSearchHandler = () => {
    dispatch({ type: CLEAR_SEARCH });

    const newUrlParams = { ...state.urlParams };

    newUrlParams.search = '';

    const urlSearchParams = getUrlSerachParams(newUrlParams);

    history.replace({ search: urlSearchParams.toString() });
  };

  return (
    <div className={styles.flexboxColumn}>
      <div>
        <br />
        <h3>{name}</h3>
        <br />
      </div>

      <div className={styles.flexboxWithWrap}>
        <div className={styles.filtersDiv}>
          <div className={styles.fixed}>
            <h3>filter by:</h3>

            <Form inline className={styles.justifyCenter}>
              <FormControl
                type="text"
                placeholder="Search"
                className={`${styles.input} mr-sm-2 font-weight-light shadow`}
                value={state.searchString}
                onChange={(e) => {
                  dispatch({
                    type: 'SEARCH-INPUT-CHANGE',
                    payload: e.target.value
                  });
                }}
              />
              {!state.searchActive && (
                <button
                  type="submit"
                  className={`${styles.searchButton}`}
                  onClick={searchHandler}
                >
                  <Search />
                </button>
              )}

              {state.searchActive && (
                <button
                  type="submit"
                  className={`${styles.searchButton}`}
                  onClick={clearSearchHandler}
                >
                  <X className={`${styles.clearButton}`} />
                </button>
              )}
            </Form>

            {state.brands.status === 'FETCHED' && (
              <BrandFilter
                brands={state.brands.results}
                brandHandler={brandHandler}
                activeButton={state.apiParams.brandId}
                handler={clearBrandsHandler}
              />
            )}
          </div>
        </div>

        <div className={`${styles.flexboxWithWrap} ${styles.productsDiv}`}>
          <div className={`${styles.flexbox}`}>
            <DropdownButton
              title={state.dropdownValue}
              variant="outline-secondary"
              size="sm"
              className={styles.sortButton}
            >
              <Dropdown.Item
                onClick={(e) => dropdownValueHandler(e.target.textContent)}
              >
                {sorting.alphabetical}
              </Dropdown.Item>

              <Dropdown.Item
                onClick={(e) => dropdownValueHandler(e.target.textContent)}
              >
                {sorting.priceAsc}
              </Dropdown.Item>

              <Dropdown.Item
                onClick={(e) => dropdownValueHandler(e.target.textContent)}
              >
                {sorting.priceDesc}
              </Dropdown.Item>
            </DropdownButton>

            <Pagination
              pageSize={state.apiParams.pageSize}
              totalProducts={state.products.count}
              pageNumberHandler={pageNumberHandler}
              pageIndex={state.apiParams.pageIndex}
            />
          </div>

          <ol className={styles.productsList}>
            {state.products.status === 'FETCHED' &&
              state.products.results.map((product) => (
                <li key={product.id}>
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    urlName={product.urlName}
                    subcategory={product.productSubcategory}
                  />
                </li>
              ))}
          </ol>

          <Pagination
            pageSize={state.apiParams.pageSize}
            totalProducts={state.products.count}
            pageNumberHandler={pageNumberHandler}
            pageIndex={state.apiParams.pageIndex}
          />
        </div>
      </div>
    </div>
  );
}

export { ProductsList };
