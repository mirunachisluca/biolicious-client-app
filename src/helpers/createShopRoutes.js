import React from 'react';
import { Route } from 'react-router-dom';
import { ProductPage } from '../components/products/ProductPage';
import { ProductsList } from '../components/products/ProductsList';
import { RecipesList } from '../components/recipes/RecipesList';
import { RECIPES_PAGE_ROUTE, SHOP_PAGE_ROUTE } from '../routes/pageRoutes';
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
        {path === SHOP_PAGE_ROUTE && (
          <>
            <ProductsList
              key={`list-${category.id}`}
              categoryId={category.id}
              subcategoryId={0}
              name={category.name}
            />
          </>
        )}

        {path === RECIPES_PAGE_ROUTE && <RecipesList key={category.id} />}
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
          {path === SHOP_PAGE_ROUTE && (
            <ProductPage key={`product-${category.id}`} />
          )}

          {path === RECIPES_PAGE_ROUTE && <h3>RECIPE</h3>}
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
            {path === SHOP_PAGE_ROUTE && (
              <ProductsList
                categoryId={category.id}
                subcategoryId={subcategory.id}
                name={subcategory.name}
              />
            )}

            {path === RECIPES_PAGE_ROUTE && (
              <RecipesList key={subcategory.id} />
            )}
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
            {path === SHOP_PAGE_ROUTE && <ProductPage />}
            {path === RECIPES_PAGE_ROUTE && <h3>RECIPE</h3>}
          </Route>
        );

        subcategoryRoutes.push(route);
        subcategoryRoutes.push(parameterRoute);
      });
    }
  });

  return subcategoryRoutes;
}
