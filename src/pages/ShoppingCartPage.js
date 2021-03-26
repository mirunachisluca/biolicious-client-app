import React from 'react';
import { Table } from 'react-bootstrap';

import { MenuBar } from '../components/navbar/MenuBar';
import { ShoppingCartItem } from '../components/shoppingCart/ShoppingCartItem';
import { ShoppingCartContext } from '../context/ShoppingCartContext';

import styles from './css/ShoppingCartPage.module.scss';

function ShoppingCartPage() {
  const { items } = React.useContext(ShoppingCartContext);

  console.log(items);

  return (
    <>
      <MenuBar navbarData={[]} />
      <h1>SHOPPING CART</h1>
      {/* <ol className={`${styles.cartItems}`}>
        {items.map((item) => (
          <ShoppingCartItem id={item.id} item={item} />
        ))}
      </ol> */}

      <Table className={`${styles.table}`}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ShoppingCartItem id={item.id} item={item} />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export { ShoppingCartPage };
