import React from 'react';
import { Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';
import { Cart3, PersonCircle } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, useRouteMatch } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import { convertToUrl } from '../../helpers/convertToUrl';
import { ProductPage } from '../products/ProductPage';
import { ProductsList } from '../products/ProductsList';
import styles from './MenuBar.module.scss';

// 404 pt /:name cand nu e category

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ onClick }, ref) => (
  <button
    type="button"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={styles.icon}
  >
    <PersonCircle className="ml-3 mb-2" />
  </button>
));

function MenuBar({ navbarData }) {
  const [show, setShow] = React.useState(false);

  const { url, path } = useRouteMatch();

  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };

  const categoryRoutes = [];
  navbarData.forEach((category) => {
    const route = (
      <Route
        exact
        key={category.id}
        path={`${path}/${convertToUrl(category.name)}`}
      >
        {path === '/shop' && (
          <ProductsList
            key={`list-${category.id}`}
            categoryId={category.id}
            subcategoryId={0}
            name={category.name}
          />
        )}
      </Route>
    );

    categoryRoutes.push(route);
    if (category.subcategories.length === 0) {
      const parameterRoute = (
        <Route
          exact
          key={`category-route-${category.id}`}
          path={`${path}/${convertToUrl(category.name)}/:name`}
        >
          <ProductPage key={`product-${category.id}`} />
        </Route>
      );

      categoryRoutes.push(parameterRoute);
    }
  });

  const subcategoryRoutes = [];
  navbarData.forEach((category) => {
    if (!(category.subcategories.length === 0)) {
      category.subcategories.forEach((subcategory) => {
        const route = (
          <Route
            exact
            key={subcategory.id}
            path={`${path}/${convertToUrl(category.name)}/${convertToUrl(
              subcategory.name
            )}`}
          >
            {path === '/shop' && (
              <ProductsList
                categoryId={category.id}
                subcategoryId={subcategory.id}
                name={subcategory.name}
              />
            )}
          </Route>
        );

        const parameterRoute = (
          <Route
            exact
            key={`subcategory-route-${subcategory.id}`}
            path={`${path}/${convertToUrl(category.name)}/${convertToUrl(
              subcategory.name
            )}/:name`}
          >
            <ProductPage />
          </Route>
        );

        subcategoryRoutes.push(route);
        subcategoryRoutes.push(parameterRoute);
      });
    }
  });

  return (
    <>
      <Navbar bg="light" expand="lg" className={styles.fixedNavbar}>
        <LinkContainer to="/">
          <Navbar.Brand>Biolicious</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {navbarData.map((element) => {
              if (element.subcategories.length === 0) {
                return (
                  <LinkContainer
                    key={element.id}
                    to={`${url}/${element.name.toLowerCase()}`}
                  >
                    <Nav.Link key={element.id} className={styles.fontSize15}>
                      {element.name}
                    </Nav.Link>
                  </LinkContainer>
                );
              }
              return (
                <NavDropdown
                  key={element.id}
                  title={element.name}
                  id="basic-nav-dropdown"
                  className={styles.fontSize15}
                >
                  {element.subcategories.map((subcategory) => (
                    <LinkContainer
                      key={subcategory.id}
                      to={`${url}/${convertToUrl(element.name)}/${convertToUrl(
                        subcategory.name
                      )}`}
                    >
                      <NavDropdown.Item
                        key={subcategory.id}
                        className={styles.fontSize15}
                      >
                        {subcategory.name}
                      </NavDropdown.Item>
                    </LinkContainer>
                  ))}
                </NavDropdown>
              );
            })}
          </Nav>

          <UserContext.Consumer>
            {({ user, logout }) => (
              <>
                <Dropdown
                  show={show}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  />
                  {!user && (
                    <Dropdown.Menu align="right">
                      <LinkContainer to="/login">
                        <Dropdown.Item eventKey="1">Login</Dropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/signup">
                        <Dropdown.Item eventKey="2">Sign up</Dropdown.Item>
                      </LinkContainer>
                    </Dropdown.Menu>
                  )}

                  {user && (
                    <Dropdown.Menu align="right">
                      <Dropdown.ItemText>
                        {`Hello, ${user.displayName}!`}
                      </Dropdown.ItemText>

                      <Dropdown.Divider />

                      <LinkContainer to="/profile">
                        <Dropdown.Item eventKey="1">My profile</Dropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/orders">
                        <Dropdown.Item eventKey="2">Orders</Dropdown.Item>
                      </LinkContainer>

                      <Dropdown.Divider />

                      <LinkContainer to="/">
                        <Dropdown.Item eventKey="3" onClick={logout}>
                          Logout
                        </Dropdown.Item>
                      </LinkContainer>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </>
            )}
          </UserContext.Consumer>

          <LinkContainer to="/shoppingCart">
            <a className={styles.icon} href="/shoppingCart">
              <Cart3 className="ml-3 mr-2 mb-2" />
            </a>
          </LinkContainer>
        </Navbar.Collapse>
      </Navbar>

      {categoryRoutes}
      {subcategoryRoutes}
    </>
  );
}

export { MenuBar };
