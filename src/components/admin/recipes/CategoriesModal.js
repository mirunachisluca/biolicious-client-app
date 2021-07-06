import React from 'react';
import { Modal } from 'react-bootstrap';

import { axiosInstance } from '../../../api/axios';
import { useModal } from '../../../customHooks/useModal';
import { API_RECIPE_CATEGORIES_ROUTE } from '../../../routes/apiRoutes';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { EditNameModal } from '../common/EditNameModal';
import { ListItemWithActions } from '../common/ListItemWithActions';
import { NewInputForm } from '../common/NewInputForm';

function CategoriesModal({
  visible,
  show,
  close,
  categories,
  fetchRecipeCategories
}) {
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

  const addCategoryHandler = (category) => {
    axiosInstance
      .post(API_RECIPE_CATEGORIES_ROUTE, { name: category })
      .then(() => fetchRecipeCategories())
      .catch((error) => console.log(error));
  };

  const editCategoryHandler = () => {
    axiosInstance
      .put(API_RECIPE_CATEGORIES_ROUTE, selectedItem)
      .then(() => {
        fetchRecipeCategories();
        hideEditModalHandler();
      })
      .catch((error) => console.log(error));
  };

  const deleteCategoryHandler = () => {
    axiosInstance
      .delete(`${API_RECIPE_CATEGORIES_ROUTE}/${selectedItem.id}`)
      .then(() => {
        fetchRecipeCategories();
        hideConfirmationModalHandler();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Modal show={visible} onHide={close} animation={false} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Categories</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <NewInputForm
            placeholder="Category name"
            addHandler={addCategoryHandler}
          />

          <br />

          {categories.status === 'FETCHED' ? (
            <ol className="list-style-none">
              {categories.data.map((category) => (
                <ListItemWithActions
                  key={category.id}
                  item={category}
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
        save={editCategoryHandler}
        text={selectedItem.name}
        textChange={selectedItemHandler}
      />

      <ConfirmationModal
        show={displayConfirmationModal}
        close={hideConfirmationModalHandler}
        yesActionHandler={deleteCategoryHandler}
        noActionHandler={hideConfirmationModalHandler}
      />
    </>
  );
}

export { CategoriesModal };
