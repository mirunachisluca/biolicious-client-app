import React from 'react';
import { axiosInstance } from '../api/axios';
import { API_PRODUCTS_ROUTE } from '../routes/apiRoutes';

export const ProductsContext = React.createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = React.useState({
    status: 'PENDING',
    result: null
  });

  const [apiParams, setApiParams] = React.useState({
    pageIndex: 1,
    search: ''
  });

  function fetchProducts() {
    setProducts({ state: 'LOADING', result: null });
    axiosInstance
      .get(API_PRODUCTS_ROUTE, { params: apiParams })
      .then((response) => {
        if (response.status === 200) {
          setProducts({ status: 'FETCHED', result: response.data });
        }
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => fetchProducts(), [apiParams]);

  return (
    <ProductsContext.Provider
      value={{ products, fetchProducts, apiParams, setApiParams }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
export { ProductsProvider };
