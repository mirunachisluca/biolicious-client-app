import {
  SET_PRODUCT,
  SET_PRODUCT_DESCRIPTION,
  SET_PRODUCT_DISCOUNT,
  SET_PRODUCT_NAME,
  SET_PRODUCT_WEIGHT,
  SET_PRODUCT_PRICE,
  SET_PRODUCT_BRAND_ID,
  SET_PRODUCT_CATEGORY_ID,
  SET_PRODUCT_SUBCATEGORY_ID,
  SET_PRODUCT_ENTRY_STATUS,
  SET_PRODUCT_STOCK,
  RESET_PRODUCT,
  SET_PRODUCT_PICTURE_URL
} from './productActions';

export const initialProduct = {
  id: 0,
  name: '',
  description: '',
  weight: '',
  price: '',
  discount: '',
  pictureUrl: 'no-image.png',
  productBrandId: 0,
  productCategoryId: 0,
  productSubcategoryId: null,
  newEntry: true,
  stock: '',
  imageFile: null
};

function productReducer(state, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return { ...action.payload };
    case SET_PRODUCT_NAME:
      return { ...state, name: action.payload };
    case SET_PRODUCT_DESCRIPTION:
      return { ...state, description: action.payload };
    case SET_PRODUCT_WEIGHT:
      return { ...state, weight: action.payload };
    case SET_PRODUCT_PRICE:
      return { ...state, price: action.payload };
    case SET_PRODUCT_DISCOUNT:
      return { ...state, discount: action.payload };
    case SET_PRODUCT_BRAND_ID:
      return { ...state, productBrandId: action.payload };
    case SET_PRODUCT_CATEGORY_ID:
      return { ...state, productCategoryId: action.payload };
    case SET_PRODUCT_SUBCATEGORY_ID:
      return { ...state, productSubcategoryId: action.payload };
    case SET_PRODUCT_ENTRY_STATUS:
      return { ...state, newEntry: action.payload };
    case SET_PRODUCT_STOCK:
      return { ...state, stock: action.payload };
    case SET_PRODUCT_PICTURE_URL:
      return {
        ...state,
        pictureUrl: action.payload.url,
        imageFile: action.payload.image
      };
    case RESET_PRODUCT:
      return { ...initialProduct };
    default:
      return state;
  }
}

export { productReducer };
