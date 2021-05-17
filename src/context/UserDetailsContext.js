import React from 'react';
import { axiosInstance } from '../api/axios';
import { GET_USER_DETAILS_ROUTE } from '../routes/apiRoutes';
import { UserContext } from './UserContext';

export const UserDetailsContext = React.createContext();

function UserDetailsProvider({ children }) {
  const [userDetails, setUserDetails] = React.useState({
    status: 'IDLE',
    result: null
  });

  const { user } = React.useContext(UserContext);

  function fetchUserDetails() {
    if (user) {
      setUserDetails({ status: 'LOADING', result: null });
      axiosInstance
        .get(GET_USER_DETAILS_ROUTE)
        .then((response) => {
          if (response.status === 200) {
            setUserDetails({ status: 'FETCHED', result: response.data });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setUserDetails({ status: 'IDLE', result: null });
    }
  }

  React.useEffect(() => fetchUserDetails(), [user]);

  return (
    <UserDetailsContext.Provider value={{ userDetails, fetchUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export { UserDetailsProvider };
