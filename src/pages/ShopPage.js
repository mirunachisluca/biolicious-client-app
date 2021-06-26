import React from 'react';
import { Carousel, Spinner } from 'react-bootstrap';
import { axiosInstance } from '../api/axios';
import { NewProductCard } from '../components/products/NewProductCard';
import { MenuBarContext } from '../context/MenuBarContext';
import { NEW_PRODUCTS_ROUTE } from '../routes/apiRoutes';

import styles from './css/ShopPage.module.scss';

function ShopPage() {
  const { setProductCategoriesSort } = React.useContext(MenuBarContext);

  const [newProducts, setNewProducts] = React.useState({
    status: 'IDLE',
    result: null
  });

  React.useEffect(() => setProductCategoriesSort(''), []);

  React.useEffect(function fetchNewProducts() {
    setNewProducts({ status: 'LOADING', result: null });
    axiosInstance
      .get(NEW_PRODUCTS_ROUTE)
      .then((response) => {
        if (response.status === 200) {
          setNewProducts({ status: 'FETCHED', result: response.data });
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <br />
      <h3 className="uppercase-bembo">New products</h3>
      <br />
      <br />

      {newProducts.status === 'LOADING' && <Spinner animation="border" />}

      <div className={styles.gridLayout}>
        {newProducts.status === 'FETCHED' &&
          newProducts.result.map((product) => (
            <NewProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
}

export { ShopPage };
