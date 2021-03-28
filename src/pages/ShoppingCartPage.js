import React from 'react';
import { Table } from 'react-bootstrap';

import { MenuBar } from '../components/navbar/MenuBar';
import { ShoppingCartItem } from '../components/shoppingCart/ShoppingCartItem';
import { ShoppingCartContext } from '../context/ShoppingCartContext';

import styles from './css/ShoppingCartPage.module.scss';

function ShoppingCartPage() {
  const { items } = React.useContext(ShoppingCartContext);

  return (
    <>
      <MenuBar navbarData={[]} />
      <h1>SHOPPING CART</h1>

      <Table className={`${styles.table}`}>
        <thead>
          <tr>
            <th>Products</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ShoppingCartItem key={item.id} item={item} />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export { ShoppingCartPage };
