import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

import { Pagination } from "./Pagination";
import { ProductCard } from "./ProductCard";
import { axiosInstance } from "../api/axios";
import styles from "./products-list.module.scss";
import { BrandFilter } from "./filters/BrandFilter";

const sorting = {
  priceAsc: "Price: ascending",
  priceDesc: "Price: descending",
  alphabetical: "Sort by A-Z",
};

const apiURL = "/products";
//TOdo: useReducer : https://www.youtube.com/watch?v=o-nCM1857AQ&ab_channel=HarryWolff

function ProductsList({ categoryId, subcategoryId, name }) {
  const [products, setProducts] = React.useState({
    isLoaded: false,
    data: null,
  });

  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(0);
  const [totalProducts, setTotalProducts] = React.useState(0);

  const [dropdownValue, setDropdownValue] = React.useState("Sort by A-Z");

  const history = useHistory();

  const queryParams = useLocation().search;

  const [apiParams, setApiParams] = React.useState(
    function setInitialApiParams() {
      if (subcategoryId === 0) {
        return { categoryId, pageSize: 4, pageIndex: 1, sort: "" };
      }
      return {
        categoryId,
        subcategoryId,
        pageSize: 4,
        pageIndex: 1,
        sort: "",
      };
    }
  );

  React.useEffect(
    function fetchInitialResults() {
      console.log(apiParams);

      axiosInstance
        .get(apiURL, { params: apiParams })
        .then((response) => {
          if (response.status === 200) {
            setProducts({ isLoaded: true, data: response.data });
            setPageSize(response.data.pageSize);
            setTotalProducts(response.data.count);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [apiParams]
  );

  React.useEffect(
    function queryParamsHandler() {
      const newApiParams = { ...apiParams };

      switch (queryParams) {
        case "?sort=priceAsc":
          newApiParams.sort = "priceAsc";
          setDropdownValue(sorting["priceAsc"]);
          break;
        case "?sort=priceDesc":
          newApiParams.sort = "priceDesc";
          setDropdownValue(sorting["priceDesc"]);
          break;
        case "":
          newApiParams.sort = "";
          break;
      }

      setApiParams(newApiParams);
    },
    [queryParams]
  );

  const pageNumberHandler = (pageNumber) => {
    const newApiParams = { ...apiParams };
    newApiParams.pageIndex = pageNumber;

    setApiParams(newApiParams);
    setPageIndex(pageNumber);
  };

  const dropdownValueHandler = (text) => {
    const urlParams = new URLSearchParams();

    switch (text) {
      case sorting["priceAsc"]:
        urlParams.append("sort", "priceAsc");
        break;
      case sorting["priceDesc"]:
        urlParams.append("sort", "priceDesc");
        break;
    }

    history.replace({ search: urlParams.toString() });

    setDropdownValue(text);
  };

  return (
    <div className={styles.flexboxColumn}>
      <div>
        <br />
        <h3>{name}</h3>
        <br />
      </div>

      <div className={styles.flexboxWithWrap}>
        <div className={styles.filtersDiv}>
          <h3>filter by:</h3>
          <BrandFilter />
        </div>

        <div className={`${styles.flexboxWithWrap} ${styles.productsDiv}`}>
          <div className={`${styles.flexbox}`}>
            <DropdownButton
              title={dropdownValue}
              variant="outline-secondary"
              size="sm"
              className={styles.sortButton}
            >
              <Dropdown.Item
                onClick={(e) => dropdownValueHandler(e.target.textContent)}
              >
                {sorting["alphabetical"]}
              </Dropdown.Item>

              <Dropdown.Item
                onClick={(e) => dropdownValueHandler(e.target.textContent)}
              >
                {sorting["priceAsc"]}
              </Dropdown.Item>

              <Dropdown.Item
                onClick={(e) => dropdownValueHandler(e.target.textContent)}
              >
                {sorting["priceDesc"]}
              </Dropdown.Item>
            </DropdownButton>

            <Pagination
              pageSize={pageSize}
              totalProducts={totalProducts}
              pageNumberHandler={pageNumberHandler}
              active={pageIndex}
            />
          </div>

          <ul className={styles.productsList}>
            {products.isLoaded &&
              !!products.data &&
              products.data.data.map((product) => {
                return (
                  <li key={product.id}>
                    <ProductCard
                      key={product.id}
                      name={product.name}
                      price={product.price}
                    />
                  </li>
                );
              })}
          </ul>

          <Pagination
            pageSize={pageSize}
            totalProducts={totalProducts}
            pageNumberHandler={pageNumberHandler}
            active={pageIndex}
          />
        </div>
      </div>
    </div>
  );
}

export { ProductsList };
