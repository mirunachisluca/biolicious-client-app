import React from 'react';
import { axiosInstance } from '../api/axios';
import {
  SET_CATEGORIES_DATA,
  SET_DIETS_DATA,
  SET_SHOP_DATA
} from '../store/menuBar/menuBarActionTypes';
import { initialState, menuBarReducer } from '../store/menuBar/menuBarReducer';

const MenuBarContext = React.createContext();

export { MenuBarContext };

function MenuBarProvider({ children }) {
  const [state, dispatch] = React.useReducer(menuBarReducer, initialState);

  React.useEffect(() => {
    axiosInstance
      .get('/productCategories')
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: SET_SHOP_DATA, payload: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    axiosInstance
      .get('/diets')
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: SET_DIETS_DATA, payload: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    axiosInstance
      .get('/recipeCategories')
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: SET_CATEGORIES_DATA, payload: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MenuBarContext.Provider
      value={{
        activeData: state.activeData,
        shopData: state.shopData,
        diets: state.diets,
        categories: state.categories,
        dispatch
      }}
    >
      {children}
    </MenuBarContext.Provider>
  );
}

export { MenuBarProvider };
