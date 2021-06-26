import React from 'react';
import { Card } from 'react-bootstrap';

import styles from './IngredientsCard.module.scss';

function IngredientsCard({ ingredientsList }) {
  return (
    <>
      <Card className={`${styles.card} shadow`}>
        <br />
        <Card.Title>Ingredients</Card.Title>

        <Card.Body>
          <ul>
            {ingredientsList.map((ingredient) => (
              <li key={ingredient.id} className={styles.ingredient}>
                {`${ingredient.quantity} ${
                  ingredient.measure === null ? '' : ingredient.measure
                } ${ingredient.productName}`}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </>
  );
}

export { IngredientsCard };
