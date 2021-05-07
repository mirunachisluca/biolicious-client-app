import React from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { axiosInstance } from '../../../api/axios';
import {
  CLOSE_BRANDS_MODAL,
  CLOSE_CATEGORIES_MODAL,
  CLOSE_PRODUCT_MODAL,
  SHOW_BRANDS_MODAL,
  SHOW_CATEGORIES_MODAL,
  SHOW_PRODUCT_MODAL
} from '../../../store/admin/productsTabActions';
import {
  initialState,
  productsTabReducer
} from '../../../store/admin/productsTabReducer';
import { initialProduct } from '../../../store/products/productReducer';
import { BrandsModal } from './BrandsModal';
import { CategoriesModal } from './CategoriesModal';
import { ProductModal } from './ProductModal';

import styles from './ProductsTab.module.scss';

function ProductsTab() {
  const [state, dispatch] = React.useReducer(productsTabReducer, initialState);
  const [brands, setBrands] = React.useState({
    status: 'PENDING',
    result: null
  });

  React.useEffect(function fetchBrands() {
    axiosInstance
      .get('/productBrands')
      .then((response) => {
        if (response.status === 200) {
          setBrands({ status: 'FETCHED', result: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className={styles.grid}>
        <div>
          <ButtonGroup vertical>
            <Button
              variant="outline-black"
              onClick={() => dispatch({ type: SHOW_PRODUCT_MODAL })}
            >
              Add Product
            </Button>

            <Button
              variant="outline-black"
              onClick={() => dispatch({ type: SHOW_BRANDS_MODAL })}
            >
              Edit Brands
            </Button>

            <Button
              variant="outline-black"
              onClick={() => dispatch({ type: SHOW_CATEGORIES_MODAL })}
            >
              Edit Categories
            </Button>
          </ButtonGroup>
        </div>

        <div>
          <Form>
            <Form.Group>
              <Form.Control type="text" className={styles.searchInput} />
              <Search />
            </Form.Group>
          </Form>

          <div className={styles.productGrid}>
            <p>product 1</p>
            <p>product 2</p>
          </div>
        </div>
      </div>

      {brands.status === 'FETCHED' && (
        <ProductModal
          product={initialProduct}
          show={state.showProductModal}
          close={() => dispatch({ type: CLOSE_PRODUCT_MODAL })}
          brands={brands.result}
        />
      )}

      <CategoriesModal
        show={state.showCategoriesModal}
        close={() => dispatch({ type: CLOSE_CATEGORIES_MODAL })}
      />

      <BrandsModal
        show={state.showBrandsModal}
        close={() => dispatch({ type: CLOSE_BRANDS_MODAL })}
        dispatch={dispatch}
      />
    </>
  );
}

export { ProductsTab };
