import React from 'react';

import { Modal } from 'react-bootstrap';

import { axiosInstance } from '../../../api/axios';
import { EditNameModal } from '../common/EditNameModal';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { API_PRODUCT_BRANDS_ROUTE } from '../../../routes/apiRoutes';
import { NewInputForm } from '../common/NewInputForm';
import { ListItemWithActions } from '../common/ListItemWithActions';
import { BrandsContext } from '../../../context/BrandsContext';
import { useModal } from '../../../customHooks/useModal';

function BrandsModal({ visible, show, close }) {
  const { brands, fetchBrands } = React.useContext(BrandsContext);

  const {
    selectedItem,
    selectedItemHandler,
    displayEditModal,
    displayConfirmationModal,
    displayEditModalHandler,
    displayConfirmationModalHandler,
    hideEditModalHandler,
    hideConfirmationModalHandler
  } = useModal(show, close);

  const addBrandHandler = (brand) => {
    axiosInstance
      .post(API_PRODUCT_BRANDS_ROUTE, { name: brand })
      .then(() => fetchBrands())
      .catch((error) => console.log(error));
  };

  const editBrandHandler = () => {
    axiosInstance
      .put(API_PRODUCT_BRANDS_ROUTE, selectedItem)
      .then(() => {
        fetchBrands();
        hideEditModalHandler();
      })
      .catch((error) => console.log(error));
  };

  const deleteBrandHandler = () => {
    axiosInstance
      .delete(`${API_PRODUCT_BRANDS_ROUTE}/${selectedItem.id}`)
      .then(() => {
        fetchBrands();
        hideConfirmationModalHandler();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Modal show={visible} onHide={close} animation={false} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Brands</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <NewInputForm placeholder="Brand name" addHandler={addBrandHandler} />

          <br />

          {brands.status === 'FETCHED' ? (
            <ol className="list-style-none">
              {brands.result.map((brand) => (
                <ListItemWithActions
                  key={brand.id}
                  item={brand}
                  displayEditModalHandler={displayEditModalHandler}
                  displayConfirmationModalHandler={
                    displayConfirmationModalHandler
                  }
                />
              ))}
            </ol>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
      </Modal>

      <EditNameModal
        show={displayEditModal}
        close={hideEditModalHandler}
        save={editBrandHandler}
        text={selectedItem.name}
        textChange={selectedItemHandler}
      />

      <ConfirmationModal
        show={displayConfirmationModal}
        close={hideConfirmationModalHandler}
        yesActionHandler={deleteBrandHandler}
        noActionHandler={hideConfirmationModalHandler}
      />
    </>
  );
}

export { BrandsModal };
