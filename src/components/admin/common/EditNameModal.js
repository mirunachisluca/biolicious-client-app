import React from 'react';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';

function EditNameModal({ show, close, save, text, textChange }) {
  return (
    <Modal show={show} onHide={close} animation={false}>
      <Modal.Header>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <FormControl
            type="text"
            placeholder="Name"
            value={text}
            onChange={(e) => {
              textChange(e.target.value);
            }}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="black"
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
          >
            Cancel
          </Button>

          <Button
            variant="outline-black"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              save();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export { EditNameModal };
