import React from 'react';
import { Modal } from 'react-bootstrap';
import { ItemSummaryCard } from './ItemSummaryCard';

function RecipeItemsSummary({ show, handleClose, items }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      backdrop="static"
      scrollable
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Summary</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {items.map((item) => (
          <ItemSummaryCard key={item.id} item={item} />
        ))}
      </Modal.Body>
    </Modal>
  );
}

export { RecipeItemsSummary };
