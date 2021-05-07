import React from 'react';
import { Modal } from 'react-bootstrap';

function CategoriesModal({ show, close }) {
  return (
    <>
      <Modal size="lg" show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Categories</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>categories</p>
        </Modal.Body>

        <Modal.Footer />
      </Modal>
    </>
  );
}

export { CategoriesModal };
