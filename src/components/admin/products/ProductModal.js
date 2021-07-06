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
import { toast } from 'react-toastify';

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
  setProductPicture,
  setProductPrice,
  setProductStock,
  setProductSubcategoryId,
  setProductWeight
} from '../../../store/products/productActionTypes';
import { productReducer } from '../../../store/products/productReducer';

import styles from './ProductModal.module.scss';

function mapProduct(product) {
  const formData = new FormData();

  formData.append('id', product.id);
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('weight', product.weight);
  formData.append('price', product.price);
  formData.append('discount', product.discount);
  formData.append(
    'pictureUrl',
    product.pictureUrl.substring(24, product.pictureUrl.lentgh)
  );
  formData.append('productBrandId', product.productBrandId);
  formData.append('productCategoryId', product.productCategoryId);
  formData.append('productSubcategoryId', product.productSubcategoryId);
  formData.append('newEntry', product.newEntry);
  formData.append('stock', product.stock);
  formData.append('imageFile', product.imageFile);

  return formData;
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

  const { shopData } = React.useContext(MenuBarContext);
  const { brands } = React.useContext(BrandsContext);
  const { fetchProducts } = React.useContext(ProductsContext);

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
        .post(API_PRODUCTS_ROUTE, mapProduct(state))
        .then((response) => {
          if (response.status === 201) {
            dispatch(resetProduct);
            setSelectedBrand({ id: 0, name: 'Brand' });
            setSelectedCategory({ id: 0, name: 'Category' });
            setSelectedSubcategory({ id: 0, name: 'Subcategory' });
            fetchProducts();

            toast.dark('Product added successfully!');
          }
        })
        .catch(() => {
          toast.error('Something went wrong, please try again later');
        });
    } else {
      axiosInstance
        .put(API_PRODUCTS_ROUTE, mapProduct(state))
        .then((response) => {
          if (response.status === 204) {
            fetchProducts();
            close();

            toast.dark('Product updated successfully!');
          }
        })
        .catch(() => {
          toast.error('Something went wrong, please try again later');
        });
    }
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={close} animation={false} scrollable>
        <Modal.Header closeButton>
          {product.id === 0 ? (
            <Modal.Title>New product</Modal.Title>
          ) : (
            <Modal.Title>Edit Product</Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FormGroup>
              <FormLabel className="uppercase-bembo">Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Name"
                value={state.name}
                onChange={(e) => dispatch(setProductName(e.target.value))}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel className="uppercase-bembo">Description</FormLabel>
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

            <FormLabel className="uppercase-bembo">Details</FormLabel>

            <div className={styles.grid3Cols}>
              <FormGroup>
                <FormLabel>Brand</FormLabel>
                <Dropdown>
                  <Dropdown.Toggle
                    className="dropdown-toggle-custom"
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
                    className="dropdown-toggle-custom"
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
                        className="dropdown-toggle-custom"
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
                  min="0"
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

                <br />
                <img
                  src={state.pictureUrl}
                  alt="product"
                  width="65%"
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
                        dispatch(setProductPicture(x.target.result, imageFile));
                      };
                      reader.readAsDataURL(imageFile);
                    } else {
                      dispatch(setProductPicture('no-image.png', null));
                    }
                  }}
                />
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
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button type="submit" variant="black" onClick={saveProduct}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { ProductModal };
