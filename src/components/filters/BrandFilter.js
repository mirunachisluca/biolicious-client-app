import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

import styles from './Filters.module.scss';

function BrandFilter({ brands, brandHandler, activeButton, handler }) {
  return (
    <>
      <Card className={`${styles.filterCard} shadow`}>
        <Card.Body>
          <Card.Title className="title">
            brands
            <X className={`${styles.clearIcon}`} onClick={() => handler()} />
          </Card.Title>
          <ul>
            {brands.map((brand) => (
              <Button
                variant="outline-black"
                key={brand.id}
                onClick={() => {
                  brandHandler(brand.id, brand.name);
                }}
                className={`${styles.filterItem} ${
                  activeButton === brand.id ? styles.selected : ''
                }`}
              >
                {brand.name}
              </Button>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </>
  );
}

export { BrandFilter };
