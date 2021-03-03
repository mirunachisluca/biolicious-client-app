import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { Homepage } from "./pages/Homepage";
import { LoginPage } from "./pages/LoginPage";
import { RecipesPage } from "./pages/RecipesPage";
import { ShopPage } from "./pages/ShopPage";
import { ShoppingCartPage } from "./pages/ShoppingCartPage";
import { SignupPage } from "./pages/SignupPage";

import { axiosInstance } from "./api/axios";
import { UserContext } from "./context/context";
import { ProfilePage } from "./pages/ProfilePage";
import { OrdersPage } from "./pages/OrdersPage";
import { NotFound } from "./pages/NotFound";

function App() {
  const [user, setUser] = React.useState(null);

  const login = React.useCallback((token) => {
    const decodedToken = jwt_decode(token);

    const currentUser = {
      displayName: decodedToken.given_name,
    };

    localStorage.setItem("token", token);

    axiosInstance.defaults.headers["Authorization"] = "Bearer " + token;

    setUser(currentUser);
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    }
  }, [login]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    delete axiosInstance.defaults.headers["Authorization"];
  };

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ user: user, login: login, logout: logout }}
      >
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
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
