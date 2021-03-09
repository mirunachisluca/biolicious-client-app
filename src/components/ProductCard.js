import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { CartPlus } from 'react-bootstrap-icons';

import styles from './product-card.module.scss';

function ProductCard({ name, price }) {
  return (
    <>
      <Card className={`${styles.card} shadow`}>
        <Card.Img
          variant="top"
          src="../../product.jpg"
          className={styles.pointerCursor}
          onClick={() => {
            alert('ok');
          }}
        />

        <Card.Body>
          <Card.Title
            className={styles.pointerCursor}
            onClick={() => {
              alert('ok');
            }}
          >
            {name}
          </Card.Title>

          <Card.Text>{price}</Card.Text>
          <Button
            variant="dark"
            className={styles.addToCartButton}
            onClick={() => {
              alert('CLICK');
            }}
          >
            <CartPlus className={styles.cartIcon} />
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export { ProductCard };
