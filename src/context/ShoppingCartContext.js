import React, { createContext } from 'react';
import UUID from 'react-uuid';
import { axiosInstance } from '../api/axios';

import { initialState, shoppingCartReducer } from './ShoppingCartReducer';

const ShoppingCartContext = createContext({
  items: [],
  loadShoppingCart: () => {},
  addItemToCart: () => {},
  removeItem: () => {}
});

export { ShoppingCartContext };

function ShoppingCartProvider({ children }) {
  const [state, dispatch] = React.useReducer(shoppingCartReducer, initialState);
  const items = React.useMemo(() => state.items, [state.items]);

  const loadShoppingCart = React.useCallback(() => {
    let shoppingCartId = localStorage.getItem('cartId');

    if (shoppingCartId === null) {
      shoppingCartId = UUID();
      localStorage.setItem('cartId', shoppingCartId);
    } else {
      axiosInstance
        .get(`/shoppingCart/${shoppingCartId}`)
        .then((response) => {
          if (response.status === 200) {
            dispatch({ type: 'LOAD_CART', payload: response.data });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  React.useEffect(
    function updateCart() {
      const shoppingCart = { id: state.shoppingCartId, items };
      axiosInstance
        .post('shoppingCart/update/', shoppingCart)
        .then((response) => {
          if (response.status === 200) {
            console.log('item added to cart');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [state.shoppingCartId, items]
  );

  function addItemToCart(item) {
    dispatch({ type: 'ADD_ITEM', payload: item });
    console.log(item);
  }

  function removeItem(item) {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        items: state.items,
        loadShoppingCart,
        addItemToCart,
        removeItem
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export { ShoppingCartProvider };
