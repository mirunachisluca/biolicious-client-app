import React from 'react';
import { DropdownButton, Dropdown, Form, FormControl } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useHistory, useLocation } from 'react-router-dom';

import { Pagination } from './Pagination';
import { ProductCard } from './ProductCard';
import { axiosInstance } from '../api/axios';
import styles from './products-list.module.scss';
import { BrandFilter } from './filters/BrandFilter';
import { convertToUrl, convertFromUrl } from '../helpers/convertToUrl';
import { parseQueryString } from '../helpers/parseQueryString';
import { getUrlSerachParams } from '../helpers/getUrlSearchParams';

const sorting = Object.freeze({
  priceAsc: 'Price: ascending',
  priceDesc: 'Price: descending',
  alphabetical: 'Sort by A-Z'
});

const apiURL = '/products';

const initialState = {
  apiParams: {
    brandId: 0,
    sort: '',
    search: '',
    pageIndex: 1,
    pageSize: 10
  },
  urlParams: {
    search: '',
    brand: '',
    sort: ''
  },
  dropdownValue: 'Sort by A-Z',
  products: {
    count: 0,
    results: [],
    status: 'IDLE'
  },
  brands: {
    results: [],
    status: 'IDLE'
  },
  searchString: ''
};

function getBrandsMap(brands) {
  return brands.reduce(
    (acc, cur) => ({ ...acc, [convertToUrl(cur.name)]: cur.id }),
    {}
  );
}

function productsListReducer(state, action) {
  switch (action.type) {
    case 'FETCHED-PRODUCTS':
      return {
        ...state,
        products: {
          results: action.payload.data,
          status: 'FETCHED',
          count: action.payload.count
        }
      };
    case 'FETCH-BRANDS':
      return {
        ...state,
        brands: {
          results: action.payload,
          status: 'FETCHED'
        }
      };
    case 'CHANGE-PAGE-INDEX':
      return {
        ...state,
        apiParams: {
          brandId: state.apiParams.brandId,
          sort: state.apiParams.sort,
          pageIndex: action.payload,
          pageSize: state.apiParams.pageSize
        }
      };
    case 'SORT-BY':
      return {
        ...state,
        apiParams: {
          brandId: state.apiParams.brandId,
          sort: action.payload,
          search: state.apiParams.search,
          pageIndex: state.apiParams.pageIndex,
          pageSize: state.apiParams.pageSize
        },
        urlParams: {
          search: state.urlParams.search,
          brand: state.urlParams.brand,
          sort: action.payload
        }
      };
    case 'FILTER-BY-BRAND':
      return {
        ...state,
        apiParams: {
          brandId: action.payload.brandId,
          sort: state.apiParams.sort,
          search: state.apiParams.search,
          pageIndex: 1,
          pageSize: state.apiParams.pageSize
        },
        urlParams: {
          search: state.urlParams.search,
          brand: action.payload.brandName,
          sort: state.urlParams.sort
        }
      };
    case 'SET-DROPDOWN':
      return {
        ...state,
        dropdownValue: action.payload
      };
    case 'SEARCH-INPUT-CHANGE':
      return {
        ...state,
        searchString: action.payload
        // apiParams: {
        //   brandId: state.apiParams.brandId,
        //   sort: state.apiParams.sort,
        //   search: action.payload,
        //   pageIndex: state.apiParams.pageIndex,
        //   pageSize: state.apiParams.pageSize
        // }
      };
    case 'SEARCH':
      return {
        ...state,
        apiParams: {
          brandId: state.apiParams.brandId,
          sort: state.apiParams.sort,
          search: action.payload,
          pageIndex: state.apiParams.pageIndex,
          pageSize: state.apiParams.pageSize
        },
        urlParams: {
          search: action.payload,
          brand: state.urlParams.brand,
          sort: state.urlParams.sort
        },
        searchString: action.payload
      };
    case 'RESET-URL':
      return {
        ...state,
        apiParams: {
          brandId: 0,
          sort: '',
          pageIndex: state.apiParams.pageIndex,
          pageSize: 10
        },
        urlParams: {
          search: '',
          brand: '',
          sort: ''
        },
        dropdownValue: 'Sort by A-Z',
        searchString: ''
      };
    case 'DELETE-BRAND':
      return {
        ...state,
        apiParams: {
          brandId: 0,
          sort: state.apiParams.sort,
          search: state.apiParams.search,
          pageIndex: state.apiParams.pageIndex,
          pageSize: state.apiParams.pageSize
        },
        urlParams: {
          search: state.urlParams.search,
          brand: '',
          sort: state.urlParams.sort
        }
      };
    default:
      return state;
  }
}

function ProductsList({ categoryId, subcategoryId, name }) {
  const [state, dispatch] = React.useReducer(productsListReducer, {
    ...initialState,
    categoryId,
    subcategoryId
  });

  const history = useHistory();
  const queryString = useLocation().search;
  // const { path } = useRouteMatch();

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
            dispatch({ type: 'FETCHED-PRODUCTS', payload: response.data });
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
            dispatch({ type: 'FETCH-BRANDS', payload: response.data });
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
        dispatch({ type: 'RESET-URL' });
      } else {
        if (queryParams.sort) {
          dispatch({ type: 'SORT-BY', payload: queryParams.sort });
          dispatch({
            type: 'SET-DROPDOWN',
            payload:
              queryParams.sort === ''
                ? sorting.alphabetical
                : sorting[queryParams.sort]
          });
        }

        if (queryParams.brand) {
          dispatch({
            type: 'FILTER-BY-BRAND',
            payload: {
              brandId: mappedBrands[queryParams.brand],
              brandName: queryParams.brand
            }
          });
        }

        if (queryParams.search) {
          dispatch({
            type: 'SEARCH',
            payload: convertFromUrl(queryParams.search)
          });
        }
      }
    },
    [queryString, mappedBrands]
  );

  const pageNumberHandler = (pageNumber) => {
    dispatch({ type: 'CHANGE-PAGE-INDEX', payload: pageNumber });
  };

  const brandHandler = (brandId, brandName) => {
    const newUrlParams = { ...state.urlParams };

    newUrlParams.brand = convertToUrl(brandName);

    dispatch({
      type: 'FILTER-BY-BRAND',
      payload: { brandId, brandName: convertToUrl(brandName) }
    });

    const urlSearchParams = getUrlSerachParams(newUrlParams);

    history.replace({ search: urlSearchParams.toString() });
  };

  const searchHandler = (e) => {
    e.preventDefault();

    dispatch({ type: 'SEARCH', payload: state.searchString });

    const newUrlParams = { ...state.urlParams };

    newUrlParams.search = convertToUrl(state.searchString);

    const urlSearchParams = getUrlSerachParams(newUrlParams);

    history.replace({ search: urlSearchParams.toString() });
  };

  const dropdownValueHandler = (text) => {
    const newUrlParams = { ...state.urlParams };

    switch (text) {
      case sorting.priceAsc:
        dispatch({ type: 'SORT-BY', payload: 'priceAsc' });
        newUrlParams.sort = 'priceAsc';
        break;
      case sorting.priceDesc:
        dispatch({ type: 'SORT-BY', payload: 'priceDesc' });
        newUrlParams.sort = 'priceDesc';
        break;
      case sorting.alphabetical:
        dispatch({ type: 'SORT-BY', payload: '' });
        newUrlParams.sort = '';
        break;
      default:
        break;
    }

    const urlSearchParams = getUrlSerachParams(newUrlParams);

    history.replace({ search: urlSearchParams.toString() });

    dispatch({ type: 'SET-DROPDOWN', payload: text });
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
              <button
                type="submit"
                className={`${styles.searchButton}`}
                onClick={searchHandler}
              >
                <Search />
              </button>
            </Form>

            {state.brands.status === 'FETCHED' && (
              <BrandFilter
                brands={state.brands.results}
                brandHandler={brandHandler}
                activeButton={state.apiParams.brandId}
                dispatch={dispatch}
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
