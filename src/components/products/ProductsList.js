import React from 'react';
import { DropdownButton, Dropdown, Spinner } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Pagination } from '../pagination/Pagination';
import { ProductCard } from './ProductCard';
import { axiosInstance } from '../../api/axios';
import { FilterCard } from '../filters/FilterCard';
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
  LOADING_PRODUCTS,
  RESET_URL,
  SEARCH,
  SEARCH_INPUT_CHANGE,
  SET_DROPDOWN,
  SORT_BY
} from '../../store/products/productsListActionTypes';
import { createNameIdMap } from '../../helpers/createNameIdMap';
import { SearchBar } from '../filters/SearchBar';

const sorting = Object.freeze({
  priceAsc: 'Price: ascending',
  priceDesc: 'Price: descending',
  alphabetical: 'Sort by A-Z'
});

const apiURL = '/products';

function ProductsList({ categoryId, subcategoryId, name }) {
  const [state, dispatch] = React.useReducer(productsListReducer, {
    ...initialState,
    categoryId,
    subcategoryId
  });

  const history = useHistory();
  const queryString = useLocation().search;

  const mappedBrands = React.useMemo(
    () => createNameIdMap(state.brands.results),
    [state.brands.results]
  );

  React.useEffect(
    function fetchProducts() {
      dispatch({ type: LOADING_PRODUCTS });
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

  const onChange = (e) => {
    dispatch({
      type: SEARCH_INPUT_CHANGE,
      payload: e.target.value
    });
  };

  return (
    <div className={styles.flexboxColumn}>
      <div>
        <br />
        <h3 className="uppercase-bembo">{name}</h3>
        <br />
      </div>

      <div className={styles.flexboxWithWrap}>
        <div className={styles.filtersDiv}>
          <div className={styles.fixed}>
            <h5 className="uppercase-bembo">filter by:</h5>

            <SearchBar
              state={state}
              onChange={onChange}
              searchHandler={searchHandler}
              clearSearchHandler={clearSearchHandler}
            />

            {state.brands.status === 'FETCHED' && (
              <FilterCard
                filterName="brands"
                data={state.brands.results}
                dataHandler={brandHandler}
                activeButton={state.apiParams.brandId}
                clearHandler={clearBrandsHandler}
              />
            )}
          </div>
        </div>

        <div className={`${styles.flexboxWithWrap} ${styles.productsDiv}`}>
          <div className={`${styles.flexbox}`}>
            <DropdownButton
              title={state.dropdownValue}
              variant="dropdown-outline-black"
              size="xs"
              className={styles.sortButton}
            >
              <Dropdown.Item
                onClick={(e) => dropdownValueHandler(e.target.textContent)}
                className="dropdown-filter"
              >
                {sorting.alphabetical}
              </Dropdown.Item>

              <Dropdown.Item
                onClick={(e) => dropdownValueHandler(e.target.textContent)}
                className="dropdown-filter"
              >
                {sorting.priceAsc}
              </Dropdown.Item>

              <Dropdown.Item
                onClick={(e) => dropdownValueHandler(e.target.textContent)}
                className="dropdown-filter"
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

          {state.products.status === 'FETCHED' ? (
            <>
              {state.products.results.length === 0 && (
                <div className={styles.centered}>
                  <p>No results matched your search</p>
                </div>
              )}

              <ol className={styles.productsList}>
                {state.products.results.map((product) => (
                  <li key={product.id}>
                    <ProductCard key={product.id} product={product} />
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <div className={styles.centered}>
              <Spinner animation="border" />
            </div>
          )}

          <Pagination
            pageSize={state.apiParams.pageSize}
            totalProducts={state.products.count}
            pageNumberHandler={pageNumberHandler}
            pageIndex={state.apiParams.pageIndex}
          />
        </div>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export { ProductsList };
