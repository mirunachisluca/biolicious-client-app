import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

import styles from './Filters.module.scss';

function FilterCard({
  filterName,
  data,
  dataHandler,
  activeButton,
  clearHandler
}) {
  return (
    <>
      <Card className={`${styles.filterCard} shadow`}>
        <Card.Body>
          <Card.Title className="title">
            {filterName}
            <X
              className={`${styles.clearIcon}`}
              onClick={() => clearHandler()}
            />
          </Card.Title>

          <ul className={styles.list}>
            {data.map((item) => (
              <Button
                variant="outline-black"
                key={item.id}
                onClick={() => {
                  dataHandler(item.id, item.name);
                }}
                className={`${styles.filterItem} ${
                  activeButton === item.id ? styles.selected : ''
                }`}
              >
                {item.name}
              </Button>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </>
  );
}

export { FilterCard };
