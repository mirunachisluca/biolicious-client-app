import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import styles from './css/HomePage.module.scss';

function Homepage() {
  return (
    <>
      <div className={styles.page}>
        <Jumbotron className={styles.shopBackground}>
          <div className={styles.textRectangle}>
            <h1>Shop</h1>

            <p>Buy fresh groceries from our local producers</p>

            <p>
              <LinkContainer key="shop-button" to="/shop">
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
              <LinkContainer key="recipes-button" to="/recipes">
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
