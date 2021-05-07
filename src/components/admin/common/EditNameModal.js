import React from 'react';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';

function EditNameModal({ show, close, save, text, textChange }) {
  return (
    <Modal show={show} onHide={close} animation={false}>
      <Modal.Header>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <FormControl
            type="text"
            placeholder="Name"
            value={text}
            onChange={(e) => {
              textChange(e.target.value);
            }}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-black" onClick={close}>
          Cancel
        </Button>
        <Button variant="outline-black" onClick={save}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { EditNameModal };
