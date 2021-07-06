import {
  SET_ACTIVE_DATA,
  RESET_ACTIVE_DATA,
  SET_SHOP_DATA,
  SET_DIETS_DATA,
  SET_CATEGORIES_DATA
} from './menuBarActions';

const initialState = {
  activeData: [],
  shopData: { status: 'PENDING', data: [] },
  diets: { status: 'PENDING', data: [] },
  categories: { status: 'PENDING', data: [] }
};

function menuBarReducer(state, action) {
  switch (action.type) {
    case SET_ACTIVE_DATA:
      return {
        ...state,
        activeData: action.payload
      };
    case RESET_ACTIVE_DATA:
      return {
        ...state,
        activeData: []
      };
    case SET_SHOP_DATA:
      return {
        ...state,
        shopData: { status: 'FETCHED', data: action.payload }
      };
    case SET_DIETS_DATA:
      return {
        ...state,
        diets: { status: 'FETCHED', data: action.payload }
      };
    case SET_CATEGORIES_DATA:
      return {
        ...state,
        categories: { status: 'FETCHED', data: action.payload }
      };
    default:
      return state;
  }
}

export { initialState, menuBarReducer };
