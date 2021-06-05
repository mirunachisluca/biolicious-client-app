import React, { createContext } from 'react';
import UUID from 'react-uuid';
import { axiosInstance } from '../api/axios';
import {
  initialState,
  shoppingCartReducer
} from '../store/shoppingCart/shoppingCartReducer';
import {
  loadCart,
  setCartStatus,
  setDeliveryMethod
} from '../store/shoppingCart/shoppingCartActions';
import { UserContext } from './UserContext';
import { API_ORDERS_ROUTE, API_SHOPPING_CART } from '../routes/apiRoutes';

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
      .get(`${API_SHOPPING_CART}/${cartId}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadCart(response.data));
          dispatch(setCartStatus('FETCHED'));
        }
      })
      .catch((error) => console.log(error));
  }

  function deleteShoppingCart() {
    axiosInstance
      .delete(`${API_SHOPPING_CART}/${localStorage.getItem('cartId')}`)
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
        const shoppingCart = {
          id: state.shoppingCartId,
          items: state.items,
          deliveryMethodId: state.deliveryMethodId,
          clientSecret: state.clientSecret,
          paymentIntentId: state.paymentIntentId
        };
        axiosInstance
          .post('shoppingCart/update/', shoppingCart)
          .then()
          .catch((error) => {
            console.log(error);
          });
      }
    },
    [
      state.shoppingCartId,
      state.items,
      state.deliveryMethodId,
      state.clientSecret,
      state.paymentIntentId
    ]
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

  const setCartDeliveryMethodId = (id) => dispatch(setDeliveryMethod(id));

  return (
    <ShoppingCartContext.Provider
      value={{
        items: state.items,
        status: state.status,
        fetchShoppingCart,
        dispatch,
        calculateTotal,
        calculateSavedAmount,
        setCartDeliveryMethodId,
        deliveryMethodId: state.deliveryMethodId,
        deleteShoppingCart
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export { ShoppingCartProvider };
