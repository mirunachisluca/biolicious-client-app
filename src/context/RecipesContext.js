import React from 'react';
import { axiosInstance } from '../api/axios';
import { API_RECIPES_ROUTE } from '../routes/apiRoutes';

export const RecipesContext = React.createContext();

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = React.useState({
    status: 'PENDING',
    result: null
  });
  const [apiParams, setApiParams] = React.useState({
    pageIndex: 1,
    search: ''
  });

  function fetchRecipes() {
    setRecipes({ status: 'LOADING', result: null });

    axiosInstance
      .get(API_RECIPES_ROUTE, { params: apiParams })
      .then((response) => {
        if (response.status === 200) {
          setRecipes({ status: 'FETCHED', result: response.data });
        }
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => fetchRecipes(), [apiParams]);

  return (
    <RecipesContext.Provider
      value={{ recipes, fetchRecipes, apiParams, setApiParams }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

export { RecipesProvider };
