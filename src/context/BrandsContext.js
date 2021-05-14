import React from 'react';
import { axiosInstance } from '../api/axios';
import { API_PRODUCT_BRANDS_ROUTE } from '../routes/apiRoutes';

export const BrandsContext = React.createContext();

function BrandsProvider({ children }) {
  const [brands, setBrands] = React.useState({
    status: 'PENDING',
    result: null
  });
  const [sortValue, setSortValue] = React.useState('nameAsc');

  function fetchBrands() {
    axiosInstance
      .get(API_PRODUCT_BRANDS_ROUTE, { params: { sort: sortValue } })
      .then((response) => {
        if (response.status === 200) {
          setBrands({ status: 'FETCHED', result: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => fetchBrands(), [sortValue]);

  return (
    <BrandsContext.Provider value={{ brands, fetchBrands, setSortValue }}>
      {children}
    </BrandsContext.Provider>
  );
}

export { BrandsProvider };
