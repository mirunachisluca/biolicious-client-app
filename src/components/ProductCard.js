import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { CartPlus } from 'react-bootstrap-icons';
import { useRouteMatch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import styles from './product-card.module.scss';

function ProductCard({ id, name, price, urlName, subcategory }) {
  const { path } = useRouteMatch();
  let url = path;

  if (subcategory != null && !path.includes(subcategory.toLowerCase())) {
    url = `${path}/${subcategory.toLowerCase()}`;
  }

  return (
    <>
      <Card className={`${styles.card} shadow`}>
        <LinkContainer key={id} to={`${url}/${urlName}`}>
          <Card.Img
            variant="top"
            src="../../product.jpg"
            className={styles.pointerCursor}
          />
        </LinkContainer>

        <Card.Body>
          <LinkContainer key={id} to={`${url}/${urlName}`}>
            <Card.Title
              className={styles.pointerCursor}
              onClick={() => {
                // alert('ok');
                // <LinkContainer to="/shop/:name">
                //   <ProductPage />
                // </LinkContainer>;
              }}
            >
              {name}
            </Card.Title>
          </LinkContainer>

          <Card.Text>{price}</Card.Text>
          <Button
            variant="dark"
            className={styles.addToCartButton}
            onClick={() => {
              // alert('CLICK');
            }}
          >
            <CartPlus className={styles.cartIcon} />
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export { ProductCard };
