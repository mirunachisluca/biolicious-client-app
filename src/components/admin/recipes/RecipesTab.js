import React from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import {
  closeCategoriesModal,
  closeDietsModal,
  showCategoriesModal,
  showDietsModal,
  showRecipeModal
} from '../../../store/admin/recipesTabActions';
import {
  initialState,
  recipesTabReducer
} from '../../../store/admin/recipesTabReducer';
import { CategoriesModal } from './CategoriesModal';
import { DietsModal } from './DietsModal';

function RecipesTab() {
  const [state, dispatch] = React.useReducer(recipesTabReducer, initialState);

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
          <Form.Control type="text" className="search-input" />
          <Search />
        </Form.Group>
      </Form>

      <DietsModal
        visible={state.showDietsModal}
        show={showDietsModalHandler}
        close={hideDietsModalHandler}
      />

      <CategoriesModal
        visible={state.showCategoriesModal}
        show={showCategoriesModalHandler}
        close={hideCategoriesModalHandler}
      />
    </>
  );
}

export { RecipesTab };
