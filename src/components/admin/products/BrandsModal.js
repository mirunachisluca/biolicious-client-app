import React from 'react';

import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormGroup,
  Modal
} from 'react-bootstrap';
import { PencilSquare, PlusCircle, Trash } from 'react-bootstrap-icons';
import { axiosInstance } from '../../../api/axios';
import { EditNameModal } from '../common/EditNameModal';
import { ConfirmationModal } from '../common/ConfirmationModal';

import styles from './BrandsModal.module.scss';
import { API_PRODUCT_BRANDS_ROUTE } from '../../../routes/apiRoutes';
import {
  closeBrandsModal,
  showBrandsModal
} from '../../../store/admin/productsTabActions';

function BrandsModal({ show, close, dispatch }) {
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [
    displayConfirmationModal,
    setDisplayConfirmationModal
  ] = React.useState(false);
  const [selectedBrand, setBrand] = React.useState('');
  const [newBrandInput, setNewBrandInput] = React.useState('');

  const [brands, setBrands] = React.useState({
    status: 'PENDING',
    result: null
  });

  function fetchBrands() {
    axiosInstance
      .get(API_PRODUCT_BRANDS_ROUTE)
      .then((response) => {
        if (response.status === 200) {
          setBrands({ status: 'FETCHED', result: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    fetchBrands();
  }, []);

  const displayEditModalHandler = (brand) => {
    setDisplayEditModal(true);
    setBrand(brand);
    dispatch(closeBrandsModal);
  };

  const hideEditModalHandler = () => {
    setDisplayEditModal(false);
    dispatch(showBrandsModal);
  };

  const displayConfirmationModalHandler = (brand) => {
    setDisplayConfirmationModal(true);
    setBrand(brand);
    dispatch(closeBrandsModal);
  };

  const hideConfirmationModalHandler = () => {
    setDisplayConfirmationModal(false);
    dispatch(showBrandsModal);
  };

  const deleteBrandHandler = () => {
    axiosInstance
      .delete(`${API_PRODUCT_BRANDS_ROUTE}/${selectedBrand.id}`)
      .then(() => {
        fetchBrands();
      })
      .catch((error) => console.log(error));

    setDisplayConfirmationModal(false);
    dispatch(showBrandsModal);
  };

  const brandNameHandler = (name) => {
    setBrand({ ...selectedBrand, name });
  };

  const editBrandHandler = () => {
    axiosInstance
      .put(API_PRODUCT_BRANDS_ROUTE, selectedBrand)
      .then(() => {
        fetchBrands();
        setDisplayEditModal(false);
      })
      .catch((error) => console.log(error));
    dispatch(showBrandsModal);
  };

  const addBrandHandler = (e) => {
    e.preventDefault();
    axiosInstance
      .post(API_PRODUCT_BRANDS_ROUTE, { name: newBrandInput })
      .then(() => {
        fetchBrands();
        setNewBrandInput('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Modal show={show} onHide={close} animation={false} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Brands</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Brand name"
                className={styles.brandInput}
                value={newBrandInput}
                onChange={(e) => setNewBrandInput(e.target.value)}
              />
              <Button
                type="submit"
                variant="no-margin"
                onClick={addBrandHandler}
              >
                <PlusCircle />
              </Button>
            </FormGroup>
          </Form>

          <br />

          {brands.status === 'FETCHED' && (
            <ol className={styles.noListStyle}>
              {brands.result.map((brand) => (
                <li key={brand.id}>
                  <div className={styles.grid}>
                    <span>{brand.name}</span>

                    <ButtonGroup>
                      <Button
                        variant="no-margin"
                        onClick={() => displayEditModalHandler(brand)}
                      >
                        <PencilSquare />
                      </Button>

                      <Button
                        variant="no-margin"
                        onClick={() => displayConfirmationModalHandler(brand)}
                      >
                        <Trash />
                      </Button>
                    </ButtonGroup>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Modal.Body>
      </Modal>

      <EditNameModal
        show={displayEditModal}
        close={hideEditModalHandler}
        save={editBrandHandler}
        text={selectedBrand.name}
        textChange={brandNameHandler}
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
