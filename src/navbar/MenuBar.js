import React, { useContext } from "react";
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
import { UserContext } from "../context/context";

import styles from "./menuBar.module.scss";

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

  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  return (
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
                <Nav.Link key={element.id} className={styles.fontSize15}>
                  {element.name}
                </Nav.Link>
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
                      <NavDropdown.Item
                        key={subcategory.id}
                        className={styles.fontSize15}
                      >
                        {subcategory.name}
                      </NavDropdown.Item>
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

                    <Dropdown.Item eventKey="1">My profile</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Orders</Dropdown.Item>

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
  );
}

export { MenuBar };
