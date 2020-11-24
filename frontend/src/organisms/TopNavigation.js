import React from 'react';
import { useHistory } from 'react-router-dom';

import { Link, NavLink } from 'src/atoms';
import { useAuth } from 'src/utils/auth';
import { route } from 'src/Routes';
import logo from 'src/images/logo.png';

import { MainSection } from 'src/atoms/';
import { Nav, Navbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const TopNavigation = ({ children, hasFullscreen }) => {
  const { user, signout } = useAuth();
  const history = useHistory();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to={route.home()}>
            <img
              src={logo}
              width="200"
              height="55"
              className="d-inline-block align-top"
              alt="Nahlaš.To logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <NavLink exact to={route.home()} className="pa3">
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink exact to={route.communities()} className="pa3">
                Communities
              </NavLink>
            </Nav.Item>
            <Nav.Item></Nav.Item>
            {user ? (
              <>
                <Nav.Item>
                  <NavLink
                    exact
                    to={route.home()}
                    noUnderline
                    className="ph3 pv1 h-100 flex items-center"
                  >
                    {'Logged in as: '}
                    {user.email}
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    className="navButton"
                    onClick={() => {
                      signout();
                      history.push(route.home());
                      window.location.reload();
                    }}
                  >
                    Sign Out
                  </Button>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <NavLink to={route.signIn()} className="pa3">
                    Sign In
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <Button className="navButton" to={route.signUp()} as={Link}>
                    Sign Up
                  </Button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {hasFullscreen && <div>{children}</div>}
      {!hasFullscreen && <MainSection>{children}</MainSection>}
    </>
  );
};
