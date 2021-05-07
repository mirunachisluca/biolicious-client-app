import React from 'react';
import {
  Modal,
  Button,
  Form,
  FormControl,
  ToggleButton,
  FormGroup,
  FormLabel,
  Dropdown,
  ToggleButtonGroup
} from 'react-bootstrap';
import { axiosInstance } from '../../../api/axios';
import { MenuBarContext } from '../../../context/MenuBarContext';
import {
  RESET_PRODUCT,
  SET_PRODUCT_BRAND_ID,
  SET_PRODUCT_CATEGORY_ID,
  SET_PRODUCT_DESCRIPTION,
  SET_PRODUCT_DISCOUNT,
  SET_PRODUCT_ENTRY_STATUS,
  SET_PRODUCT_NAME,
  SET_PRODUCT_PRICE,
  SET_PRODUCT_STOCK,
  SET_PRODUCT_SUBCATEGORY_ID,
  SET_PRODUCT_WEIGHT
} from '../../../store/products/productActionTypes';
import { productReducer } from '../../../store/products/productReducer';

import styles from './ProductModal.module.scss';

function ProductModal({ product, show, close, brands }) {
  const [state, dispatch] = React.useReducer(productReducer, product);

  const [selectedBrand, setSelectedBrand] = React.useState(
    product.productBrand !== undefined ? product.productBrand : 'Brand'
  );
  const [selectedCategory, setSelectedCategory] = React.useState({
    id: 0,
    name: 'Category'
  });
  const [selectedSubcategory, setSelectedSubcategory] = React.useState(
    'Subcategory'
  );

  const [productCategory, setCategory] = React.useState(null);

  const { shopData } = React.useContext(MenuBarContext);

  React.useEffect(
    function displaySubcategoryDropdown() {
      const categoryObject = shopData.data.find(
        (x) => x.id === state.productCategoryId
      );

      if (categoryObject !== undefined) setCategory(categoryObject);
    },
    [state.productCategoryId, shopData.data]
  );

  const productBrandHandler = (e) => {
    dispatch({
      type: SET_PRODUCT_BRAND_ID,
      payload: parseInt(e.target.id, 10)
    });
    setSelectedBrand(e.currentTarget.textContent);
  };

  const productCategoryHandler = (e) => {
    const id = parseInt(e.target.id, 10);

    dispatch({ type: SET_PRODUCT_CATEGORY_ID, payload: id });
    setSelectedCategory({ id, name: e.currentTarget.textContent });
    setSelectedSubcategory('Subcategory');
  };

  const productSubcategoryHandler = (e) => {
    dispatch({
      type: SET_PRODUCT_SUBCATEGORY_ID,
      payload: parseInt(e.target.id, 10)
    });
    setSelectedSubcategory(e.currentTarget.textContent);
  };

  const saveProduct = (e) => {
    e.preventDefault();

    if (state.id === 0) {
      axiosInstance
        .post('/products', state)
        .then((response) => {
          if (response.status === 201) {
            console.log(response);
            dispatch({ type: RESET_PRODUCT });
            setSelectedBrand('Brand');
            setSelectedCategory({ name: 'Category' });
            setSelectedSubcategory('Subcategory');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(state);
  };

  return (
    <Modal size="lg" show={show} onHide={close} animation={false}>
      <Modal.Header closeButton>
        {product.id === 0 ? (
          <Modal.Title>New product</Modal.Title>
        ) : (
          <Modal.Title>Edit Product</Modal.Title>
        )}
      </Modal.Header>

      <Form>
        <Modal.Body>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Name"
              value={state.name}
              onChange={(e) =>
                dispatch({ type: SET_PRODUCT_NAME, payload: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <textarea
              rows="3"
              placeholder="Description"
              className="form-control"
              value={state.description}
              onChange={(e) =>
                dispatch({
                  type: SET_PRODUCT_DESCRIPTION,
                  payload: e.target.value
                })
              }
            />
          </FormGroup>

          <div className={styles.grid3Cols}>
            <FormGroup>
              <FormLabel>Brand</FormLabel>
              <Dropdown>
                <Dropdown.Toggle
                  className={styles.dropdownInput}
                  variant="dropdown-simple"
                >
                  {selectedBrand}
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.scrollableMenu}>
                  {brands.map((brand) => (
                    <Dropdown.Item
                      key={brand.id}
                      id={brand.id}
                      value={brand.name}
                      onClick={productBrandHandler}
                    >
                      {brand.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </FormGroup>

            <FormGroup>
              <FormLabel>Category</FormLabel>
              <Dropdown>
                <Dropdown.Toggle
                  className={styles.dropdownInput}
                  variant="dropdown-simple"
                >
                  {selectedCategory.name}
                </Dropdown.Toggle>
                {shopData.status === 'FETCHED' && (
                  <Dropdown.Menu className={styles.scrollableMenu}>
                    {shopData.data.map((category) => (
                      <Dropdown.Item
                        key={category.id}
                        id={category.id}
                        value={category.name}
                        onClick={productCategoryHandler}
                      >
                        {category.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </FormGroup>

            {productCategory !== null &&
              productCategory.subcategories.length !== 0 && (
                <FormGroup>
                  <FormLabel>Subcategory</FormLabel>
                  <Dropdown>
                    <Dropdown.Toggle
                      className={styles.dropdownInput}
                      variant="dropdown-simple"
                    >
                      {selectedSubcategory}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={styles.scrollableMenu}>
                      {productCategory.subcategories.map((subcategory) => (
                        <Dropdown.Item
                          key={subcategory.id}
                          id={subcategory.id}
                          value={subcategory.name}
                          onClick={productSubcategoryHandler}
                        >
                          {subcategory.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </FormGroup>
              )}
          </div>

          <div className={styles.grid4Cols}>
            <FormGroup>
              <FormLabel>Weight</FormLabel>
              <FormControl
                type="text"
                placeholder="Weight"
                value={state.weight}
                className={styles.smallInput}
                onChange={(e) =>
                  dispatch({
                    type: SET_PRODUCT_WEIGHT,
                    payload: e.target.value
                  })
                }
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Price (€)</FormLabel>
              <FormControl
                type="number"
                min="0"
                step="0.01"
                placeholder="Price"
                className={styles.smallInput}
                value={state.price}
                onChange={(e) =>
                  dispatch({
                    type: SET_PRODUCT_PRICE,
                    payload: parseFloat(e.target.value)
                  })
                }
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Discount (%)</FormLabel>
              <FormControl
                type="number"
                min="0"
                max="100"
                placeholder="Discount"
                className={styles.smallInput}
                value={state.discount}
                onChange={(e) =>
                  dispatch({
                    type: SET_PRODUCT_DISCOUNT,
                    payload: parseInt(e.target.value, 10)
                  })
                }
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Stock</FormLabel>
              <FormControl
                type="number"
                placeholder="Stock"
                className={styles.smallInput}
                value={state.stock}
                onChange={(e) =>
                  dispatch({
                    type: SET_PRODUCT_STOCK,
                    payload: parseInt(e.target.value, 10)
                  })
                }
              />
            </FormGroup>
          </div>

          <div className={styles.grid2Cols}>
            <FormGroup>
              <FormLabel>Picture</FormLabel>
              <FormControl type="file" placeholder="Image" accept="image/*" />
            </FormGroup>

            <FormGroup>
              <FormLabel>New Entry</FormLabel>
              <br />
              <ToggleButtonGroup
                id="newEntry"
                type="radio"
                name="options"
                defaultValue={false}
                onChange={(e) =>
                  dispatch({ type: SET_PRODUCT_ENTRY_STATUS, payload: e })
                }
              >
                <ToggleButton value={true}>Yes</ToggleButton>
                <ToggleButton value={false}>No</ToggleButton>
              </ToggleButtonGroup>
            </FormGroup>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button type="submit" onClick={saveProduct}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export { ProductModal };
