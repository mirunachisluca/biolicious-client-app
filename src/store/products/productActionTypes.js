export const RESET_PRODUCT = 'RESET_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_PRODUCT_NAME = 'SET_PRODUCT_NAME';
export const SET_PRODUCT_DESCRIPTION = 'SET_PRODUCT_DESCRIPTION';
export const SET_PRODUCT_WEIGHT = 'SET_PRODUCT_WEIGHT';
export const SET_PRODUCT_PICTURE_URL = 'SET_PRODUCT_PICTURE_URL';
export const SET_PRODUCT_PICTURE = 'SET_PRODUCT_PICTURE';
export const SET_PRODUCT_PRICE = 'SET_PRODUCT_PRICE';
export const SET_PRODUCT_DISCOUNT = 'SET_PRODUCT_DISCOUNT';
export const SET_PRODUCT_BRAND_ID = 'SET_PRODUCT_WBRAND_ID';
export const SET_PRODUCT_CATEGORY_ID = 'SET_PRODUCT_CATEGORY_ID';
export const SET_PRODUCT_SUBCATEGORY_ID = 'SET_PRODUCT_SUBCATEGORY_ID';
export const SET_PRODUCT_ENTRY_STATUS = 'SET_PRODUCT_ENTRY_STATUS';
export const SET_PRODUCT_STOCK = 'SET_PRODUCT_STOCK';

export const setProductBrandId = (id) => ({
  type: SET_PRODUCT_BRAND_ID,
  payload: parseInt(id, 10)
});

export const setProductCategoryId = (id) => ({
  type: SET_PRODUCT_CATEGORY_ID,
  payload: id
});

export const setProductSubcategoryId = (id) => {
  if (id !== null) {
    return {
      type: SET_PRODUCT_SUBCATEGORY_ID,
      payload: parseInt(id, 10)
    };
  }
  return {
    type: SET_PRODUCT_SUBCATEGORY_ID,
    payload: null
  };
};

export const setProductName = (name) => ({
  type: SET_PRODUCT_NAME,
  payload: name
});

export const setProductDescription = (description) => ({
  type: SET_PRODUCT_DESCRIPTION,
  payload: description
});

export const setProductWeight = (weight) => ({
  type: SET_PRODUCT_WEIGHT,
  payload: weight
});

export const setProductPrice = (price) => ({
  type: SET_PRODUCT_PRICE,
  payload: parseFloat(price)
});

export const setProductDiscount = (discount) => ({
  type: SET_PRODUCT_DISCOUNT,
  payload: parseInt(discount, 10)
});

export const setProductStock = (stock) => ({
  type: SET_PRODUCT_STOCK,
  payload: parseInt(stock, 10)
});

export const setProductEntryStatus = (status) => ({
  type: SET_PRODUCT_ENTRY_STATUS,
  payload: status
});

export const setProductPicture = (url, image) => ({
  type: SET_PRODUCT_PICTURE_URL,
  payload: { url, image }
});

export const resetProduct = { type: RESET_PRODUCT };
