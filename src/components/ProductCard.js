import React from "react";
import { Button, Card } from "react-bootstrap";

import styles from "./product-card.module.scss";

function ProductCard({ name, price }) {
  return (
    <>
      <Card className={styles.card}>
        <Card.Img variant="top" src="../../product.jpg" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{price}</Card.Text>
          <Button variant="primary">Add to cart</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export { ProductCard };
