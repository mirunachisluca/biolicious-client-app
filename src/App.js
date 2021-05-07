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
} from './helpers/createDynamicRoutes';
import { MenuBarContext } from './context/MenuBarContext';
import {
  ADMIN_PAGE,
  EDIT_PROFILE_PAGE_ROUTE,
  HOMEPAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  ORDERS_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  RECIPES_PAGE_ROUTE,
  SHOPPING_CART_PAGE_ROUTE,
  SHOP_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE
} from './routes/pageRoutes';
import { RecipePage } from './components/recipes/RecipePage';
import { AdminPage } from './pages/AdminPage';
import { EditProfilePage } from './pages/EditProfilePage';

function App() {
  const { activeData, shopData } = React.useContext(MenuBarContext);

  let categoryRoutes = null;
  let subcategoryRoutes = null;

  if (shopData.status === 'FETCHED') {
    categoryRoutes = createCategoryRoutes(SHOP_PAGE_ROUTE, shopData.data);
    subcategoryRoutes = createSubcategoryRoutes(SHOP_PAGE_ROUTE, shopData.data);
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

        <Route exact path={RECIPES_PAGE_ROUTE}>
          <RecipesPage />
        </Route>

        <Route exact path={`${RECIPES_PAGE_ROUTE}/:name`}>
          <RecipePage />
        </Route>

        <Route path={SHOPPING_CART_PAGE_ROUTE}>
          <ShoppingCartPage />
        </Route>

        <Route exact path={PROFILE_PAGE_ROUTE}>
          <ProfilePage />
        </Route>

        <Route exact path={EDIT_PROFILE_PAGE_ROUTE}>
          <EditProfilePage />
        </Route>

        <Route path={ORDERS_PAGE_ROUTE}>
          <OrdersPage />
        </Route>

        <Route exact path={ADMIN_PAGE}>
          <AdminPage />
        </Route>

        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
