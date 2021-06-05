import React from 'react';

import { Accordion, Card, Modal } from 'react-bootstrap';
import { axiosInstance } from '../../../api/axios';
import { MenuBarContext } from '../../../context/MenuBarContext';
import {
  API_PRODUCT_CATEGORIES_ROUTE,
  PRODUCT_SUBCATEGORY_ROUTE
} from '../../../routes/apiRoutes';
import {
  closeCategoriesModal,
  showCategoriesModal
} from '../../../store/admin/productsTabActions';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { EditNameModal } from '../common/EditNameModal';
import { ListItemWithActions } from '../common/ListItemWithActions';
import { NewInputForm } from '../common/NewInputForm';

import styles from './CategoriesModal.module.scss';

function CategoriesModal({ show, close, dispatch }) {
  const [displayCategoryEditModal, setDisplayCategoryEditModal] =
    React.useState(false);
  const [
    displayCategoryConfirmationModal,
    setDisplayCategoryConfirmationModal
  ] = React.useState(false);

  const [displaySubcategoryEditModal, setDisplaySubcategoryEditModal] =
    React.useState(false);
  const [
    displaySubcategoryConfirmationModal,
    setDisplaySubcategoryConfirmationModal
  ] = React.useState(false);

  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedSubcategory, setSelectedSubcategory] = React.useState('');

  const { shopData, fetchProductCategories, setProductCategoriesSort } =
    React.useContext(MenuBarContext);

  React.useEffect(() => setProductCategoriesSort('latest'), []);

  function addNewCategoryHandler(inputValue) {
    axiosInstance
      .post(API_PRODUCT_CATEGORIES_ROUTE, { name: inputValue })
      .then(() => {
        fetchProductCategories();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addNewSubcategoryHandler = (inputValue) => {
    const newCategory = {
      ...selectedCategory,
      subcategories: [...selectedCategory.subcategories, { name: inputValue }]
    };

    axiosInstance
      .put(API_PRODUCT_CATEGORIES_ROUTE, newCategory)
      .then(() => {
        fetchProductCategories();
        setDisplayCategoryEditModal(false);
      })
      .catch((error) => console.log(error));

    dispatch(showCategoriesModal);
  };

  const displayCategoryEditModalHandler = (category) => {
    setDisplayCategoryEditModal(true);
    setSelectedCategory(category);
    dispatch(closeCategoriesModal);
  };

  const displaySubcategoryEditModalHandler = (subcategory) => {
    setDisplaySubcategoryEditModal(true);
    setSelectedSubcategory(subcategory);
    dispatch(closeCategoriesModal);
  };

  const hideCategoryEditModalHandler = () => {
    setDisplayCategoryEditModal(false);
    dispatch(showCategoriesModal);
  };

  const hideSubcategoryEditModalHandler = () => {
    setDisplaySubcategoryEditModal(false);
    dispatch(showCategoriesModal);
  };

  const displayCategoryConfirmationModalHandler = (category) => {
    setDisplayCategoryConfirmationModal(true);
    setSelectedCategory(category);
    dispatch(closeCategoriesModal);
  };

  const displaySubcategoryConfirmationModalHandler = (subcategory) => {
    setDisplaySubcategoryConfirmationModal(true);
    setSelectedSubcategory(subcategory);
    dispatch(closeCategoriesModal);
  };

  const hideCategoryConfirmationModalHandler = () => {
    setDisplayCategoryConfirmationModal(false);
    dispatch(showCategoriesModal);
  };

  const hideSubcategoryConfirmationModalHandler = () => {
    setDisplaySubcategoryConfirmationModal(false);
    dispatch(showCategoriesModal);
  };

  const deleteCategoryHandler = () => {
    axiosInstance
      .delete(`${API_PRODUCT_CATEGORIES_ROUTE}/${selectedCategory.id}`)
      .then(() => {
        fetchProductCategories();
      })
      .catch((error) => console.log(error));

    setDisplayCategoryConfirmationModal(false);
    dispatch(showCategoriesModal);
  };

  const deleteSubcategoryHandler = () => {
    axiosInstance
      .delete(`${PRODUCT_SUBCATEGORY_ROUTE}/${selectedSubcategory.id}`)
      .then(() => {
        fetchProductCategories();
      })
      .catch((error) => console.log(error));

    setDisplaySubcategoryConfirmationModal(false);
    dispatch(showCategoriesModal);
  };

  const categoryNameHandler = (name) => {
    setSelectedCategory({ ...selectedCategory, name });
  };

  const subcategoryNameHandler = (name) => {
    setSelectedSubcategory({ ...selectedSubcategory, name });
  };

  const editCategoryHandler = () => {
    axiosInstance
      .put(API_PRODUCT_CATEGORIES_ROUTE, selectedCategory)
      .then(() => {
        fetchProductCategories();
        setDisplayCategoryEditModal(false);
      })
      .catch((error) => console.log(error));

    dispatch(showCategoriesModal);
  };

  const editSubcategoryHandler = () => {
    axiosInstance
      .put(PRODUCT_SUBCATEGORY_ROUTE, {
        ...selectedSubcategory,
        ProductCategoryId: selectedCategory.id
      })
      .then(() => {
        fetchProductCategories();
        setDisplaySubcategoryEditModal(false);
      })
      .catch((error) => console.log(error));

    dispatch(showCategoriesModal);
  };

  return (
    <>
      <Modal show={show} onHide={close} animation={false} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Categories</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <NewInputForm
            placeholder="Category name"
            addHandler={addNewCategoryHandler}
          />
          <ul className="no-list-style ">
            {shopData.status === 'FETCHED' &&
              shopData.data.map((category) => (
                <Accordion key={category.id}>
                  <Card>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey={category.id}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <ListItemWithActions
                        key={category.id}
                        item={category}
                        displayEditModalHandler={
                          displayCategoryEditModalHandler
                        }
                        displayConfirmationModalHandler={
                          displayCategoryConfirmationModalHandler
                        }
                      />
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey={category.id}>
                      <Card.Body>
                        <NewInputForm
                          placeholder="New subcategory name"
                          addHandler={addNewSubcategoryHandler}
                        />

                        {category.subcategories.length !== 0 && (
                          <ul className="list-style-none">
                            {category.subcategories.map((subcategory) => (
                              <ListItemWithActions
                                key={subcategory.id}
                                item={subcategory}
                                displayEditModalHandler={
                                  displaySubcategoryEditModalHandler
                                }
                                displayConfirmationModalHandler={
                                  displaySubcategoryConfirmationModalHandler
                                }
                              />
                            ))}
                          </ul>
                        )}

                        {category.subcategories.length === 0 && (
                          <span className={styles.message}>
                            This category doesn&apos;t have subcategories
                          </span>
                        )}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              ))}
          </ul>
        </Modal.Body>
      </Modal>

      <EditNameModal
        show={displayCategoryEditModal}
        close={hideCategoryEditModalHandler}
        save={editCategoryHandler}
        text={selectedCategory.name}
        textChange={categoryNameHandler}
      />

      <ConfirmationModal
        show={displayCategoryConfirmationModal}
        close={hideCategoryConfirmationModalHandler}
        yesActionHandler={deleteCategoryHandler}
        noActionHandler={hideCategoryConfirmationModalHandler}
      />

      <EditNameModal
        show={displaySubcategoryEditModal}
        close={hideSubcategoryEditModalHandler}
        save={editSubcategoryHandler}
        text={selectedSubcategory.name}
        textChange={subcategoryNameHandler}
      />

      <ConfirmationModal
        show={displaySubcategoryConfirmationModal}
        close={hideSubcategoryConfirmationModalHandler}
        yesActionHandler={deleteSubcategoryHandler}
        noActionHandler={hideSubcategoryConfirmationModalHandler}
      />
    </>
  );
}

export { CategoriesModal };
