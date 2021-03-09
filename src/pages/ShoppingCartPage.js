import { Button } from 'react-bootstrap';
import React from 'react';
import { MenuBar } from '../components/navbar/MenuBar';

function ShoppingCartPage() {
  return (
    <>
      <MenuBar navbarData={[]} />
      <h1>SHOPPING CART</h1>
      <Button variant="primary">hi</Button>
    </>
  );
}

export { ShoppingCartPage };
