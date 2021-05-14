import React from 'react';
import { Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';
import { Cart3, PersonCircle } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { MenuBarContext } from '../../context/MenuBarContext';

import { UserContext } from '../../context/UserContext';
import { convertToUrl } from '../../helpers/convertToUrl';
import styles from './MenuBar.module.scss';
import {
  HOMEPAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  ORDERS_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  RECIPES_PAGE_ROUTE,
  SHOPPING_CART_PAGE_ROUTE,
  SHOP_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE
} from '../../routes/pageRoutes';

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

  const { dispatch, shopData, setProductCategoriesSort } =
    React.useContext(MenuBarContext);

  const { pathname } = useLocation();

  React.useEffect(() => setProductCategoriesSort(''), []);

  React.useEffect(
    function setMenuBarData() {
      if (pathname.includes('/shop') && !pathname.includes('shopping')) {
        if (shopData.data) {
          dispatch({ type: 'SET_ACTIVE_DATA', payload: shopData.data });
        }
      } else {
        dispatch({ type: 'RESET_ACTIVE_DATA' });
      }
    },
    [dispatch, pathname, shopData.data]
  );

  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };

  function getCurrentPage(path) {
    let pagePath = path.slice(1);
    pagePath = pagePath.split('/', 1);
    return pagePath[0];
  }

  return (
    <>
      <Navbar bg="light" expand="lg" className={styles.fixedNavbar}>
        <LinkContainer to={HOMEPAGE_ROUTE}>
          <img
            src="../../../logo-title.png"
            alt="logo"
            className="logo-image"
          />
        </LinkContainer>

        {getCurrentPage(pathname) === 'shop' && (
          <LinkContainer to={`/${getCurrentPage(pathname)}`}>
            <Navbar.Brand>{getCurrentPage(pathname)}</Navbar.Brand>
          </LinkContainer>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {navbarData.map((element) => {
              if (element.subcategories.length === 0) {
                return (
                  <LinkContainer
                    key={element.id}
                    to={`${
                      pathname.includes('/shop')
                        ? SHOP_PAGE_ROUTE
                        : RECIPES_PAGE_ROUTE
                    }/${element.name.toLowerCase()}`}
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
                      to={`${
                        pathname.includes('/shop')
                          ? SHOP_PAGE_ROUTE
                          : RECIPES_PAGE_ROUTE
                      }/${convertToUrl(element.name)}/${convertToUrl(
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
                      <LinkContainer to={LOGIN_PAGE_ROUTE}>
                        <Dropdown.Item eventKey="1">Login</Dropdown.Item>
                      </LinkContainer>

                      <LinkContainer to={SIGNUP_PAGE_ROUTE}>
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

                      <LinkContainer to={PROFILE_PAGE_ROUTE}>
                        <Dropdown.Item eventKey="1">My profile</Dropdown.Item>
                      </LinkContainer>

                      <LinkContainer to={ORDERS_PAGE_ROUTE}>
                        <Dropdown.Item eventKey="2">Orders</Dropdown.Item>
                      </LinkContainer>

                      <Dropdown.Divider />

                      <LinkContainer to={LOGIN_PAGE_ROUTE}>
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

          <LinkContainer to={SHOPPING_CART_PAGE_ROUTE}>
            <a className={styles.icon} href="/shoppingCart">
              <Cart3 className="ml-3 mr-2 mb-2" />
            </a>
          </LinkContainer>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export { MenuBar };
