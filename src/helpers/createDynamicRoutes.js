import React from 'react';
import { Route } from 'react-router-dom';
import { ProductPage } from '../components/products/ProductPage';
import { ProductsList } from '../components/products/ProductsList';
import { convertToUrl } from './convertToUrl';

export function createCategoryRoutes(path, navbarData) {
  const categoryRoutes = [];

  navbarData.forEach((category) => {
    const route = (
      <Route
        exact
        key={category.id}
        path={`${path}/${convertToUrl(category.name)}`}
      >
        <>
          <ProductsList
            key={`list-${category.id}`}
            categoryId={category.id}
            subcategoryId={0}
            name={category.name}
          />
        </>
      </Route>
    );

    categoryRoutes.push(route);

    if (category.subcategories.length === 0) {
      const parameterRoute = (
        <Route
          exact
          key={`category-route-${category.id}`}
          path={`${path}/${convertToUrl(category.name)}/:name`}
        >
          <ProductPage key={`product-${category.id}`} />
        </Route>
      );

      categoryRoutes.push(parameterRoute);
    }
  });

  return categoryRoutes;
}

export function createSubcategoryRoutes(path, navbarData) {
  const subcategoryRoutes = [];

  navbarData.forEach((category) => {
    if (!(category.subcategories.length === 0)) {
      category.subcategories.forEach((subcategory) => {
        const route = (
          <Route
            exact
            key={subcategory.id}
            path={`${path}/${convertToUrl(category.name)}/${convertToUrl(
              subcategory.name
            )}`}
          >
            <ProductsList
              categoryId={category.id}
              subcategoryId={subcategory.id}
              name={subcategory.name}
            />
          </Route>
        );

        const parameterRoute = (
          <Route
            exact
            key={`subcategory-route-${subcategory.id}`}
            path={`${path}/${convertToUrl(category.name)}/${convertToUrl(
              subcategory.name
            )}/:name`}
          >
            <ProductPage />
          </Route>
        );

        subcategoryRoutes.push(route);
        subcategoryRoutes.push(parameterRoute);
      });
    }
  });

  return subcategoryRoutes;
}
