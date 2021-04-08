import React from 'react';
import { axiosInstance } from '../api/axios';
import {
  SET_RECIPES_DATA,
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

  const [diets, setDiets] = React.useState({
    status: 'PENDING',
    data: null
  });

  const [categories, setCategories] = React.useState({
    status: 'PENDING',
    data: null
  });

  React.useEffect(() => {
    axiosInstance
      .get('/diets')
      .then((response) => {
        if (response.status === 200) {
          setDiets({ status: 'FETCHED', data: response.data });
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
          setCategories({ status: 'FETCHED', data: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    let dietsObject = {
      id: 'diets-menu-Id',
      name: 'Diets'
    };

    let categoriesObject = {
      id: 'categories-menu-Id',
      name: 'Categories'
    };

    if (diets.status === 'FETCHED' && categories.status === 'FETCHED') {
      dietsObject = {
        ...dietsObject,
        subcategories: diets.data
      };

      categoriesObject = {
        ...categoriesObject,
        subcategories: diets.data
      };

      const data = [dietsObject, categoriesObject];
      dispatch({ type: SET_RECIPES_DATA, payload: data });
    }
  }, [categories.data, categories.status, diets.data, diets.status]);

  return (
    <MenuBarContext.Provider
      value={{
        activeData: state.activeData,
        shopData: state.shopData,
        recipesData: state.recipesData,
        dispatch
      }}
    >
      {children}
    </MenuBarContext.Provider>
  );
}

export { MenuBarProvider };
