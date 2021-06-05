import {
  ADD_EMPTY_INGREDIENT,
  ADD_EMPTY_STEP,
  DELETE_INGREDIENT,
  DELETE_STEP,
  RESET_RECIPE,
  SET_CARBS,
  SET_ENERGY_KCAL,
  SET_ENERGY_KJ,
  SET_FAT,
  SET_FIBRES,
  SET_INGREDIENT,
  SET_INGREDIENT_MEASURE,
  SET_INGREDIENT_QUANTITY,
  SET_INGREDIENT_SEARCH,
  SET_INTAKE,
  SET_RECIPE,
  SET_RECIPE_CATEGORY,
  SET_RECIPE_DESCRIPTION,
  SET_RECIPE_DIET,
  SET_RECIPE_NAME,
  SET_RECIPE_PICTURE,
  SET_RECIPE_PREPARATION_TIME,
  SET_RPOTEINS,
  SET_SALT,
  SET_SATURATES,
  SET_SERVING_SIZE,
  SET_STEP,
  SET_SUGARS
} from './recipeActions';

export const initialRecipe = {
  id: 0,
  name: '',
  description: '',
  pictureUrl: '',
  preparationTime: '',
  servingSize: '',
  steps: [],
  ingredients: [],
  recipeCategory: { id: 0, name: 'Category' },
  diet: { id: 0, name: 'Diet' },
  intake: {
    id: 0,
    energyKJ: '',
    energyKCAL: '',
    fat: '',
    saturates: '',
    sugars: '',
    salt: '',
    carbohydrates: '',
    proteins: '',
    fibres: ''
  },
  key: 1
};

function recipeReducer(state, action) {
  switch (action.type) {
    case SET_RECIPE:
      return { ...action.payload };
    case SET_RECIPE_NAME:
      return { ...state, name: action.payload };
    case SET_RECIPE_DESCRIPTION:
      return { ...state, description: action.payload };
    case SET_RECIPE_PREPARATION_TIME:
      return { ...state, preparationTime: action.payload };
    case SET_SERVING_SIZE:
      return { ...state, servingSize: action.payload };
    case SET_RECIPE_PICTURE:
      return { ...state, pictureUrl: action.payload };
    case SET_RECIPE_CATEGORY:
      return { ...state, recipeCategory: action.payload };
    case SET_RECIPE_DIET:
      return { ...state, diet: action.payload };
    case SET_INTAKE:
      return { ...state, intake: { ...action.payload } };
    case ADD_EMPTY_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          {
            key: state.key,
            productId: 0,
            quantity: 0.0,
            measure: '',
            search: '',
            name: 'Product'
          }
        ],
        key: state.key + 1
      };
    case SET_INGREDIENT_SEARCH: {
      const newIngredients = [...state.ingredients];

      newIngredients[action.payload.id].search = action.payload.search;

      return { ...state, ingredients: newIngredients };
    }
    case SET_INGREDIENT: {
      const newIngredients = [...state.ingredients];

      newIngredients[action.payload.id].productId = action.payload.productId;
      newIngredients[action.payload.id].name = action.payload.name;

      return { ...state, ingredients: newIngredients };
    }
    case SET_INGREDIENT_QUANTITY: {
      const newIngredients = [...state.ingredients];

      newIngredients[action.payload.id].quantity = action.payload.quantity;

      return { ...state, ingredients: newIngredients };
    }
    case SET_INGREDIENT_MEASURE: {
      const newIngredients = [...state.ingredients];

      newIngredients[action.payload.id].measure = action.payload.measure;

      return { ...state, ingredients: newIngredients };
    }
    case DELETE_INGREDIENT: {
      const newIngredients = [...state.ingredients];

      newIngredients.splice(action.payload, 1);

      return { ...state, ingredients: newIngredients };
    }
    case ADD_EMPTY_STEP: {
      return {
        ...state,
        steps: [...state.steps, { key: state.key, step: '' }],
        key: state.key + 1
      };
    }
    case SET_STEP: {
      const newSteps = [...state.steps];

      newSteps[action.payload.id - 1].step = action.payload.step;

      return { ...state, steps: newSteps };
    }
    case DELETE_STEP: {
      const newSteps = [...state.steps];

      newSteps.splice(action.payload, 1);

      return { ...state, steps: newSteps };
    }
    case SET_ENERGY_KJ:
      return {
        ...state,
        intake: { ...state.intake, energyKJ: action.payload }
      };
    case SET_ENERGY_KCAL:
      return {
        ...state,
        intake: { ...state.intake, energyKCAL: action.payload }
      };
    case SET_FAT:
      return { ...state, intake: { ...state.intake, fat: action.payload } };
    case SET_SATURATES:
      return {
        ...state,
        intake: { ...state.intake, saturates: action.payload }
      };
    case SET_SUGARS:
      return { ...state, intake: { ...state.intake, sugars: action.payload } };
    case SET_SALT:
      return { ...state, intake: { ...state.intake, salt: action.payload } };
    case SET_CARBS:
      return {
        ...state,
        intake: { ...state.intake, carbohydrates: action.payload }
      };
    case SET_RPOTEINS:
      return {
        ...state,
        intake: { ...state.intake, proteins: action.payload }
      };
    case SET_FIBRES:
      return { ...state, intake: { ...state.intake, fibres: action.payload } };
    case RESET_RECIPE:
      return initialRecipe;
    default:
      return state;
  }
}

export { recipeReducer };
