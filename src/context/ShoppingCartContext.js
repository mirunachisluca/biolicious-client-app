import React, { createContext } from 'react';
import UUID from 'react-uuid';
import { axiosInstance } from '../api/axios';
import {
  initialState,
  shoppingCartReducer
} from '../store/shoppingCart/shoppingCartReducer';
import {
  loadCart,
  setCartStatus
} from '../store/shoppingCart/shoppingCartActions';
import { UserContext } from './UserContext';

const ShoppingCartContext = createContext({
  items: []
});

export { ShoppingCartContext };

function ShoppingCartProvider({ children }) {
  const [state, dispatch] = React.useReducer(shoppingCartReducer, initialState);
  const { user } = React.useContext(UserContext);

  function fetchShoppingCart(cartId) {
    dispatch(setCartStatus('LOADING'));

    axiosInstance
      .get(`/shoppingCart/${cartId}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadCart(response.data));
          dispatch(setCartStatus('FETCHED'));
        }
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    let cartId = localStorage.getItem('cartId');

    if (user) {
      cartId = user.cartId;
    } else if (cartId === null) {
      cartId = UUID();
      localStorage.setItem('cartId', cartId);
    }

    fetchShoppingCart(cartId);
  }, [user]);

  React.useEffect(
    function updateCart() {
      if (state.shoppingCartId) {
        const shoppingCart = { id: state.shoppingCartId, items: state.items };
        axiosInstance
          .post('shoppingCart/update/', shoppingCart)
          .then()
          .catch((error) => {
            console.log(error);
          });
      }
    },
    [state.shoppingCartId, state.items]
  );

  function calculateTotal() {
    let total = 0;

    state.items.forEach((item) => {
      total +=
        item.quantity * (item.price - (item.discount * item.price) / 100);
    });

    return total;
  }

  function calculateSavedAmount() {
    let saved = 0;

    state.items.forEach((item) => {
      saved += item.quantity * ((item.discount * item.price) / 100);
    });

    return saved;
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        items: state.items,
        status: state.status,
        fetchShoppingCart,
        dispatch,
        calculateTotal,
        calculateSavedAmount
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export { ShoppingCartProvider };
