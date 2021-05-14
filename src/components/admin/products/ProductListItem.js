import React from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { axiosInstance } from '../../../api/axios';
import { ProductsContext } from '../../../context/ProductsContext';
import { API_PRODUCTS_ROUTE } from '../../../routes/apiRoutes';
import { ConfirmationModal } from '../common/ConfirmationModal';

import styles from './ProductListItem.module.scss';
import { ProductModal } from './ProductModal';

function ProductListItem({ product }) {
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    React.useState(false);

  const { fetchProducts } = React.useContext(ProductsContext);

  const displayEditModalHandler = () => {
    setDisplayEditModal(true);
  };

  const hideEditModalHandler = () => {
    setDisplayEditModal(false);
  };

  const displayConfirmationModalHandler = () => {
    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModalHandler = () => {
    setDisplayConfirmationModal(false);
  };

  const deleteProduct = () => {
    axiosInstance
      .delete(`${API_PRODUCTS_ROUTE}/${product.id}`)
      .then(() => fetchProducts())
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Card className={`shadow ${styles.card}`}>
        <div className={styles.grid}>
          <Card.Img src="../../../product.jpg" height="100%" />

          <Card.Body className={styles.cardBody}>
            <div className={styles.bodyGrid}>
              <div>
                <p className={`${styles.font} ${styles.noMargin}`}>
                  {product.name}
                </p>

                <p className={`${styles.font} font-italic`}>
                  {product.productBrand}
                </p>

                <p className={`${styles.font} ${styles.noMargin}`}>
                  {`${product.price} €`}
                </p>
              </div>

              <div>
                <ButtonGroup vertical>
                  <Button
                    variant="no-margin"
                    onClick={() => displayEditModalHandler(product)}
                  >
                    <PencilSquare />
                  </Button>

                  <Button
                    variant="no-margin"
                    onClick={() => displayConfirmationModalHandler(product)}
                  >
                    <Trash />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </Card.Body>
        </div>
      </Card>

      {displayEditModal && (
        <ProductModal
          product={product}
          show={true}
          close={hideEditModalHandler}
        />
      )}

      <ConfirmationModal
        show={displayConfirmationModal}
        close={hideConfirmationModalHandler}
        yesActionHandler={deleteProduct}
        noActionHandler={hideConfirmationModalHandler}
      />
    </>
  );
}

export { ProductListItem };
