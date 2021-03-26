import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { MenuBar } from '../components/navbar/MenuBar';
// import { ShoppingCartContext } from '../context/ShoppingCartContext';

import styles from './css/home-page.module.scss';

function Homepage() {
  return (
    <>
      <MenuBar navbarData={[]} />

      {/* <ShoppingCartContext.Consumer>
        {({ loadShoppingCart }) => loadShoppingCart()}
      </ShoppingCartContext.Consumer> */}

      <div>
        <Jumbotron className={styles.shopBackground}>
          <div className={styles.textRectangle}>
            <h1>Shop</h1>

            <p>Buy fresh groceries from our local producers</p>

            <p>
              <LinkContainer to="/shop">
                <Button variant="outline-light">Go to shop</Button>
              </LinkContainer>
            </p>
          </div>
        </Jumbotron>

        <Jumbotron className={styles.recipesBackground}>
          <div className={styles.textRectangle}>
            <h1>Recipes</h1>

            <p>
              Check out our selection of recipes and shop ingredients with just
              one click
            </p>

            <p>
              <LinkContainer to="/recipes">
                <Button variant="outline-light">Go to recipes</Button>
              </LinkContainer>
            </p>
          </div>
        </Jumbotron>
      </div>
    </>
  );
}

export { Homepage };
