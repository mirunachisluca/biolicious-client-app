import React from 'react';
import { Modal } from 'react-bootstrap';

import { axiosInstance } from '../../../api/axios';

import { useModal } from '../../../customHooks/useModal';
import { API_DIETS_ROUTE } from '../../../routes/apiRoutes';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { EditNameModal } from '../common/EditNameModal';
import { ListItemWithActions } from '../common/ListItemWithActions';
import { NewInputForm } from '../common/NewInputForm';

function DietsModal({ visible, show, close, diets, fetchRecipeDiets }) {
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

  const addDietHandler = (diet) => {
    axiosInstance
      .post(API_DIETS_ROUTE, { name: diet })
      .then(() => fetchRecipeDiets())
      .catch((error) => console.log(error));
  };

  const editDietHandler = () => {
    axiosInstance
      .put(API_DIETS_ROUTE, selectedItem)
      .then(() => {
        fetchRecipeDiets();
        hideEditModalHandler();
      })
      .catch((error) => console.log(error));
  };

  const deleteDietHandler = () => {
    axiosInstance
      .delete(`${API_DIETS_ROUTE}/${selectedItem.id}`)
      .then(() => {
        fetchRecipeDiets();
        hideConfirmationModalHandler();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Modal show={visible} onHide={close} animation={false} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Diets</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <NewInputForm placeholder="Diet name" addHandler={addDietHandler} />

          <br />

          {diets.status === 'FETCHED' ? (
            <ol className="list-style-none">
              {diets.data.map((diet) => (
                <ListItemWithActions
                  key={diet.id}
                  item={diet}
                  displayEditModalHandler={displayEditModalHandler}
                  displayConfirmationModalHandler={
                    displayConfirmationModalHandler
                  }
                />
              ))}
            </ol>
          ) : (
            <p>Loading</p>
          )}
        </Modal.Body>
      </Modal>

      <EditNameModal
        show={displayEditModal}
        close={hideEditModalHandler}
        save={editDietHandler}
        text={selectedItem.name}
        textChange={selectedItemHandler}
      />

      <ConfirmationModal
        show={displayConfirmationModal}
        close={hideConfirmationModalHandler}
        yesActionHandler={deleteDietHandler}
        noActionHandler={hideConfirmationModalHandler}
      />
    </>
  );
}

export { DietsModal };
