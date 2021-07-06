import React from 'react';
import { axiosInstance } from '../api/axios';
import {
  API_DIETS_ROUTE,
  API_PRODUCT_CATEGORIES_ROUTE,
  API_RECIPE_CATEGORIES_ROUTE
} from '../routes/apiRoutes';
import {
  SET_CATEGORIES_DATA,
  SET_DIETS_DATA,
  SET_SHOP_DATA
} from '../store/menuBar/menuBarActions';
import { initialState, menuBarReducer } from '../store/menuBar/menuBarReducer';

const MenuBarContext = React.createContext();

export { MenuBarContext };

function MenuBarProvider({ children }) {
  const [state, dispatch] = React.useReducer(menuBarReducer, initialState);
  const [productCategoriesSort, setProductCategoriesSort] = React.useState('');

  function fetchProductCategories() {
    axiosInstance
      .get(API_PRODUCT_CATEGORIES_ROUTE, {
        params: { sort: productCategoriesSort }
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: SET_SHOP_DATA, payload: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchRecipeDiets() {
    axiosInstance
      .get(API_DIETS_ROUTE)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: SET_DIETS_DATA, payload: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchRecipeCategories() {
    axiosInstance
      .get(API_RECIPE_CATEGORIES_ROUTE)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: SET_CATEGORIES_DATA, payload: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => fetchProductCategories(), [productCategoriesSort]);

  React.useEffect(() => fetchRecipeDiets(), []);

  React.useEffect(() => fetchRecipeCategories(), []);

  return (
    <MenuBarContext.Provider
      value={{
        activeData: state.activeData,
        shopData: state.shopData,
        diets: state.diets,
        categories: state.categories,
        dispatch,
        fetchProductCategories,
        fetchRecipeDiets,
        fetchRecipeCategories,
        setProductCategoriesSort
      }}
    >
      {children}
    </MenuBarContext.Provider>
  );
}

export { MenuBarProvider };
