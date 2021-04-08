import React from 'react';
import { Card } from 'react-bootstrap';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { calculatePriceWithTwoDecimals } from '../../helpers/pricesCalculator';

import styles from './ShoppingCartTotal.module.scss';

function ShoppingCartTotal() {
  const { items } = React.useContext(ShoppingCartContext);
  let total = 0;

  items.forEach((item) => {
    total += item.quantity * item.price;
  });

  return (
    <>
      <Card className={`${styles.card} shadow`}>
        <Card.Title>Subtotal</Card.Title>
        <Card.Body>
          <table className={`${styles.subtotalTable}`}>
            <tbody>
              <tr>
                <th>Shipping:</th>
                <td>next step</td>
              </tr>

              <tr>
                <th>Subtotal:</th>
                <td>{`${calculatePriceWithTwoDecimals(total)} €`}</td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </>
  );
}
export { ShoppingCartTotal };
