import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';

import { Homepage } from './pages/Homepage';
import { LoginPage } from './pages/LoginPage';
import { RecipesPage } from './pages/RecipesPage';
import { ShopPage } from './pages/ShopPage';
import { ShoppingCartPage } from './pages/ShoppingCartPage';
import { SignupPage } from './pages/SignupPage';
import { ProfilePage } from './pages/ProfilePage';
import { OrdersPage } from './pages/OrdersPage';
import { NotFound } from './pages/NotFound';
import { MenuBar } from './components/navbar/MenuBar';
import {
  createCategoryRoutes,
  createSubcategoryRoutes
} from './helpers/createShopRoutes';
import { MenuBarContext } from './context/MenuBarContext';
import {
  HOMEPAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  ORDERS_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  RECIPES_PAGE_ROUTE,
  SHOPPING_CART_PAGE_ROUTE,
  SHOP_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE
} from './routes/pageRoutes';

function App() {
  const { activeData, shopData, recipesData } = React.useContext(
    MenuBarContext
  );

  let categoryRoutes = null;
  let subcategoryRoutes = null;
  let recipeCategoryRoutes = null;
  let recipeSubcategoryRoutes = null;

  if (shopData.status === 'FETCHED') {
    categoryRoutes = createCategoryRoutes(SHOP_PAGE_ROUTE, shopData.data);
    subcategoryRoutes = createSubcategoryRoutes(SHOP_PAGE_ROUTE, shopData.data);
  }

  if (recipesData.status === 'FETCHED') {
    recipeCategoryRoutes = createCategoryRoutes(
      RECIPES_PAGE_ROUTE,
      recipesData.data
    );
    recipeSubcategoryRoutes = createSubcategoryRoutes(
      RECIPES_PAGE_ROUTE,
      recipesData.data
    );
  }

  return (
    <div className="App">
      <MenuBar navbarData={activeData} />
      <Switch>
        <Route exact path={HOMEPAGE_ROUTE}>
          <Homepage />
        </Route>

        <Route path={LOGIN_PAGE_ROUTE}>
          <LoginPage />
        </Route>

        <Route path={SIGNUP_PAGE_ROUTE}>
          <SignupPage />
        </Route>

        {categoryRoutes}
        {subcategoryRoutes}
        <Route exact path={SHOP_PAGE_ROUTE}>
          <ShopPage />
        </Route>

        {recipeCategoryRoutes}
        {recipeSubcategoryRoutes}
        <Route exact path={RECIPES_PAGE_ROUTE}>
          <RecipesPage />
        </Route>

        <Route path={SHOPPING_CART_PAGE_ROUTE}>
          <ShoppingCartPage />
        </Route>

        <Route path={PROFILE_PAGE_ROUTE}>
          <ProfilePage />
        </Route>

        <Route path={ORDERS_PAGE_ROUTE}>
          <OrdersPage />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
