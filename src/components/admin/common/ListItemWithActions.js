import React from 'react';

import { Button, ButtonGroup } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

import styles from './ListItemWithActions.module.scss';

function ListItemWithActions({
  item,
  displayEditModalHandler,
  displayConfirmationModalHandler
}) {
  return (
    <li key={item.id}>
      <div className={styles.grid}>
        <span>{item.name}</span>

        <ButtonGroup>
          <Button
            variant="no-margin"
            onClick={() => displayEditModalHandler(item)}
          >
            <PencilSquare />
          </Button>

          <Button
            variant="no-margin"
            onClick={() => displayConfirmationModalHandler(item)}
          >
            <Trash />
          </Button>
        </ButtonGroup>
      </div>
    </li>
  );
}

export { ListItemWithActions };
