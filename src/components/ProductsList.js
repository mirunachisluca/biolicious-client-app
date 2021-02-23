import React from "react";
import { Pagination } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

import { ProductCard } from "./ProductCard";
import { axiosInstance } from "../api/axios";
import styles from "./products-list.module.scss";

function ProductsList() {
  const [products, setProducts] = React.useState({
    isLoaded: false,
    data: null,
  });

  const { name } = useParams();
  const location = useLocation();

  const categoryId = location.state.params.categoryId;
  const subcategoryId = location.state.params.subcategoryId;

  let url = "/products";

  subcategoryId === 0
    ? (url = `/products?categoryId=${categoryId}`)
    : (url = `/products?categoryId=${categoryId}&subcategoryId=${subcategoryId}`);

  console.log(url);

  React.useEffect(() => {
    axiosInstance
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setProducts({ isLoaded: true, data: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryId, subcategoryId]);

  const paginationItemClick = (event) => {
    console.log(event.target.getAttribute("page-number"));
    const pageNumber = event.target.getAttribute("page-number");
    setActive(pageNumber);
  };

  const [active, setActive] = React.useState(1);
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={paginationItemClick}
        page-number={number}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className={styles.flexboxColumn}>
      <div>
        <h3>{name}</h3>
        <p>Category : {categoryId}</p>
        <p>Subcategory: {subcategoryId}</p>
      </div>

      <div className={styles.flexbox}>
        <div className={styles.filtersDiv}></div>

        <div className={`${styles.flexbox} ${styles.productsDiv}`}>
          {products.isLoaded &&
            !!products.data &&
            products.data.data.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export { ProductsList };
