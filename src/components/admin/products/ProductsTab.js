import React from 'react';
import { Button, ButtonGroup, Form, Spinner } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

import { ProductsContext } from '../../../context/ProductsContext';
import {
  closeBrandsModal,
  closeCategoriesModal,
  closeProductModal,
  showBrandsModal,
  showCategoriesModal,
  showProductModal
} from '../../../store/admin/productsTabActions';
import {
  initialState,
  productsTabReducer
} from '../../../store/admin/productsTabReducer';
import { initialProduct } from '../../../store/products/productReducer';
import { Pagination } from '../../pagination/Pagination';
import { BrandsModal } from './BrandsModal';
import { CategoriesModal } from './CategoriesModal';
import { ProductListItem } from './ProductListItem';
import { ProductModal } from './ProductModal';

import styles from './ProductsTab.module.scss';

function ProductsTab() {
  const [state, dispatch] = React.useReducer(productsTabReducer, initialState);
  const { products, apiParams, setApiParams } =
    React.useContext(ProductsContext);

  const [searchInput, setSearchInput] = React.useState('');

  const pageHandler = (pageIndex) => {
    setApiParams({ ...apiParams, pageIndex });
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setApiParams({ ...apiParams, search: searchInput });
    console.log(searchInput);
  };

  const showBrandsModalHandler = () => dispatch(showBrandsModal);
  const hideBrandsModalHandler = () => dispatch(closeBrandsModal);

  return (
    <>
      <br />

      <ButtonGroup>
        <Button
          variant="outline-black"
          onClick={() => dispatch(showProductModal)}
        >
          Add Product
        </Button>

        <Button
          variant="outline-black"
          onClick={() => dispatch(showBrandsModal)}
        >
          Edit Brands
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
          <Form.Control
            type="text"
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onClick={() => setSearchInput('')}
          />

          <Button type="submit" variant="no-margin" onClick={searchHandler}>
            <Search />
          </Button>
        </Form.Group>
      </Form>

      {products.status === 'FETCHED' ? (
        <div className={styles.flexboxColumn}>
          <Pagination
            pageSize={products.result.pageSize}
            totalProducts={products.result.count}
            pageNumberHandler={pageHandler}
            pageIndex={products.result.pageIndex}
          />

          {products.result.data.length === 0 && (
            <p>No results matched your search</p>
          )}

          <ul className={`${styles.productGrid} no-list-style`}>
            {products.result.data.map((product) => (
              <li key={product.id}>
                <ProductListItem product={product} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <br />
          <br />
          <br />
          <Spinner animation="border" />
        </>
      )}

      {state.showProductModal && (
        <ProductModal
          product={initialProduct}
          show={true}
          close={() => dispatch(closeProductModal)}
        />
      )}

      {state.showCategoriesModal && (
        <CategoriesModal
          show={true}
          close={() => dispatch(closeCategoriesModal)}
          dispatch={dispatch}
        />
      )}

      {state.showBrandsModal && (
        <BrandsModal
          visible={true}
          show={showBrandsModalHandler}
          close={hideBrandsModalHandler}
        />
      )}
    </>
  );
}

export { ProductsTab };
