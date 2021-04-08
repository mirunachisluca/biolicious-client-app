import React, { createContext } from 'react';
import UUID from 'react-uuid';
import { axiosInstance } from '../api/axios';
import {
  initialState,
  shoppingCartReducer
} from '../store/shoppingCart/shoppingCartReducer';
import { loadCart } from '../store/shoppingCart/shoppingCartActions';
import { UserContext } from './UserContext';

const ShoppingCartContext = createContext({
  items: []
});

export { ShoppingCartContext };

function ShoppingCartProvider({ children }) {
  const [state, dispatch] = React.useReducer(shoppingCartReducer, initialState);
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    let cartId = localStorage.getItem('cartId');

    if (user) {
      cartId = user.cartId;
    } else if (cartId === null) {
      cartId = UUID();
      localStorage.setItem('cartId', cartId);
    }

    axiosInstance
      .get(`/shoppingCart/${cartId}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadCart(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

  return (
    <ShoppingCartContext.Provider
      value={{
        items: state.items,
        dispatch
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export { ShoppingCartProvider };
