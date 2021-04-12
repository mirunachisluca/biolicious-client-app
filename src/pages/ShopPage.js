import React from 'react';
import { Carousel } from 'react-bootstrap';

function ShopPage() {
  return (
    <>
      <br />
      <h3 className="uppercase-bembo">New products</h3>

      <Carousel fade>
        <Carousel.Item>
          <h1>alo</h1>
        </Carousel.Item>

        <Carousel.Item>
          <h1>da</h1>
        </Carousel.Item>

        <Carousel.Item>
          <h1>ce</h1>
        </Carousel.Item>

        <Carousel.Item>
          <h1>doriti</h1>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export { ShopPage };
