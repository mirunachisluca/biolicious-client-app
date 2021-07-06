import React from 'react';
import {
  FormControl,
  FormGroup,
  FormLabel,
  Dropdown,
  Spinner,
  Button
} from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { axiosInstance } from '../../../api/axios';
import { ProductsContext } from '../../../context/ProductsContext';
import { RECIPE_INGREDIENTS } from '../../../routes/apiRoutes';
import {
  deleteIngredient,
  setIngredientMeasure,
  setIngredientQuantity
} from '../../../store/recipes/recipeActions';

import styles from './IngredientInput.module.scss';

function IngredientInput({
  id,
  ingredient,
  dispatch,
  setIngredientSearch,
  setIngredient
}) {
  const { products, apiParams, setApiParams } =
    React.useContext(ProductsContext);

  React.useEffect(() => setApiParams({ pageIndex: 1, search: '' }), []);

  const deleteIngredientHandler = () => {
    axiosInstance
      .delete(`${RECIPE_INGREDIENTS}/${ingredient.id}`)
      .catch((error) => console.log(error));
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
      className={`dropdown-toggle ${styles.dropdownWidth}`}
      variant="dropdown-simple"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Button>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => (
      <div
        ref={ref}
        style={style}
        className={`${className} ${styles.dropdownWidth}`}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to search..."
          onChange={(e) => {
            setApiParams({ ...apiParams, search: e.target.value });
            dispatch(setIngredientSearch({ id, search: e.target.value }));
          }}
          value={ingredient.search}
        />
        <ul className="list-unstyled scrollable-menu">{children}</ul>
      </div>
    )
  );

  return (
    <>
      <FormGroup className={styles.input}>
        <div>
          <FormLabel>Product</FormLabel>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
              {ingredient.name}
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
              {products.status === 'FETCHED' ? (
                products.result.data.map((product) => (
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(
                        setIngredient({
                          id,
                          productId: product.id,
                          name: `${product.name} ${product.weight}`
                        })
                      )
                    }
                  >
                    {`${product.name} ${product.weight}`}
                  </Dropdown.Item>
                ))
              ) : (
                <div>
                  <Spinner
                    animation="border"
                    className={`m-auto ${styles.spinner}`}
                  />
                </div>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div>
          <FormLabel>Quantity</FormLabel>
          <FormControl
            key={`quantity-${id}`}
            type="number"
            min="0"
            step="0.1"
            placeholder="Quantity"
            className={styles.smallInput}
            defaultValue={ingredient.quantity}
            onChange={(e) =>
              dispatch(
                setIngredientQuantity({
                  id,
                  quantity: parseFloat(e.target.value)
                })
              )
            }
          />
        </div>

        <div>
          <FormLabel>Unit measure</FormLabel>
          <FormControl
            key={`margin-${id}`}
            type="text"
            placeholder="Unit measure"
            className={styles.smallInput}
            defaultValue={ingredient.measure}
            onChange={(e) =>
              dispatch(setIngredientMeasure({ id, measure: e.target.value }))
            }
          />
        </div>

        <Button
          variant="no-margin"
          className={styles.trashIcon}
          onClick={() => {
            dispatch(deleteIngredient(id));

            if (ingredient.id !== undefined) {
              deleteIngredientHandler();
            }
          }}
        >
          <Trash />
        </Button>
      </FormGroup>
    </>
  );
}

export { IngredientInput };
