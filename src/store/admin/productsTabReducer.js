import {
  CLOSE_BRANDS_MODAL,
  CLOSE_CATEGORIES_MODAL,
  CLOSE_PRODUCT_MODAL,
  SHOW_BRANDS_MODAL,
  SHOW_CATEGORIES_MODAL,
  SHOW_PRODUCT_MODAL
} from './productsTabActions';

const initialState = {
  showProductModal: false,
  showCategoriesModal: false,
  showBrandsModal: false
};

function productsTabReducer(state, action) {
  switch (action.type) {
    case SHOW_PRODUCT_MODAL:
      return { ...state, showProductModal: true };
    case CLOSE_PRODUCT_MODAL:
      return { ...state, showProductModal: false };
    case SHOW_CATEGORIES_MODAL:
      return { ...state, showCategoriesModal: true };
    case CLOSE_CATEGORIES_MODAL:
      return { ...state, showCategoriesModal: false };
    case SHOW_BRANDS_MODAL:
      return { ...state, showBrandsModal: true };
    case CLOSE_BRANDS_MODAL:
      return { ...state, showBrandsModal: false };
    default:
      return state;
  }
}

export { initialState, productsTabReducer };
