import React from "react";
import {
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import { Cart3, Search, PersonCircle } from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import { UserContext } from "../../context/context";
import { ProductsList } from "../ProductsList";

import styles from "./menuBar.module.scss";

//404 pt /:name cand nu e category

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ onClick }, ref) => (
  <a
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={styles.icon}
  >
    <PersonCircle className="ml-3 mb-2" />
  </a>
));

function MenuBar({ navbarData }) {
  const useSearchBar = navbarData.length;
  const [show, setShow] = React.useState(false);

  const { url, path } = useRouteMatch();

  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  const convertName = (name) => {
    return name
      .toLowerCase()
      .replace("&", "")
      .replace(/\s\s/g, "-")
      .replace(/\s/g, "-");
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>Biolicious</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {navbarData.map((element) => {
              if (element.subcategories.length === 0)
                return (
                  <LinkContainer
                    key={element.id}
                    to={{
                      pathname: `${url}/${element.name.toLowerCase()}`,
                      state: {
                        params: { categoryId: element.id, subcategoryId: 0 },
                      },
                    }}
                  >
                    <Nav.Link key={element.id} className={styles.fontSize15}>
                      {element.name}
                    </Nav.Link>
                  </LinkContainer>
                  // <Link
                  // key={element.id}
                  // to={{
                  //   pathname: `${url}/${element.name.toLowerCase()}`,
                  //   state: {
                  //     params: { categoryId: element.id, subcategoryId: 0 },
                  //   },
                  // }}
                  //   className="nav-link"
                  // >
                  //   {element.name}
                  // </Link>
                );
              else
                return (
                  <NavDropdown
                    key={element.id}
                    title={element.name}
                    id="basic-nav-dropdown"
                    className={styles.fontSize15}
                  >
                    {element.subcategories.map((subcategory) => {
                      return (
                        // <LinkContainer
                        //   key={subcategory.id}
                        //   to={`${url}/${convertName(
                        //     element.name
                        //   )}/${convertName(subcategory.name)}`}
                        // >
                        <LinkContainer
                          key={subcategory.id}
                          to={{
                            pathname: `${url}/${convertName(
                              element.name
                            )}/${convertName(subcategory.name)}`,
                            state: {
                              params: {
                                categoryId: element.id,
                                subcategoryId: subcategory.id,
                              },
                            },
                          }}
                        >
                          <NavDropdown.Item
                            key={subcategory.id}
                            className={styles.fontSize15}
                          >
                            {subcategory.name}
                          </NavDropdown.Item>
                        </LinkContainer>

                        // <Link
                        //   key={subcategory.id}
                        // to={{
                        //   pathname: `${url}/${convertName(
                        //     element.name
                        //   )}/${convertName(subcategory.name)}`,
                        //   state: {
                        //     params: {
                        //       categoryId: element.id,
                        //       subcategoryId: subcategory.id,
                        //     },
                        //   },
                        // }}
                        //   className="dropdown-item"
                        // >
                        //   {subcategory.name}
                        // </Link>
                      );
                    })}
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
                        Hello, {user.displayName}!
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
            <a className={styles.icon}>
              <Cart3 className="ml-3 mr-2 mb-2" />
            </a>
          </LinkContainer>
        </Navbar.Collapse>
      </Navbar>

      <Route path={`${path}/:name`}>
        {path === "/shop" && <ProductsList />}
      </Route>
    </>
  );
}

export { MenuBar };
