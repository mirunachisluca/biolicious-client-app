import React from 'react';
import { Card } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

import styles from './filters.module.scss';

function BrandFilter({ brands, brandHandler, activeButton, dispatch }) {
  function deleteBrand() {
    dispatch({ type: 'DELETE-BRAND' });
  }

  return (
    <>
      <Card className={`${styles.filterCard} shadow`}>
        <Card.Body>
          <Card.Title>
            brands
            <X className={`${styles.clearIcon}`} onClick={deleteBrand} />
          </Card.Title>
          <ul>
            {brands.map((brand) => (
              <button
                type="button"
                key={brand.id}
                onClick={() => {
                  brandHandler(brand.id, brand.name);
                }}
                className={`${styles.filterItem} ${
                  activeButton === brand.id ? styles.selected : ''
                }`}
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
