import {
  CHANGE_PAGE_INDEX,
  CLEAR_SEARCH,
  DELETE_BRAND_FILTER,
  FETCH_BRANDS,
  FETCH_PRODUCTS,
  FILTER_BY_BRAND,
  RESET_URL,
  SEARCH,
  SEARCH_INPUT_CHANGE,
  SET_DROPDOWN,
  SORT_BY
} from './productsListActionTypes';

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
  searchString: '',
  searcActive: false
};

function productsListReducer(state, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: {
          results: action.payload.data,
          status: 'FETCHED',
          count: action.payload.count
        }
      };
    case FETCH_BRANDS:
      return {
        ...state,
        brands: {
          results: action.payload,
          status: 'FETCHED'
        }
      };
    case CHANGE_PAGE_INDEX:
      return {
        ...state,
        apiParams: {
          ...state.apiParams,
          pageIndex: action.payload
        }
      };
    case SORT_BY:
      return {
        ...state,
        apiParams: {
          ...state.apiParams,
          sort: action.payload
        },
        urlParams: {
          ...state.urlParams,
          sort: action.payload
        }
      };
    case FILTER_BY_BRAND:
      return {
        ...state,
        apiParams: {
          ...state.apiParams,
          brandId: action.payload.brandId,
          pageIndex: 1
        },
        urlParams: {
          ...state.urlParams,
          brand: action.payload.brandName
        }
      };
    case SET_DROPDOWN:
      return {
        ...state,
        dropdownValue: action.payload
      };
    case SEARCH_INPUT_CHANGE:
      return {
        ...state,
        searchString: action.payload
      };
    case SEARCH:
      return {
        ...state,
        apiParams: {
          ...state.apiParams,
          search: action.payload
        },
        urlParams: {
          ...state.urlParams,
          search: action.payload
        },
        searchString: action.payload,
        searchActive: true
      };
    case RESET_URL:
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
    case DELETE_BRAND_FILTER:
      return {
        ...state,
        apiParams: {
          ...state.apiParams,
          brandId: 0
        },
        urlParams: {
          ...state.urlParams,
          brand: ''
        }
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        apiParams: {
          ...state.apiParams,
          search: ''
        },
        urlParams: {
          ...state.urlParams,
          search: ''
        },
        searchString: '',
        searchActive: false
      };
    default:
      return state;
  }
}

export { initialState, productsListReducer };
