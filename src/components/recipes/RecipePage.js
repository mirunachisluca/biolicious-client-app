import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { ClockFill, PeopleFill } from 'react-bootstrap-icons';
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
      setRecipe({ status: 'LOADING', result: null });
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
      {recipe.status === 'LOADING' && (
        <>
          <br />
          <br />
          <br />
          <br />
          <Spinner animation="border" />
        </>
      )}

      {recipe.status === 'FETCHED' && (
        <>
          <div className={styles.recipePage}>
            <br />

            <div className={styles.pictureWithDescription}>
              <ImageFadeIn
                src={recipe.result.pictureUrl}
                alt="recipe"
                width="80%"
                className={styles.recipePicture}
                opacityTransition={3}
              />

              <div className={styles.recipeDescription}>
                <h3 className="uppercase-bembo text-center">
                  {recipe.result.name}
                </h3>
                <p className="font-italic text-center">{`Category: ${recipe.result.recipeCategory}`}</p>

                <p>{recipe.result.description}</p>

                <div className="text-center">
                  <p>
                    <PeopleFill className={styles.icon} />
                    {` ${recipe.result.servingSize} ${
                      recipe.result.servingSize === 1 ? 'person' : 'people'
                    }`}
                  </p>

                  <p>
                    <ClockFill className={styles.icon} />
                    {` ${recipe.result.preparationTime}`}
                  </p>
                </div>

                <ul className={styles.nutritionWrapper}>
                  <li className={styles.nutritionItem}>
                    <h4 className={styles.nutritionSubheading}>Energy</h4>
                    <span
                      className={`${styles.nutritionValue}  ${styles.nutritionValueSmall}`}
                    >
                      {`${recipe.result.intake.energyKJ}kj`}
                      <br />
                      <span>{`${recipe.result.intake.energyKCAL}kcal`}</span>
                    </span>
                  </li>

                  <li
                    className={`${styles.nutritionItem} ${styles.nutritionItemMedium}`}
                  >
                    <h4 className={styles.nutritionSubheading}>Fat</h4>
                    <span className={`${styles.nutritionValue}`}>
                      <span>{`${recipe.result.intake.fat}g`}</span>
                    </span>
                  </li>

                  <li
                    className={`${styles.nutritionItem} ${styles.nutritionItemMedium}`}
                  >
                    <h4 className={styles.nutritionSubheading}>Saturates</h4>
                    <span className={`${styles.nutritionValue}`}>
                      <span>{`${recipe.result.intake.saturates}g`}</span>
                    </span>
                  </li>

                  <li
                    className={`${styles.nutritionItem} ${styles.nutritionItemMedium}`}
                  >
                    <h4 className={styles.nutritionSubheading}>Sugars</h4>
                    <span className={`${styles.nutritionValue}`}>
                      <span>{`${recipe.result.intake.sugars}g`}</span>
                    </span>
                  </li>

                  <li
                    className={`${styles.nutritionItem} ${styles.nutritionItemMedium}`}
                  >
                    <h4 className={styles.nutritionSubheading}>Salt</h4>
                    <span className={`${styles.nutritionValue}`}>
                      <span>{`${recipe.result.intake.salt}g`}</span>
                    </span>
                  </li>
                </ul>

                <p className="text-center">
                  Carbs
                  <span>{` ${recipe.result.intake.carbohydrates}g `}</span>
                  Proteins
                  <span>{` ${recipe.result.intake.proteins}g `}</span>
                  Fibres
                  <span>{` ${recipe.result.intake.fibres}g`}</span>
                </p>

                <div className="m-auto">
                  <Button
                    variant="outline-black"
                    className={styles.button}
                    onClick={handleShow}
                  >
                    Shop ingredients
                  </Button>
                </div>
              </div>
            </div>

            <br />

            <div className={styles.ingredientsAndSteps}>
              <div>
                <h3>Steps</h3>
                <br />
                <ol>
                  {recipe.result.recipeSteps.map((step) => (
                    <li key={step.id}>
                      <p key={step.id} className={styles.recipeStep}>
                        {step.step}
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

export { RecipePage };
