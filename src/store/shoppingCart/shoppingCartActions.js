export const LOAD_CART = 'LOAD_CART';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';
export const SET_CART_STATUS = 'SET_CART_STATUS';
export const SET_DELIVERY_METHOD = 'SET_DELIVERY_METHOD';

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

export const setCartStatus = (status) => ({
  type: SET_CART_STATUS,
  payload: status
});

export const setDeliveryMethod = (id) => ({
  type: SET_DELIVERY_METHOD,
  payload: id
});
