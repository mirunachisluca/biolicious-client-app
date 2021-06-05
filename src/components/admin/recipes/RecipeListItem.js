import React from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import ImageFadeIn from 'react-image-fade-in';
import { toast } from 'react-toastify';

import { axiosInstance } from '../../../api/axios';
import { MenuBarContext } from '../../../context/MenuBarContext';
import { RecipesContext } from '../../../context/RecipesContext';
import { useActionModals } from '../../../customHooks/useActionModals';
import { API_RECIPES_ROUTE } from '../../../routes/apiRoutes';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { RecipeModal } from './RecipeModal';

import styles from './RecipeListItem.module.scss';

const mapRecipe = (recipe) => {
  const ingredients = recipe.ingredients.map((ingredient) => ({
    id: ingredient.id,
    productId: ingredient.productId,
    quantity: ingredient.quantity,
    measure: ingredient.measure,
    name: ingredient.productName
  }));

  return {
    id: recipe.id,
    name: recipe.name,
    description: recipe.description,
    pictureUrl: recipe.pictureUrl,
    preparationTime: recipe.preparationTime,
    servingSize: recipe.servingSize,
    steps: recipe.recipeSteps,
    ingredients,
    recipeCategory: {
      id: recipe.recipeCategoryId,
      name: recipe.recipeCategory
    },
    diet: { id: recipe.dietId, name: recipe.diet },
    intake: recipe.intake,
    key: 1
  };
};

function RecipeListItem({ recipe }) {
  const {
    displayEditModal,
    displayConfirmationModal,
    displayEditModalHandler,
    displayConfirmationModalHandler,
    hideEditModalHandler,
    hideConfirmationModalHandler
  } = useActionModals();

  const { fetchRecipes } = React.useContext(RecipesContext);

  const { diets, categories } = React.useContext(MenuBarContext);

  const deleteRecipe = () => {
    axiosInstance
      .delete(`${API_RECIPES_ROUTE}/${recipe.id}`)
      .then(() => {
        fetchRecipes();
        toast.dark('Item deleted successfully');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong. Please try again');
      });
  };

  return (
    <>
      <Card className="m-1 shadow">
        <div className={styles.cardGrid}>
          <ImageFadeIn
            src={recipe.pictureUrl}
            width="100%"
            opacityTransition={2}
          />

          <Card.Body>
            <div className={styles.cardBodyGrid}>
              <div>
                <p className="font-weight-bold">{recipe.name}</p>
                <p className="font-italic mb-0">{`${recipe.recipeCategory} • ${recipe.diet}`}</p>
              </div>
              <div>
                <ButtonGroup vertical>
                  <Button
                    variant="no-margin"
                    onClick={() => displayEditModalHandler()}
                  >
                    <PencilSquare />
                  </Button>

                  <Button
                    variant="no-margin"
                    onClick={() => displayConfirmationModalHandler()}
                  >
                    <Trash />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </Card.Body>
        </div>
      </Card>

      <RecipeModal
        key={recipe.id}
        recipe={mapRecipe(recipe)}
        show={displayEditModal}
        close={hideEditModalHandler}
        diets={diets}
        categories={categories}
      />

      <ConfirmationModal
        show={displayConfirmationModal}
        close={hideConfirmationModalHandler}
        yesActionHandler={deleteRecipe}
        noActionHandler={hideConfirmationModalHandler}
      />
    </>
  );
}

export { RecipeListItem };
