import React, { createContext } from 'react';
import jwtDecode from 'jwt-decode';

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

    const currentUser = {
      displayName: decodedToken.given_name
    };

    localStorage.setItem('token', token);

    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(currentUser);
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login(token);
    }
  }, [login]);

  const logout = () => {
    localStorage.removeItem('token');
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
