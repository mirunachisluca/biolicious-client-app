import React from 'react';
import { Button, Card } from 'react-bootstrap';
// import { CartPlus } from 'react-bootstrap-icons';
import { useRouteMatch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import styles from './ProductCard.module.scss';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { addItemToCart } from '../../store/shoppingCart/shoppingCartActions';
import { calculatePriceWithTwoDecimals } from '../../helpers/pricesCalculator';

function ProductCard({ product }) {
  const { path } = useRouteMatch();
  const { dispatch } = React.useContext(ShoppingCartContext);

  let url = path;

  if (
    product.productSubcategory != null &&
    !path.includes(product.productSubcategory.toLowerCase())
  ) {
    url = `${path}/${product.productSubcategory.toLowerCase()}`;
  }

  return (
    <>
      <Card className={`${styles.card} shadow`}>
        <LinkContainer key={product.id} to={`${url}/${product.urlName}`}>
          <Card.Img
            variant="top"
            src="../../product.jpg"
            className={styles.pointerCursor}
          />
        </LinkContainer>

        <Card.Body>
          <div className={`${styles.titleDiv}`}>
            <LinkContainer key={product.id} to={`${url}/${product.urlName}`}>
              <h5 className={`${styles.title} ${styles.pointerCursor}`}>
                {product.name}
              </h5>
            </LinkContainer>

            <p className={`${styles.weight}`}>{product.weight}</p>
          </div>

          <div className={`${styles.priceDiv}`}>
            <p className={`${styles.price}`}>
              {`${calculatePriceWithTwoDecimals(product.price)} €`}
            </p>

            <Button
              variant="outline-black"
              className={styles.addToCartButton}
              onClick={() => {
                dispatch(
                  addItemToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    pictureUrl: product.pictureUrl,
                    brand: product.productBrand,
                    category: product.productCategory
                  })
                );
              }}
            >
              {/* <CartPlus className={styles.cartIcon} /> */}
              Add to cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export { ProductCard };
