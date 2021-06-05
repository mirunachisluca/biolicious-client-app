export const SET_RECIPE = 'SET_RECIPE';
export const SET_RECIPE_NAME = 'SET_RECIPE_NAME';
export const SET_RECIPE_DESCRIPTION = 'SET_RECIPE_DESCRIPTION';
export const SET_SERVING_SIZE = 'SET_SERVING_SIZE';
export const SET_RECIPE_PICTURE = 'SET_RECIPE_PICTURE';
export const SET_RECIPE_PREPARATION_TIME = 'SET_RECIPE_PREPARATION_TIME';
export const ADD_EMPTY_INGREDIENT = 'ADD_EMPTY_INGREDIENT';
export const SET_INGREDIENT_SEARCH = 'SET_INGREDIENT_SEARCH';
export const SET_INGREDIENT = 'SET_INGREDIENT';
export const SET_INGREDIENT_QUANTITY = 'SET_INGREDIENT_QUANTITY';
export const SET_INGREDIENT_MEASURE = 'SET_INGREDIENT_MEASURE';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_EMPTY_STEP = 'ADD_EMPTY_STEP';
export const DELETE_STEP = 'DELETE_STEP';
export const SET_STEP = 'SET_STEP';
export const SET_RECIPE_CATEGORY = 'SET_RECIPE_CATEGORY';
export const SET_RECIPE_DIET = 'SET_RECIPE_DIET';
export const SET_INTAKE = 'SET_INTAKE';
export const SET_ENERGY_KJ = 'SET_ENERGY_KJ';
export const SET_ENERGY_KCAL = 'SET_ENERGY_KCAL';
export const SET_FAT = 'SET_FAT';
export const SET_SATURATES = 'SET_SATURATES';
export const SET_SUGARS = 'SET_SUGARS';
export const SET_SALT = 'SET_SALT';
export const SET_CARBS = 'SET_CARBS';
export const SET_RPOTEINS = 'SET_PROTEINS';
export const SET_FIBRES = 'SET_FIBRES';
export const RESET_RECIPE = 'RESET_RECIPE';

export const setRecipe = (recipe) => ({ type: SET_RECIPE, payload: recipe });

export const setRecipeName = (name) => ({
  type: SET_RECIPE_NAME,
  payload: name
});

export const setRecipeDescription = (description) => ({
  type: SET_RECIPE_DESCRIPTION,
  payload: description
});

export const setServingSize = (size) => ({
  type: SET_SERVING_SIZE,
  payload: size
});

export const setRecipePicture = (url) => ({
  type: SET_RECIPE_PICTURE,
  payload: url
});

export const setRecipePreparationTime = (time) => ({
  type: SET_RECIPE_PREPARATION_TIME,
  payload: time
});

export const addIngredient = () => ({ type: ADD_EMPTY_INGREDIENT });

export const setIngredientSearch = (ingredient) => ({
  type: SET_INGREDIENT_SEARCH,
  payload: ingredient
});

export const setIngredient = (ingredient) => ({
  type: SET_INGREDIENT,
  payload: ingredient
});

export const setIngredientQuantity = (quantity) => ({
  type: SET_INGREDIENT_QUANTITY,
  payload: quantity
});

export const setIngredientMeasure = (measure) => ({
  type: SET_INGREDIENT_MEASURE,
  payload: measure
});

export const deleteIngredient = (index) => ({
  type: DELETE_INGREDIENT,
  payload: index
});

export const addStep = () => ({ type: ADD_EMPTY_STEP });

export const setStep = (step) => ({ type: SET_STEP, payload: step });

export const deleteStep = (index) => ({ type: DELETE_STEP, payload: index });

export const setRecipeCategory = (category) => ({
  type: SET_RECIPE_CATEGORY,
  payload: category
});

export const setRecipeDiet = (diet) => ({
  type: SET_RECIPE_DIET,
  payload: diet
});

export const setIntake = (intake) => ({ type: SET_INTAKE, payload: intake });

export const setEnergyKJ = (value) => ({ type: SET_ENERGY_KJ, payload: value });

export const setEnergyKCal = (value) => ({
  type: SET_ENERGY_KCAL,
  payload: value
});

export const setFat = (value) => ({ type: SET_FAT, payload: value });

export const setSaturates = (value) => ({
  type: SET_SATURATES,
  payload: value
});

export const setSugars = (value) => ({ type: SET_SUGARS, payload: value });

export const setSalt = (value) => ({ type: SET_SALT, payload: value });

export const setCarbs = (value) => ({ type: SET_CARBS, payload: value });

export const setProteins = (value) => ({ type: SET_RPOTEINS, payload: value });

export const setFibres = (value) => ({ type: SET_FIBRES, payload: value });

export const resetRecipe = () => ({ type: RESET_RECIPE });
