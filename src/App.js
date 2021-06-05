import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

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
  CHECKOUT_PAGE_ROUTE,
  EDIT_PROFILE_PAGE_ROUTE,
  HOMEPAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  ORDERS_PAGE_ROUTE,
  ORDER_PLACED,
  PAYMENT_PAGE,
  PROFILE_PAGE_ROUTE,
  RECIPES_PAGE_ROUTE,
  SHOPPING_CART_PAGE_ROUTE,
  SHOP_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE
} from './routes/pageRoutes';
import { RecipePage } from './components/recipes/RecipePage';
import { AdminPage } from './pages/AdminPage';
import { EditProfilePage } from './pages/EditProfilePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentPage } from './pages/PaymentPage';
import { PlacedOrder } from './pages/PlacedOrder';

const stripePromise = loadStripe(
  'pk_test_51Is6MYBY1fH84sUZUVr3awUkuvHi4DeJ2eJUVSginPKJeV0eON4hM1X9h2ZBqYtsXwtL5Bb5BANKXGuT2Gi0ZslQ002jkCjjih'
);

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
      <Elements stripe={stripePromise}>
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

          <Route path={CHECKOUT_PAGE_ROUTE}>
            <CheckoutPage />
          </Route>

          <Route exact path={PROFILE_PAGE_ROUTE}>
            <ProfilePage />
          </Route>

          <Route exact path={EDIT_PROFILE_PAGE_ROUTE}>
            <EditProfilePage />
          </Route>

          <Route exact path={ORDERS_PAGE_ROUTE}>
            <OrdersPage />
          </Route>

          <Route exact path={ORDER_PLACED}>
            <PlacedOrder />
          </Route>

          <Route exact path={ADMIN_PAGE}>
            <AdminPage />
          </Route>

          <Route exact path={PAYMENT_PAGE}>
            <PaymentPage />
          </Route>

          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </Elements>
    </div>
  );
}

export default App;
