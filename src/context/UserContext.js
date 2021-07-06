import React, { createContext } from 'react';
import jwtDecode from 'jwt-decode';
import UUID from 'react-uuid';

import { axiosInstance } from '../api/axios';

const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
});
export { UserContext };

function UserProvider({ children }) {
  const [user, setUser] = React.useState(null);

  const login = React.useCallback((token) => {
    const decodedToken = jwtDecode(token);

    localStorage.setItem('token', token);

    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

    let cartId = 0;
    axiosInstance
      .get('/shoppingCart/cartId', {
        params: { userEmail: decodedToken.email }
      })
      .then((response) => {
        if (response.status === 200) {
          cartId = response.data;
        } else if (response.status === 204) {
          cartId = UUID();

          axiosInstance
            .post(
              `/shoppingcart/updateCartId?userEmail=${decodedToken.email}&cartId=${cartId}`
            )
            .then((newResponse) => {
              if (newResponse.status === 200) {
                console.log('AM SETAT CART ID');
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        localStorage.setItem('cartId', cartId);

        const currentUser = {
          displayName: decodedToken.given_name,
          cartId,
          role: decodedToken.role
        };

        setUser(currentUser);
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const today = new Date();
      if (decodedToken.exp * 1000 < today.getTime()) {
        localStorage.removeItem('token');
      } else login(token);
    }
  }, [login]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cartId');
    setUser(null);

    delete axiosInstance.defaults.headers.Authorization;
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
