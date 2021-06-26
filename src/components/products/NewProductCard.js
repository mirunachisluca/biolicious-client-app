import React from 'react';

import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ImageFadeIn from 'react-image-fade-in';
import { useRouteMatch } from 'react-router-dom';

import { calculatePriceWithTwoDecimals } from '../../helpers/pricesCalculator';

import styles from './NewProductCard.module.scss';
import { convertToUrl } from '../../helpers/convertToUrl';

function NewProductCard({ product }) {
  const { path } = useRouteMatch();

  function getProductUrl() {
    let url = path;
    url += `/${convertToUrl(product.productCategory)}`;
    if (product.productSubcategory != null) {
      url += `/${convertToUrl(product.productSubcategory)}`;
    }
    url += `/${product.urlName}`;

    return url;
  }

  return (
    <Card className={`${styles.card} shadow`}>
      <LinkContainer to={getProductUrl()}>
        <ImageFadeIn
          src={product.pictureUrl}
          width="100%"
          className="pointerCursor"
        />
      </LinkContainer>

      <Card.Body>
        <div className={styles.cardBody}>
          <div className="text-left">
            <LinkContainer to={getProductUrl()}>
              <span className="font-weight-bold pointerCursor">{`${product.name} `}</span>
            </LinkContainer>

            <br />

            <span>{product.weight}</span>
          </div>

          <span className="text-right">
            {`${calculatePriceWithTwoDecimals(
              product.price - (product.discount * product.price) / 100
            )} €`}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export { NewProductCard };
