import React from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { ShoppingCartItem } from '../components/shoppingCart/ShoppingCartItem';
import { ShoppingCartTotal } from '../components/shoppingCart/ShoppingCartTotal';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import { CHECKOUT_PAGE_ROUTE, SHOP_PAGE_ROUTE } from '../routes/pageRoutes';

import styles from './css/ShoppingCartPage.module.scss';

function ShoppingCartPage() {
  const { items, fetchShoppingCart, status } =
    React.useContext(ShoppingCartContext);

  React.useEffect(() => fetchShoppingCart(localStorage.getItem('cartId')), []);

  return (
    <>
      <br />
      <h3 className="uppercase-bembo">Your shopping cart</h3>
      <br />
      <br />

      {status === 'FETCHED' && items.length === 0 && (
        <>
          <p>You don&apos;t have any items in your cart</p>

          <LinkContainer to={SHOP_PAGE_ROUTE}>
            <a href="/shop">Start shopping now</a>
          </LinkContainer>
        </>
      )}

      <div className={`${styles.flex}`}>
        {status === 'LOADING' ||
          (status === 'PENDING' && (
            <div className={styles.spinner}>
              <Spinner animation="border" />
            </div>
          ))}

        {status === 'FETCHED' && items.length !== 0 && (
          <>
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

              <LinkContainer to={CHECKOUT_PAGE_ROUTE}>
                <Button
                  variant="outline-black"
                  className={`${styles.checkoutButton}`}
                >
                  CHECKOUT
                </Button>
              </LinkContainer>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export { ShoppingCartPage };
