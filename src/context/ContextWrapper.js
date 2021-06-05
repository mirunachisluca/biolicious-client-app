import React from 'react';

import { ShoppingCartProvider } from './ShoppingCartContext';
import { UserProvider } from './UserContext';
import { MenuBarProvider } from './MenuBarContext';
import { BrandsProvider } from './BrandsContext';
import { ProductsProvider } from './ProductsContext';
import { UserDetailsProvider } from './UserDetailsContext';
import { DeliveryMethodsProvider } from './DeliveryMethodsContext';
import { RecipesProvider } from './RecipesContext';

function ContextWrapper({ children }) {
  return (
    <MenuBarProvider>
      <UserProvider>
        <UserDetailsProvider>
          <ShoppingCartProvider>
            <BrandsProvider>
              <ProductsProvider>
                <RecipesProvider>
                  <DeliveryMethodsProvider>{children}</DeliveryMethodsProvider>
                </RecipesProvider>
              </ProductsProvider>
            </BrandsProvider>
          </ShoppingCartProvider>
        </UserDetailsProvider>
      </UserProvider>
    </MenuBarProvider>
  );
}

export { ContextWrapper };
