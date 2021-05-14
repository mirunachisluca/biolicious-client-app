import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { UserProvider } from './context/UserContext';
import { MenuBarProvider } from './context/MenuBarContext';
import { BrandsProvider } from './context/BrandsContext';
import { ProductsProvider } from './context/ProductsContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuBarProvider>
        <UserProvider>
          <ShoppingCartProvider>
            <BrandsProvider>
              <ProductsProvider>
                <App />
              </ProductsProvider>
            </BrandsProvider>
          </ShoppingCartProvider>
        </UserProvider>
      </MenuBarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
