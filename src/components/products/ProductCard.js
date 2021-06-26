import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import ImageFadeIn from 'react-image-fade-in';
import { toast } from 'react-toastify';

import styles from './ProductCard.module.scss';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { addItemToCart } from '../../store/shoppingCart/shoppingCartActions';
import { calculatePriceWithTwoDecimals } from '../../helpers/pricesCalculator';
import { convertToUrl } from '../../helpers/convertToUrl';

function ProductCard({ product }) {
  const { path } = useRouteMatch();
  const { dispatch } = React.useContext(ShoppingCartContext);

  let url = path;

  if (
    product.productSubcategory != null &&
    !path.includes(convertToUrl(product.productSubcategory.toLowerCase()))
  ) {
    url = `${path}/${product.productSubcategory.toLowerCase()}`;
  }

  return (
    <>
      <Card className={`${styles.card} shadow`}>
        <LinkContainer key={product.id} to={`${url}/${product.urlName}`}>
          <ImageFadeIn
            src={product.pictureUrl}
            className={`${styles.pointerCursor}  ${styles.productImage}`}
            opacityTransition={1}
          />
        </LinkContainer>

        <Card.Body>
          <div className={`${styles.titleDiv}`}>
            <div>
              <LinkContainer key={product.id} to={`${url}/${product.urlName}`}>
                <h5 className={`${styles.title} ${styles.pointerCursor}`}>
                  {`${product.name} `}

                  {product.newEntry && (
                    <Badge pill variant="dark" className={styles.badge}>
                      NEW
                    </Badge>
                  )}

                  {product.discount !== 0 && (
                    <Badge pill variant="dark" className={styles.badge}>
                      %
                    </Badge>
                  )}
                </h5>
              </LinkContainer>
            </div>

            <p className={`${styles.weight}`}>{product.weight}</p>
          </div>

          <div className={`${styles.priceDiv}`}>
            <p className={`${styles.price}`}>
              {`${calculatePriceWithTwoDecimals(
                product.price - (product.discount * product.price) / 100
              )} €`}
            </p>

            <Button
              variant="outline-black"
              className={styles.addToCartButton}
              disabled={product.stock === 0}
              onClick={() => {
                dispatch(
                  addItemToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    discount: product.discount,
                    weight: product.weight,
                    quantity: 1,
                    pictureUrl: product.pictureUrl,
                    brand: product.productBrand,
                    category: product.productCategory,
                    subcategory: product.productSubcategory
                  })
                );

                toast.dark('Item added to cart');
              }}
            >
              {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export { ProductCard };
