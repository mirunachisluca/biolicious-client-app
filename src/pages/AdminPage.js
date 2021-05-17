import jwtDecode from 'jwt-decode';
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { axiosInstance } from '../api/axios';
import { LoginModal } from '../components/admin/LoginModal';
import { ProductsTab } from '../components/admin/products/ProductsTab';
import { RecipesTab } from '../components/admin/recipes/RecipesTab';
import { UserContext } from '../context/UserContext';

function AdminPage() {
  const [show, setShow] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
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
              'Sorry, you are not authorized to enter this page!'
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
          >
            <Tab eventKey="products" title="Products" className="text-dark">
              <ProductsTab />
            </Tab>

            <Tab eventKey="recipes" title="Recipes" className="text-dark">
              <RecipesTab />
            </Tab>

            <Tab eventKey="users" title="Users" className="text-dark">
              <p>???</p>
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
}

export { AdminPage };
