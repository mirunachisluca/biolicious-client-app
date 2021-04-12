import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { axiosInstance } from '../api/axios';

import { FilterCard } from '../components/filters/FilterCard';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { MenuBarContext } from '../context/MenuBarContext';
import { convertToUrl } from '../helpers/convertToUrl';
import { createNameIdMap } from '../helpers/createNameIdMap';
import { getUrlSerachParams } from '../helpers/getUrlSearchParams';
import { parseQueryString } from '../helpers/parseQueryString';
import {
  DELETE_CATEGORY_FILTER,
  DELETE_DIET_FILTER,
  FETCH_RECIPES,
  FILTER_BY_CATEGORY,
  FILTER_BY_DIET,
  RESET_URL
} from '../store/recipes/recipesListActions';
import {
  initialState,
  recipesListReducer
} from '../store/recipes/recipesListReducer';

import styles from './css/RecipesPage.module.scss';

const apiUrl = '/recipes';

function RecipesPage() {
  const { diets, categories } = React.useContext(MenuBarContext);
  const [state, dispatch] = React.useReducer(recipesListReducer, initialState);
  const history = useHistory();

  const queryString = useLocation().search;

  const mappedCategories = React.useMemo(
    () => createNameIdMap(categories.data),
    [categories.data]
  );

  const mappedDiets = React.useMemo(() => createNameIdMap(diets.data), [
    diets.data
  ]);

  React.useEffect(
    function fetchRecipes() {
      axiosInstance
        .get(apiUrl, {
          params: {
            dietId: state.apiParams.dietId,
            categoryId: state.apiParams.categoryId
          }
        })
        .then((response) => {
          if (response.status === 200) {
            dispatch({ type: FETCH_RECIPES, payload: response.data });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [state.apiParams.dietId, state.apiParams.categoryId]
  );

  React.useEffect(
    function queryParamsHandler() {
      const queryParams = parseQueryString(queryString);

      if (queryString === '') {
        dispatch({ type: RESET_URL });
      } else {
        if (queryParams.category) {
          dispatch({
            type: FILTER_BY_CATEGORY,
            payload: {
              categoryId: mappedCategories[queryParams.category],
              categoryName: queryParams.category
            }
          });
        }

        if (queryParams.diet) {
          dispatch({
            type: FILTER_BY_DIET,
            payload: {
              dietId: mappedDiets[queryParams.diet],
              dietName: queryParams.diet
            }
          });
        }
      }
    },
    [queryString, mappedCategories, mappedDiets]
  );

  const categoryHandler = (categoryId, categoryName) => {
    const newUrlParams = { ...state.urlParams };

    newUrlParams.category = convertToUrl(categoryName);

    dispatch({
      type: FILTER_BY_CATEGORY,
      payload: { categoryId, categoryName: convertToUrl(categoryName) }
    });

    const urlSearchParams = getUrlSerachParams(newUrlParams);

    history.replace({ search: urlSearchParams.toString() });
  };

  const dietHandler = (dietId, dietName) => {
    const newUrlParams = { ...state.urlParams };

    newUrlParams.diet = convertToUrl(dietName);

    dispatch({
      type: FILTER_BY_DIET,
      payload: { dietId, dietName: convertToUrl(dietName) }
    });

    const urlSearchParams = getUrlSerachParams(newUrlParams);

    history.replace({ search: urlSearchParams.toString() });
  };

  const clearCategoryHandler = () => {
    const newUrlParams = { ...state.urlParams };

    newUrlParams.category = '';

    dispatch({ type: DELETE_CATEGORY_FILTER });

    const urlSearchParams = getUrlSerachParams(newUrlParams);

    history.replace({ search: urlSearchParams.toString() });
  };

  const clearDietHandler = () => {
    const newUrlParams = { ...state.urlParams };

    newUrlParams.diet = '';

    dispatch({ type: DELETE_DIET_FILTER });

    const urlSearchParams = getUrlSerachParams(newUrlParams);

    history.replace({ search: urlSearchParams.toString() });
  };

  return (
    <>
      <br />
      <h3 className="uppercase-bembo">Recipes</h3>
      <br />

      {/* <div className={styles.dietButtonsDiv}>
        {diets.status === 'FETCHED' &&
          diets.data.map((diet) => (
            <LinkContainer
              key={diet.id}
              to={`${DIETS_PAGE_ROUTE}/${convertToUrl(diet.name)}`}
            >
              <Button key={`diet-${diet.id}`} className={styles.button}>
                {diet.name}
              </Button>
            </LinkContainer>
          ))}
      </div>

      <h3 className="uppercase-bembo">Categories</h3>

      <div className={styles.categoryButtonsDiv}>
        {categories.status === 'FETCHED' &&
          categories.data.map((category) => (
            <LinkContainer
              key={category.id}
              to={`${CATEGORIES_PAGE_ROUTE}/${convertToUrl(category.name)}`}
            >
              <Button key={`category-${category.id}`} className={styles.button}>
                {category.name}
              </Button>
            </LinkContainer>
          ))}
      </div> */}

      <div className={styles.flexbox}>
        <div className={styles.filtersDiv}>
          <div className={styles.fixed}>
            <h5 className="uppercase-bembo">filter by:</h5>

            {categories.status === 'FETCHED' && (
              <FilterCard
                filterName="categories"
                data={categories.data}
                dataHandler={categoryHandler}
                activeButton={state.apiParams.categoryId}
                clearHandler={clearCategoryHandler}
              />
            )}

            {diets.status === 'FETCHED' && (
              <FilterCard
                filterName="diets"
                data={diets.data}
                dataHandler={dietHandler}
                activeButton={state.apiParams.dietId}
                clearHandler={clearDietHandler}
              />
            )}
          </div>
        </div>

        <div className={styles.recipesDiv}>
          <ol className={styles.list}>
            {state.recipes.status === 'FETCHED' &&
              state.recipes.results.map((recipe) => (
                <li key={recipe.id}>
                  <RecipeCard
                    key={recipe.id}
                    name={recipe.name}
                    description={recipe.description}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export { RecipesPage };
