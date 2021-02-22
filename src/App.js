import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import jwt_decode from "jwt-decode";

import { Homepage } from "./pages/Homepage";
import { LoginPage } from "./pages/LoginPage";
import { RecipesPage } from "./pages/RecipesPage";
import { ShopPage } from "./pages/ShopPage";
import { ShoppingCartPage } from "./pages/ShoppingCartPage";
import { SignupPage } from "./pages/SignupPage";

import { axiosInstance } from "./api/axios";
import { UserContext } from "./context/context";

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
    <SnackbarProvider>
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
              <Route path="/shoppingCart">
                <ShoppingCartPage />
              </Route>
              <Route path="/shop">
                <ShopPage />
              </Route>
              <Route path="/recipes">
                <RecipesPage />
              </Route>
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
