import React from 'react';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { convertToUrl } from '../../helpers/convertToUrl';
import { RECIPES_PAGE_ROUTE } from '../../routes/pageRoutes';

import styles from './RecipeCard.module.scss';

function RecipeCard({ name, description }) {
  return (
    <>
      <Card className="shadow">
        <div className={styles.grid}>
          <LinkContainer to={`${RECIPES_PAGE_ROUTE}/${convertToUrl(name)}`}>
            <Card.Img
              src="../../pancakes.jpg"
              className={styles.pointerCursor}
              width="100%"
              alt="recipe"
            />
          </LinkContainer>

          <div>
            <LinkContainer to={`${RECIPES_PAGE_ROUTE}/${convertToUrl(name)}`}>
              <Card.Title
                className={`${styles.recipeTitle}  ${styles.pointerCursor}`}
              >
                {name}
              </Card.Title>
            </LinkContainer>

            <Card.Body className={styles.descriptionBody}>
              {description}
            </Card.Body>
          </div>
        </div>
      </Card>
    </>
  );
}

export { RecipeCard };
