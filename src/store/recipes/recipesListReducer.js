import {
  CHANGE_PAGE_INDEX,
  CLEAR_SEARCH,
  DELETE_CATEGORY_FILTER,
  DELETE_DIET_FILTER,
  FETCH_RECIPES,
  FILTER_BY_CATEGORY,
  FILTER_BY_DIET,
  RESET_URL,
  SEARCH,
  SEARCH_INPUT_CHANGE
} from './recipesListActions';

const initialState = {
  apiParams: {
    categoryId: 0,
    dietId: 0,
    pageIndex: 1,
    pageSize: 15,
    search: ''
  },
  urlParams: {
    category: '',
    diet: '',
    search: ''
  },
  recipes: { status: 'IDLE', count: 0, results: [] },
  searchString: '',
  searchActive: false
};

function recipesListReducer(state, action) {
  switch (action.type) {
    case FETCH_RECIPES: {
      return {
        ...state,
        recipes: {
          status: 'FETCHED',
          count: action.payload.count,
          results: action.payload.data
        }
      };
    }
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        apiParams: {
          ...state.apiParams,
          categoryId: action.payload.categoryId
        },
        urlParams: {
          ...state.urlParams,
          category: action.payload.categoryName
        }
      };
    case FILTER_BY_DIET:
      return {
        ...state,
        apiParams: {
          ...state.apiParams,
          dietId: action.payload.dietId
        },
        urlParams: {
          ...state.urlParams,
          diet: action.payload.dietName
        }
      };
    case DELETE_CATEGORY_FILTER:
      return {
        ...state,
        apiParams: { ...state.apiParams, categoryId: 0 },
        urlParams: { ...state.urlParams, category: '' }
      };
    case DELETE_DIET_FILTER:
      return {
        ...state,
        apiParams: { ...state.apiParams, dietId: 0 },
        urlParams: { ...state.urlParams, diet: '' }
      };
    case CHANGE_PAGE_INDEX:
      return {
        ...state,
        apiParams: { ...state.apiParams, pageIndex: action.payload }
      };
    case SEARCH_INPUT_CHANGE:
      return { ...state, searchString: action.payload };
    case SEARCH:
      return {
        ...state,
        apiParams: { ...state.apiParams, search: action.payload },
        urlParams: { ...state.urlParams, search: action.payload },
        searchString: action.payload,
        searchActive: true
      };
    case RESET_URL:
      return { ...state, urlParams: { ...initialState.urlParams } };
    case CLEAR_SEARCH:
      return {
        ...state,
        apiParams: { ...state.apiParams, search: '' },
        urlParams: { ...state.urlParams, search: '' },
        searchString: '',
        searchActive: false
      };
    default:
      return state;
  }
}

export { initialState, recipesListReducer };
