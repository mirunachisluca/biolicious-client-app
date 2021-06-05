import React from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import ImageFadeIn from 'react-image-fade-in';
import { toast } from 'react-toastify';

import { axiosInstance } from '../../../api/axios';
import { ProductsContext } from '../../../context/ProductsContext';
import { API_PRODUCTS_ROUTE } from '../../../routes/apiRoutes';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { useActionModals } from '../../../customHooks/useActionModals';
import { ProductModal } from './ProductModal';

import styles from './ProductListItem.module.scss';

function ProductListItem({ product }) {
  const { fetchProducts } = React.useContext(ProductsContext);

  const {
    displayEditModal,
    displayConfirmationModal,
    displayEditModalHandler,
    displayConfirmationModalHandler,
    hideEditModalHandler,
    hideConfirmationModalHandler
  } = useActionModals();

  const deleteProduct = () => {
    axiosInstance
      .delete(`${API_PRODUCTS_ROUTE}/${product.id}`)
      .then(() => {
        fetchProducts();
        toast.dark('Item deleted successfully');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong. Please try again');
      });
  };

  return (
    <>
      <Card className="shadow m-1">
        <div className={styles.grid}>
          <ImageFadeIn
            src={product.pictureUrl}
            width="100%"
            opacityTransition={2}
          />

          <Card.Body className={styles.cardBody}>
            <div className={styles.bodyGrid}>
              <div>
                <p className={`${styles.font} font-weight-bold`}>
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
                    onClick={() => displayEditModalHandler()}
                  >
                    <PencilSquare />
                  </Button>

                  <Button
                    variant="no-margin"
                    onClick={() => displayConfirmationModalHandler()}
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
