import React from 'react';
import { Card } from 'react-bootstrap';

import styles from './filters.module.scss';

function BrandFilter({ brands, brandHandler }) {
  return (
    <>
      <Card className={`${styles.filterCard} shadow`}>
        <Card.Body>
          <Card.Title>brands</Card.Title>
          <ul>
            {brands.map((brand) => (
              <button
                type="button"
                key={brand.id}
                onClick={() => {
                  brandHandler(brand.id, brand.name);
                }}
                className={styles.filterItem}
              >
                {brand.name}
              </button>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </>
  );
}

export { BrandFilter };
