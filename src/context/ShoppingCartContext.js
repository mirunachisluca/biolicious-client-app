import React, { createContext } from 'react';
import UUID from 'react-uuid';
import { axiosInstance } from '../api/axios';
import {
  initialState,
  shoppingCartReducer
} from '../store/shoppingCart/shoppingCartReducer';
import { loadCart } from '../store/shoppingCart/shoppingCartActions';

const ShoppingCartContext = createContext({
  items: []
});

export { ShoppingCartContext };

function ShoppingCartProvider({ children }) {
  const [state, dispatch] = React.useReducer(shoppingCartReducer, initialState);

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
            // dispatch({ type: 'LOAD_CART', payload: response.data });

            dispatch(loadCart(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  React.useEffect(
    function updateCart() {
      if (state.shoppingCartId) {
        const shoppingCart = { id: state.shoppingCartId, items: state.items };
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
      }
    },
    [state.shoppingCartId, state.items]
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        items: state.items,
        loadShoppingCart,
        dispatch
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export { ShoppingCartProvider };
