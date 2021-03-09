import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Homepage } from './pages/Homepage';
import { LoginPage } from './pages/LoginPage';
import { RecipesPage } from './pages/RecipesPage';
import { ShopPage } from './pages/ShopPage';
import { ShoppingCartPage } from './pages/ShoppingCartPage';
import { SignupPage } from './pages/SignupPage';
// import { UserContext } from "./context/context";
import { UserProvider } from './context/context';
import { ProfilePage } from './pages/ProfilePage';
import { OrdersPage } from './pages/OrdersPage';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/shop">
              <ShopPage />
            </Route>
            <Route path="/recipes">
              <RecipesPage />
            </Route>
            <Route path="/shoppingCart">
              <ShoppingCartPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/orders">
              <OrdersPage />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
