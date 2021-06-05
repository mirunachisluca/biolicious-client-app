import {
  CLOSE_PRODUCTS_TAB,
  CLOSE_RECIPES_TAB,
  CLOSE_USERS_TAB,
  SHOW_PRODUCTS_TAB,
  SHOW_RECIPES_TAB,
  SHOW_USERS_TAB
} from './adminPageActions';

export const initialState = {
  showProductsTab: true,
  showRecipesTab: false,
  showUsersTab: false
};

export function adminPageReducer(state, action) {
  switch (action.type) {
    case SHOW_PRODUCTS_TAB:
      return { ...state, showProductsTab: true };
    case CLOSE_PRODUCTS_TAB:
      return { ...state, showProductsTab: false };
    case SHOW_RECIPES_TAB:
      return { ...state, showRecipesTab: true };
    case CLOSE_RECIPES_TAB:
      return { ...state, showRecipesTab: false };
    case SHOW_USERS_TAB:
      return { ...state, showUsersTab: true };
    case CLOSE_USERS_TAB:
      return { ...state, showUsersTab: false };

    default:
      return state;
  }
}
