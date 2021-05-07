import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ConfirmationModal({ show, close, yesActionHandler, noActionHandler }) {
  return (
    <Modal show={show} onHide={close} animation={false}>
      <Modal.Header closeButton />
      <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-black" onClick={noActionHandler}>
          No
        </Button>
        <Button variant="outline-black" onClick={yesActionHandler}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ConfirmationModal };
