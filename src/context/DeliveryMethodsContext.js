import React from 'react';
import { axiosInstance } from '../api/axios';
import { DELIVERY_METHODS_ROUTE } from '../routes/apiRoutes';

export const DeliveryMethodsContext = React.createContext();

function DeliveryMethodsProvider({ children }) {
  const [deliveryMethods, setDeliveryMethods] = React.useState({
    status: 'PENDING',
    result: null
  });

  function fetchDelveryMethods() {
    setDeliveryMethods({ status: 'LOADING', result: null });
    axiosInstance
      .get(DELIVERY_METHODS_ROUTE)
      .then((response) => {
        if (response.status === 200) {
          setDeliveryMethods({ status: 'FETCHED', result: response.data });
        }
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => fetchDelveryMethods(), []);

  return (
    <DeliveryMethodsContext.Provider
      value={{ deliveryMethods, fetchDelveryMethods }}
    >
      {children}
    </DeliveryMethodsContext.Provider>
  );
}

export { DeliveryMethodsProvider };
