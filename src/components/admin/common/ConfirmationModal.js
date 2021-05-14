import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ConfirmationModal({ show, close, yesActionHandler, noActionHandler }) {
  return (
    <Modal show={show} onHide={close} animation={false}>
      <Modal.Header closeButton />
      <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="black"
          onClick={(e) => {
            e.preventDefault();
            noActionHandler();
          }}
        >
          No
        </Button>

        <Button
          variant="outline-black"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            yesActionHandler();
          }}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ConfirmationModal };
