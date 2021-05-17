import React from 'react';
import { Card } from 'react-bootstrap';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { calculatePriceWithTwoDecimals } from '../../helpers/pricesCalculator';

import styles from './ShoppingCartTotal.module.scss';

function ShoppingCartTotal() {
  const { calculateTotal, calculateSavedAmount } =
    React.useContext(ShoppingCartContext);

  return (
    <>
      <Card className={`${styles.card} shadow`}>
        <Card.Title>Subtotal</Card.Title>
        <Card.Body>
          <div className={styles.grid}>
            <p className="font-weight-bold">Shipping:</p>
            <p>next step</p>

            <p className="font-weight-bold">Saved amount:</p>
            <p>
              {' '}
              {`${calculatePriceWithTwoDecimals(calculateSavedAmount())} €`}
            </p>

            <p className="font-weight-bold">Subtotal:</p>
            <p>{`${calculatePriceWithTwoDecimals(calculateTotal())} €`}</p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
export { ShoppingCartTotal };
