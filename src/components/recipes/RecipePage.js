import React from 'react';
import { Button } from 'react-bootstrap';
import ImageFadeIn from 'react-image-fade-in';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { axiosInstance } from '../../api/axios';
import { API_RECIPES_ROUTE } from '../../routes/apiRoutes';
import { IngredientsCard } from './IngredientsCard';
import { RecipeItemsSummary } from './RecipeItemsSummary';

import styles from './RecipePage.module.scss';

function RecipePage() {
  const { name } = useParams();

  const [recipe, setRecipe] = React.useState({
    status: 'PENDING',
    result: null
  });

  const [show, setShow] = React.useState(false);

  React.useEffect(
    function fetchRecipe() {
      axiosInstance
        .get(`${API_RECIPES_ROUTE}/byName`, { params: { urlName: name } })
        .then((response) => {
          if (response.status === 200) {
            setRecipe({ status: 'FETCHED', result: response.data });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [name]
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {recipe.status === 'FETCHED' && (
        <>
          <div className={styles.recipePage}>
            <h3>{recipe.result.name}</h3>
            <br />

            <div className={styles.pictureWithDescription}>
              <ImageFadeIn
                src={recipe.result.pictureUrl}
                alt="recipe"
                width="100%"
                className={styles.recipePicture}
                opacityTransition={3}
              />

              <div className={styles.recipeDescription}>
                <p>{recipe.result.description}</p>

                <p>{`Serving size ${recipe.result.servingSize} people`}</p>
                <p>{`Preparation time ${recipe.result.preparationTime}`}</p>
                <p>{`Category ${recipe.result.recipeCategory}`}</p>
                <p>{`Energy ${recipe.result.intake.energyKJ}kj/${recipe.result.intake.energyKCAL}kcal`}</p>
                <p>{`Fat ${recipe.result.intake.fat}g`}</p>
                <p>{`Saturates ${recipe.result.intake.saturates}g`}</p>
                <p>{`Sugars ${recipe.result.intake.sugars}g`}</p>
                <p>{`Salt ${recipe.result.intake.salt}g`}</p>
                <p>{`Carbs ${recipe.result.intake.carbohydrates}g Proteins ${recipe.result.intake.proteins}g Fibres  ${recipe.result.intake.fibres}g`}</p>

                <Button variant="outline-black" onClick={handleShow}>
                  Shop ingredients
                </Button>
              </div>
            </div>

            <br />

            <div className={styles.ingredientsAndSteps}>
              <div>
                <h3>Steps</h3>
                <br />
                <ol>
                  {recipe.result.recipeSteps.map((step) => (
                    <li key={step}>
                      <p key={step} className={styles.recipeStep}>
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <IngredientsCard ingredientsList={recipe.result.ingredients} />
              </div>
            </div>
          </div>

          <RecipeItemsSummary
            show={show}
            handleClose={handleClose}
            items={recipe.result.ingredients}
          />
        </>
      )}

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export { RecipePage };
