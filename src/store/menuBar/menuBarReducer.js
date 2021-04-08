import {
  SET_ACTIVE_DATA,
  RESET_ACTIVE_DATA,
  SET_RECIPES_DATA,
  SET_SHOP_DATA
} from './menuBarActionTypes';

const initialState = {
  activeData: [],
  shopData: { status: 'PENDING', data: [] },
  recipesData: { status: 'PENDING', data: [] }
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
    case SET_RECIPES_DATA:
      return {
        ...state,
        recipesData: { status: 'FETCHED', data: action.payload }
      };
    case SET_SHOP_DATA:
      return {
        ...state,
        shopData: { status: 'FETCHED', data: action.payload }
      };
    default:
      return state;
  }
}

export { initialState, menuBarReducer };
