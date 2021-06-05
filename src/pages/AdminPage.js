import jwtDecode from 'jwt-decode';
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { axiosInstance } from '../api/axios';
import { LoginModal } from '../components/admin/LoginModal';
import { ProductsTab } from '../components/admin/products/ProductsTab';
import { RecipesTab } from '../components/admin/recipes/RecipesTab';
import { UserContext } from '../context/UserContext';
import {
  closeProductsTab,
  closeRecipesTab,
  closeUsersTab,
  showProductsTab,
  showRecipesTab,
  showUsersTab
} from '../store/admin/adminPageActions';
import {
  adminPageReducer,
  initialState
} from '../store/admin/adminPageReducer';

function AdminPage() {
  const [show, setShow] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [state, dispatch] = React.useReducer(adminPageReducer, initialState);
  const { login } = React.useContext(UserContext);

  const loginHandler = (email, password) => {
    axiosInstance
      .post('/accounts/login', { email, password })
      .then((response) => {
        if (response.status === 200) {
          login(response.data.token);

          if (jwtDecode(response.data.token).role === 'Admin') {
            setShow(false);
          } else {
            setErrorMessage(
              'Sorry, you are not authorized to access this page!'
            );
          }
        }
      })
      .catch((error) => {
        setErrorMessage('Wrong email or password.');
      });
  };

  return (
    <>
      <LoginModal
        show={show}
        loginHandler={loginHandler}
        errorMessage={errorMessage}
      />

      {!show && (
        <div>
          <Tabs
            defaultActiveKey="products"
            transition={false}
            fill
            className="uppercase-bembo"
            onClick={(e) => {
              switch (e.target.text) {
                case 'Products': {
                  dispatch(showProductsTab());
                  dispatch(closeRecipesTab());
                  dispatch(closeUsersTab());
                  break;
                }
                case 'Recipes': {
                  dispatch(closeProductsTab());
                  dispatch(showRecipesTab());
                  dispatch(closeUsersTab());
                  break;
                }
                case 'Users': {
                  dispatch(closeProductsTab());
                  dispatch(closeRecipesTab());
                  dispatch(showUsersTab());
                  break;
                }
                default:
                  break;
              }
            }}
          >
            <Tab eventKey="products" title="Products" className="text-dark">
              {state.showProductsTab && <ProductsTab />}
            </Tab>

            <Tab eventKey="recipes" title="Recipes" className="text-dark">
              {state.showRecipesTab && <RecipesTab />}
            </Tab>

            {/* <Tab eventKey="users" title="Users" className="text-dark">
              {state.showUsersTab && <p>???</p>}
            </Tab> */}
          </Tabs>
        </div>
      )}
    </>
  );
}

export { AdminPage };
