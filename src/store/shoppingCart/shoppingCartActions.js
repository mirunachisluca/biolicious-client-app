//*  actions
export const LOAD_CART = 'LOAD_CART';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

//* actions creators

export const loadCart = (shoppingCart) => ({
  type: LOAD_CART,
  payload: shoppingCart
});

export const addItemToCart = (item) => ({
  type: ADD_ITEM,
  payload: item
});

export const removeItem = (itemId) => ({ type: REMOVE_ITEM, payload: itemId });

export const updateQuantity = (itemId, quantity) => ({
  type: UPDATE_ITEM_QUANTITY,
  payload: { itemId, quantity }
});
