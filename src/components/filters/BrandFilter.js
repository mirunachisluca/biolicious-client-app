import { Card } from "react-bootstrap";

import styles from "./filters.module.scss";

function BrandFilter() {
  return (
    <Card className={`${styles.filterCard} shadow`}>
      <Card.Body>
        <Card.Title>brands</Card.Title>
      </Card.Body>
    </Card>
  );
}

export { BrandFilter };
