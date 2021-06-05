import React from 'react';
import { Button, ButtonGroup, Form, Spinner } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { ToastContainer } from 'react-toastify';
import { MenuBarContext } from '../../../context/MenuBarContext';
import { RecipesContext } from '../../../context/RecipesContext';
import {
  closeCategoriesModal,
  closeDietsModal,
  closeRecipeModal,
  showCategoriesModal,
  showDietsModal,
  showRecipeModal
} from '../../../store/admin/recipesTabActions';
import {
  initialState,
  recipesTabReducer
} from '../../../store/admin/recipesTabReducer';
import { initialRecipe } from '../../../store/recipes/recipeReducer';
import { Pagination } from '../../pagination/Pagination';
import { CategoriesModal } from './CategoriesModal';
import { DietsModal } from './DietsModal';
import { RecipeListItem } from './RecipeListItem';
import { RecipeModal } from './RecipeModal';

import styles from './RecipesTab.module.scss';

function RecipesTab() {
  const [state, dispatch] = React.useReducer(recipesTabReducer, initialState);

  const { recipes, apiParams, setApiParams } = React.useContext(RecipesContext);
  const { diets, categories, fetchRecipeDiets, fetchRecipeCategories } =
    React.useContext(MenuBarContext);

  const [searchInput, setSearchInput] = React.useState('');

  const searchHandler = (e) => {
    e.preventDefault();
    setApiParams({ ...apiParams, search: searchInput });
  };

  const pageHandler = (pageIndex) => {
    setApiParams({ ...apiParams, pageIndex });
  };

  const showDietsModalHandler = () => dispatch(showDietsModal);
  const hideDietsModalHandler = () => dispatch(closeDietsModal);

  const showCategoriesModalHandler = () => dispatch(showCategoriesModal);
  const hideCategoriesModalHandler = () => dispatch(closeCategoriesModal);

  return (
    <>
      <br />

      <ButtonGroup>
        <Button
          variant="outline-black"
          onClick={() => dispatch(showRecipeModal)}
        >
          Add Recipe
        </Button>

        <Button
          variant="outline-black"
          onClick={() => dispatch(showDietsModal)}
        >
          Edit Diets
        </Button>

        <Button
          variant="outline-black"
          onClick={() => dispatch(showCategoriesModal)}
        >
          Edit Categories
        </Button>
      </ButtonGroup>

      <br />
      <br />

      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onClick={() => setSearchInput('')}
          />

          <Button type="submit" variant="no-margin" onClick={searchHandler}>
            <Search />
          </Button>
        </Form.Group>
      </Form>

      {recipes.status === 'FETCHED' ? (
        <div className="flexbox-column">
          <Pagination
            pageSize={recipes.result.pageSize}
            totalProducts={recipes.result.count}
            pageNumberHandler={pageHandler}
            pageIndex={recipes.result.pageIndex}
          />

          {recipes.result.data.length === 0 && (
            <p>No results matched your search</p>
          )}

          <ul className={`${styles.recipesGrid} no-list-style`}>
            {recipes.result.data.map((recipe) => (
              <li key={recipe.id}>
                <RecipeListItem recipe={recipe} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <Spinner animation="border" />
        </>
      )}

      <RecipeModal
        recipe={initialRecipe}
        show={state.showRecipeModal}
        close={() => dispatch(closeRecipeModal)}
        diets={diets}
        fetchRecipeDiets={fetchRecipeDiets}
        categories={categories}
        fetchRecipeCategories={fetchRecipeCategories}
      />

      <DietsModal
        visible={state.showDietsModal}
        show={showDietsModalHandler}
        close={hideDietsModalHandler}
        diets={diets}
        fetchRecipeDiets={fetchRecipeDiets}
      />

      <CategoriesModal
        visible={state.showCategoriesModal}
        show={showCategoriesModalHandler}
        close={hideCategoriesModalHandler}
        categories={categories}
        fetchRecipeCategories={fetchRecipeCategories}
      />

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export { RecipesTab };
