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

import 'react-toastify/dist/ReactToastify.css';

import { axiosInstance } from '../../../api/axios';
import { BrandsContext } from '../../../context/BrandsContext';
import { MenuBarContext } from '../../../context/MenuBarContext';
import { ProductsContext } from '../../../context/ProductsContext';
import { API_PRODUCTS_ROUTE } from '../../../routes/apiRoutes';
import {
  resetProduct,
  setProductBrandId,
  setProductCategoryId,
  setProductDescription,
  setProductDiscount,
  setProductEntryStatus,
  setProductName,
  setProductPrice,
  setProductStock,
  setProductSubcategoryId,
  setProductWeight
} from '../../../store/products/productActionTypes';
import { productReducer } from '../../../store/products/productReducer';

import styles from './ProductModal.module.scss';

function mapProduct(product) {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    weight: product.weight,
    price: product.price,
    discount: product.discount,
    pictureUrl: product.pictureUrl,
    productBrandId: product.productBrandId,
    productCategoryId: product.productCategoryId,
    productSubcategoryId:
      product.productSubcategoryId === 0 ? null : product.productSubcategoryId,
    newEntry: product.newEntry,
    stock: product.stock
  };
}

function ProductModal({ product, show, close }) {
  const [state, dispatch] = React.useReducer(productReducer, product);

  const [selectedBrand, setSelectedBrand] = React.useState(
    product.productBrandId !== 0
      ? { id: product.productBrandId, name: product.productBrand }
      : { id: 0, name: 'Brand' }
  );
  const [selectedCategory, setSelectedCategory] = React.useState(
    product.productCategoryId !== 0
      ? { id: product.productCategoryId, name: product.productCategory }
      : { id: 0, name: 'Category' }
  );
  const [selectedSubcategory, setSelectedSubcategory] = React.useState(
    product.productSubcategoryId !== 0
      ? { id: product.productSubcategoryId, name: product.productSubcategory }
      : { id: 0, name: 'Subcategory' }
  );

  const [productCategory, setCategory] = React.useState(null);

  const { shopData, setProductCategoriesSort } =
    React.useContext(MenuBarContext);
  const { brands, setSortValue } = React.useContext(BrandsContext);
  const { fetchProducts } = React.useContext(ProductsContext);

  React.useEffect(() => {
    setSortValue('nameAsc');
    setProductCategoriesSort('nameAsc');
  }, []);

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
    dispatch(setProductBrandId(e.target.id));
    setSelectedBrand({ id: e.target.id, name: e.currentTarget.textContent });
  };

  const productCategoryHandler = (e) => {
    const id = parseInt(e.target.id, 10);

    dispatch(setProductCategoryId(id));
    dispatch(setProductSubcategoryId(null));
    setSelectedCategory({ id, name: e.currentTarget.textContent });
    setSelectedSubcategory({ id: 0, name: 'Subcategory' });
  };

  const productSubcategoryHandler = (e) => {
    dispatch(setProductSubcategoryId(e.target.id));
    setSelectedSubcategory({
      id: e.target.id,
      name: e.currentTarget.textContent
    });
  };

  const saveProduct = (e) => {
    e.preventDefault();

    if (state.id === 0) {
      axiosInstance
        .post(API_PRODUCTS_ROUTE, state)
        .then((response) => {
          if (response.status === 201) {
            dispatch(resetProduct);
            setSelectedBrand({ id: 0, name: 'Brand' });
            setSelectedCategory({ id: 0, name: 'Category' });
            setSelectedSubcategory({ id: 0, name: 'Subcategory' });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axiosInstance
        .put(API_PRODUCTS_ROUTE, mapProduct(state))
        .then((response) => {
          if (response.status === 204) {
            fetchProducts();
            close();
            console.log('ceau');
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
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
                onChange={(e) => dispatch(setProductName(e.target.value))}
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
                  dispatch(setProductDescription(e.target.value))
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
                    {selectedBrand.name}
                  </Dropdown.Toggle>

                  {brands.status === 'FETCHED' && (
                    <Dropdown.Menu className={styles.scrollableMenu}>
                      {brands.result.map((brand) => (
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
                  )}
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
                        {selectedSubcategory.name}
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
                  onChange={(e) => dispatch(setProductWeight(e.target.value))}
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
                  onChange={(e) => dispatch(setProductPrice(e.target.value))}
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
                    dispatch(setProductDiscount(e.target.value, 10))
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
                    dispatch(setProductStock(e.target.value, 10))
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
                  onChange={(e) => dispatch(setProductEntryStatus(e))}
                >
                  <ToggleButton variant="secondary" value={true}>
                    Yes
                  </ToggleButton>
                  <ToggleButton variant="secondary" value={false}>
                    No
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormGroup>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="black" onClick={saveProduct}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export { ProductModal };
