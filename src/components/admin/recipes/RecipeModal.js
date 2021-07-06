/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Dropdown
} from 'react-bootstrap';

import { Trash } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../api/axios';
import { RecipesContext } from '../../../context/RecipesContext';
import { API_RECIPES_ROUTE, RECIPE_STEPS } from '../../../routes/apiRoutes';
import {
  addIngredient,
  addStep,
  deleteStep,
  resetRecipe,
  setCarbs,
  setEnergyKCal,
  setEnergyKJ,
  setFat,
  setFibres,
  setIngredient,
  setIngredientSearch,
  setProteins,
  setRecipeCategory,
  setRecipeDescription,
  setRecipeDiet,
  setRecipeName,
  setRecipePicture,
  setRecipePreparationTime,
  setSalt,
  setSaturates,
  setServingSize,
  setStep,
  setSugars
} from '../../../store/recipes/recipeActions';
import { recipeReducer } from '../../../store/recipes/recipeReducer';
import { IngredientInput } from './IngredientInput';

import styles from './RecipeModal.module.scss';

function toFormData(obj, form, namespace) {
  const fd = form || new FormData();
  let formKey;

  for (const property in obj) {
    if (
      obj.hasOwnProperty(property) &&
      obj[property] != null &&
      obj[property] !== undefined
    ) {
      if (namespace) {
        formKey = `${namespace}[${property}]`;
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File, use recursivity.
      if (obj[property] instanceof Date) {
        fd.append(formKey, obj[property].toISOString());
      } else if (
        typeof obj[property] === 'object' &&
        !(obj[property] instanceof File)
      ) {
        toFormData(obj[property], fd, formKey);
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
}

function mapRecipe(recipe) {
  const ingredients = recipe.ingredients.map((ingredient) => {
    if (ingredient.id === undefined) {
      return {
        productId: ingredient.productId,
        quantity: ingredient.quantity,
        measure: ingredient.measure
      };
    }

    return {
      id: ingredient.id,
      productId: ingredient.productId,
      quantity: ingredient.quantity,
      measure: ingredient.measure
    };
  });

  const steps = recipe.steps.map((step) => {
    if (step.id === undefined) {
      return { step: step.step };
    }

    return { id: step.id, step: step.step };
  });

  return {
    id: recipe.id,
    name: recipe.name,
    description: recipe.description,
    pictureUrl: recipe.pictureUrl.substring(24, recipe.pictureUrl.lentgh),
    preparationTime: recipe.preparationTime,
    servingSize: recipe.servingSize,
    recipeSteps: steps,
    ingredients,
    recipeCategoryId: recipe.recipeCategory.id,
    dietId: recipe.diet.id,
    intake: recipe.intake,
    imageFile: recipe.imageFile
  };
}

function RecipeModal({ recipe, show, close, diets, categories }) {
  const [state, dispatch] = React.useReducer(recipeReducer, recipe);

  const { fetchRecipes } = React.useContext(RecipesContext);

  const saveHandler = (e) => {
    e.preventDefault();

    if (state.id === 0) {
      axiosInstance
        .post(API_RECIPES_ROUTE, toFormData(mapRecipe(state)))
        .then((response) => {
          if (response.status === 201) {
            dispatch(resetRecipe());
            fetchRecipes();

            toast.dark('Recipe added successfully!');
          }
        })
        .catch(() => {
          toast.error('Something went wrong, please try again later');
        });
    } else {
      axiosInstance
        .put(API_RECIPES_ROUTE, toFormData(mapRecipe(state)))
        .then((response) => {
          if (response.status === 204) {
            fetchRecipes();
            close();

            toast.dark('Recipe updated successfully!');
          }
        })
        .catch(() => {
          toast.error('Something went wrong, please try again later');
        });
    }
  };

  const deleteStepHandler = (id) => {
    axiosInstance.delete(`${RECIPE_STEPS}/${id}`).catch(() => {
      toast.error('Something went wrong, please try again later');
    });
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={close} animation={false} scrollable>
        <Modal.Header closeButton>
          {recipe.id === 0 ? (
            <Modal.Title>New recipe</Modal.Title>
          ) : (
            <Modal.Title>Edit recipe</Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FormGroup>
              <FormLabel className="uppercase-bembo">Title</FormLabel>
              <FormControl
                type="text"
                placeholder="Title"
                value={state.name}
                onChange={(e) => dispatch(setRecipeName(e.target.value))}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel className="uppercase-bembo">Description</FormLabel>
              <textarea
                rows="3"
                placeholder="Description"
                className="form-control"
                value={state.description}
                onChange={(e) => dispatch(setRecipeDescription(e.target.value))}
              />
            </FormGroup>

            <FormLabel className="uppercase-bembo">Details</FormLabel>

            <div className={styles.grid3Cols}>
              <FormGroup>
                <FormLabel>Category</FormLabel>
                <Dropdown>
                  <Dropdown.Toggle
                    className="dropdown-toggle-custom"
                    variant="dropdown-simple"
                  >
                    {state.recipeCategory.name}
                  </Dropdown.Toggle>

                  {categories.status === 'FETCHED' && (
                    <Dropdown.Menu className={styles.scrollableMenu}>
                      {categories.data.map((category) => (
                        <Dropdown.Item
                          key={category.id}
                          id={category.id}
                          onClick={() => dispatch(setRecipeCategory(category))}
                        >
                          {category.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </FormGroup>

              <FormGroup>
                <FormLabel>Diet</FormLabel>
                <Dropdown>
                  <Dropdown.Toggle
                    className="dropdown-toggle-custom"
                    variant="dropdown-simple"
                  >
                    {state.diet.name}
                  </Dropdown.Toggle>

                  {diets.status === 'FETCHED' && (
                    <Dropdown.Menu className={styles.scrollableMenu}>
                      {diets.data.map((diet) => (
                        <Dropdown.Item
                          key={diet.id}
                          id={diet.id}
                          onClick={() => dispatch(setRecipeDiet(diet))}
                        >
                          {diet.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </FormGroup>

              <FormGroup>
                <FormLabel>Preparation time</FormLabel>
                <FormControl
                  type="text"
                  value={state.preparationTime}
                  placeholder="Preparation time"
                  className={styles.input}
                  onChange={(e) =>
                    dispatch(setRecipePreparationTime(e.target.value))
                  }
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Serving size</FormLabel>
                <FormControl
                  type="number"
                  min={0}
                  placeholder="Serving size"
                  value={state.servingSize}
                  className={styles.input}
                  onChange={(e) =>
                    dispatch(setServingSize(parseInt(e.target.value, 10)))
                  }
                />
              </FormGroup>
            </div>

            <FormGroup>
              <FormLabel className="uppercase-bembo">Ingredients</FormLabel>

              <ol className="no-list-style">
                {state.ingredients.map((ingredient, idx) => (
                  <li
                    key={
                      ingredient.id !== undefined
                        ? `ingredient-${ingredient.id}`
                        : ingredient.key
                    }
                  >
                    <IngredientInput
                      key={
                        ingredient.id !== undefined
                          ? `ingredient-${ingredient.id}`
                          : ingredient.key
                      }
                      id={idx}
                      ingredient={ingredient}
                      dispatch={dispatch}
                      setIngredientSearch={setIngredientSearch}
                      setIngredient={setIngredient}
                    />
                  </li>
                ))}
              </ol>

              <br />

              <Button
                variant="outline-black"
                className={styles.plusButton}
                onClick={() => {
                  dispatch(addIngredient());
                }}
              >
                +
              </Button>
            </FormGroup>

            <FormGroup>
              <FormLabel className="uppercase-bembo">Steps</FormLabel>

              <ol>
                {state.steps.map((step, idx) => (
                  <li
                    key={step.id !== undefined ? `step-${step.id}` : step.key}
                  >
                    <FormControl
                      id={idx + 1}
                      type="text"
                      key={step.id !== undefined ? `step-${step.id}` : step.key}
                      value={step.step}
                      className={styles.stepInput}
                      onChange={(e) => {
                        dispatch(
                          setStep({
                            id: e.target.id,
                            step: e.target.value
                          })
                        );
                      }}
                    />

                    <Button
                      variant="no-margin"
                      className={styles.trashButton}
                      onClick={() => {
                        dispatch(deleteStep(idx));

                        if (step.id !== undefined) {
                          deleteStepHandler(step.id);
                        }
                      }}
                    >
                      <Trash />
                    </Button>
                  </li>
                ))}
              </ol>

              <Button
                variant="outline-black"
                className={styles.plusButton}
                onClick={() => {
                  dispatch(addStep());
                }}
              >
                +
              </Button>
            </FormGroup>

            <FormLabel className="uppercase-bembo">Intake</FormLabel>
            <FormGroup className={styles.intakeDiv}>
              <div>
                <FormLabel>Energy KJ</FormLabel>
                <FormControl
                  type="number"
                  min="0"
                  placeholder="KJ"
                  className={styles.input}
                  value={state.intake.energyKJ}
                  onChange={(e) =>
                    dispatch(setEnergyKJ(parseInt(e.target.value, 10)))
                  }
                />
              </div>

              <div>
                <FormLabel>Energy KCal</FormLabel>
                <FormControl
                  type="number"
                  min="0"
                  placeholder="KCal"
                  className={styles.input}
                  value={state.intake.energyKCAL}
                  onChange={(e) =>
                    dispatch(setEnergyKCal(parseInt(e.target.value, 10)))
                  }
                />
              </div>

              <div>
                <FormLabel>Fat (g)</FormLabel>
                <FormControl
                  type="number"
                  min="0"
                  placeholder="Fat"
                  className={styles.input}
                  value={state.intake.fat}
                  onChange={(e) =>
                    dispatch(setFat(parseInt(e.target.value, 10)))
                  }
                />
              </div>

              <div>
                <FormLabel>Saturates (g)</FormLabel>
                <FormControl
                  type="number"
                  min="0"
                  placeholder="Saturates"
                  className={styles.input}
                  value={state.intake.saturates}
                  onChange={(e) =>
                    dispatch(setSaturates(parseInt(e.target.value, 10)))
                  }
                />
              </div>

              <div>
                <FormLabel>Sugars (g)</FormLabel>
                <FormControl
                  type="number"
                  min="0"
                  placeholder="Sugars"
                  className={styles.input}
                  value={state.intake.sugars}
                  onChange={(e) =>
                    dispatch(setSugars(parseInt(e.target.value, 10)))
                  }
                />
              </div>

              <div>
                <FormLabel>Salt (g)</FormLabel>

                <FormControl
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Salt"
                  className={styles.input}
                  value={state.intake.salt}
                  onChange={(e) =>
                    dispatch(setSalt(parseFloat(e.target.value)))
                  }
                />
              </div>
            </FormGroup>

            <FormGroup className={styles.intakeDiv}>
              <div>
                <FormLabel>Carbs (g)</FormLabel>

                <FormControl
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Carbs"
                  className={styles.input}
                  value={state.intake.carbohydrates}
                  onChange={(e) =>
                    dispatch(setCarbs(parseFloat(e.target.value)))
                  }
                />
              </div>

              <div>
                <FormLabel>Proteins (g)</FormLabel>

                <FormControl
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Proteins"
                  className={styles.input}
                  value={state.intake.proteins}
                  onChange={(e) =>
                    dispatch(setProteins(parseFloat(e.target.value)))
                  }
                />
              </div>

              <div>
                <FormLabel>Fibres (g)</FormLabel>

                <FormControl
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Fibres"
                  className={styles.input}
                  value={state.intake.fibres}
                  onChange={(e) =>
                    dispatch(setFibres(parseFloat(e.target.value)))
                  }
                />
              </div>
            </FormGroup>

            <FormGroup>
              <FormLabel>Picture</FormLabel>

              <br />
              <img
                src={state.pictureUrl}
                alt="recipe"
                width="30%"
                className="mb-2"
              />

              <FormControl
                type="file"
                placeholder="Image"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const imageFile = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (x) => {
                      dispatch(setRecipePicture(x.target.result, imageFile));
                    };
                    reader.readAsDataURL(imageFile);
                  } else {
                    dispatch(setRecipePicture('no-image.png', null));
                  }
                }}
              />
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button type="submit" variant="black" onClick={saveHandler}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { RecipeModal };
