import {
  DELETE_CATEGORY_FILTER,
  DELETE_DIET_FILTER,
  FETCH_RECIPES,
  FILTER_BY_CATEGORY,
  FILTER_BY_DIET,
  RESET_URL
} from './recipesListActions';

const initialState = {
  apiParams: {
    categoryId: 0,
    dietId: 0
  },
  urlParams: {
    category: '',
    diet: ''
  },
  recipes: { status: 'IDLE', results: [] }
};

function recipesListReducer(state, action) {
  switch (action.type) {
    case FETCH_RECIPES: {
      return {
        ...state,
        recipes: { status: 'FETCHED', results: action.payload }
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
        apiParams: { ...state.apipaams, dietId: 0 },
        urlParams: { ...state.urlParams, diet: '' }
      };
    case RESET_URL:
      return { ...state, urlParams: { ...initialState.urlParams } };
    default:
      return state;
  }
}

export { initialState, recipesListReducer };
