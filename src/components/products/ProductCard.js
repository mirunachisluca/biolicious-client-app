import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { CartPlus } from 'react-bootstrap-icons';
import { useRouteMatch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import styles from './ProductCard.module.scss';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { addItemToCart } from '../../store/shoppingCart/shoppingCartActions';
import { calculatePriceWithTwoDecimals } from '../../helpers/pricesCalculator';

function ProductCard({ id, name, price, urlName, subcategory }) {
  const { path } = useRouteMatch();
  const { dispatch } = React.useContext(ShoppingCartContext);

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
            <Card.Title className={styles.pointerCursor}>{name}</Card.Title>
          </LinkContainer>

          <Card.Text>{calculatePriceWithTwoDecimals(price)}</Card.Text>

          <Button
            variant="dark"
            className={styles.addToCartButton}
            onClick={() => {
              dispatch(
                addItemToCart({
                  id,
                  name,
                  price,
                  quantity: 1,
                  pictureUrl: '',
                  brand: '',
                  category: ''
                })
              );
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
