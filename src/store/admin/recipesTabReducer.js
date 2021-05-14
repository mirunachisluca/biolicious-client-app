import {
  CLOSE_CATEGORIES_MODAL,
  CLOSE_DIETS_MODAL,
  CLOSE_RECIPE_MODAL,
  SHOW_CATEGORIES_MODAL,
  SHOW_DIETS_MODAL,
  SHOW_RECIPE_MODAL
} from './recipesTabActions';

const initialState = {
  showRecipesModal: false,
  showDietsModal: false,
  showCategoriesModal: false
};

function recipesTabReducer(state, action) {
  switch (action.type) {
    case SHOW_RECIPE_MODAL:
      return { ...state, showRecipesModal: true };
    case CLOSE_RECIPE_MODAL:
      return { ...state, showRecipesModal: false };
    case SHOW_DIETS_MODAL:
      return { ...state, showDietsModal: true };
    case CLOSE_DIETS_MODAL:
      return { ...state, showDietsModal: false };
    case SHOW_CATEGORIES_MODAL:
      return { ...state, showCategoriesModal: true };
    case CLOSE_CATEGORIES_MODAL:
      return { ...state, showCategoriesModal: false };
    default:
      return state;
  }
}

export { initialState, recipesTabReducer };
