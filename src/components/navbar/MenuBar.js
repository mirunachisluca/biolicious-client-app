import React from 'react';
import {
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown
} from 'react-bootstrap';
import { Cart3, Search, PersonCircle } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, useRouteMatch } from 'react-router-dom';

import { UserContext } from '../../context/context';
import { convertName } from '../../helpers/convertToUrl';
import { ProductsList } from '../ProductsList';
import styles from './menuBar.module.scss';

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
  const useSearchBar = navbarData.length;
  const [show, setShow] = React.useState(false);

  const { url, path } = useRouteMatch();

  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };

  const categoryRoutes = navbarData.map((category) => (
    <Route
      key={category.id}
      exact
      path={`${path}/${convertName(category.name)}`}
    >
      {path === '/shop' && (
        <ProductsList
          categoryId={category.id}
          subcategoryId={0}
          name={category.name}
        />
      )}
    </Route>
  ));

  const subcategoryRoutes = [];
  navbarData.forEach((category) => {
    if (!(category.subcategories.length === 0)) {
      category.subcategories.forEach((subcategory) => {
        const route = (
          <Route
            key={subcategory.id}
            exact
            path={`${path}/${convertName(category.name)}/${convertName(
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
        subcategoryRoutes.push(route);
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
                      to={`${url}/${convertName(element.name)}/${convertName(
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

          {!!useSearchBar && (
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2 font-weight-light"
              />
              <Search />
            </Form>
          )}

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
