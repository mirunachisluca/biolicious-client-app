import React from 'react';
import { Card } from 'react-bootstrap';
import ImageFadeIn from 'react-image-fade-in';
import { LinkContainer } from 'react-router-bootstrap';
import { convertToUrl } from '../../helpers/convertToUrl';
import { RECIPES_PAGE_ROUTE } from '../../routes/pageRoutes';

import styles from './RecipeCard.module.scss';

function RecipeCard({ name, description, image }) {
  return (
    <>
      <Card className="shadow mb-3">
        <div className={styles.grid}>
          <LinkContainer to={`${RECIPES_PAGE_ROUTE}/${convertToUrl(name)}`}>
            <ImageFadeIn
              src={image}
              className={styles.pointerCursor}
              width="100%"
              alt="recipe"
            />
          </LinkContainer>

          <div className="my-auto">
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
