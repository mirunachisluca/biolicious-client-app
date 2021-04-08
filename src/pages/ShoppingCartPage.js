import React from 'react';
import { Button, Table } from 'react-bootstrap';

import { ShoppingCartItem } from '../components/shoppingCart/ShoppingCartItem';
import { ShoppingCartTotal } from '../components/shoppingCart/ShoppingCartTotal';
import { ShoppingCartContext } from '../context/ShoppingCartContext';

import styles from './css/ShoppingCartPage.module.scss';

function ShoppingCartPage() {
  const { items } = React.useContext(ShoppingCartContext);

  return (
    <>
      <br />
      <h3 className="uppercase-bembo">Your shopping cart</h3>
      <br />
      <br />

      <div className={`${styles.flex}`}>
        <Table className={`${styles.table} shadow`}>
          <thead>
            <tr>
              <th className={`${styles.alignLeft}`}>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>{}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <ShoppingCartItem key={item.id} item={item} />
            ))}
          </tbody>
        </Table>

        <div className={`${styles.priceCard}`}>
          <ShoppingCartTotal />
          <Button
            variant="outline-black"
            className={`${styles.checkoutButton}`}
          >
            CHECKOUT
          </Button>
        </div>
      </div>
    </>
  );
}

export { ShoppingCartPage };
