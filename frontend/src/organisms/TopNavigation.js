import React from 'react';
import { useHistory } from 'react-router-dom';

import {Link, NavLink } from 'src/atoms';
import { useAuth } from 'src/utils/auth';
import { route } from 'src/Routes';
import logo from 'src/images/logo.png';

import { MainSection } from 'src/atoms/';
import { Nav, Navbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const TopNavigation = ({ children }) => {
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
            <Nav.Item>
              <NavLink to={route.about()} className="pa3">
                About
              </NavLink>
            </Nav.Item>

            {user ? (
              <>
                <Nav.Item>
                  <NavLink
                    // TODO navigate nowhere OR to the user profile page
                    exact
                    to={route.home()}
                    noUnderline
                    className="ph3 pv1 h-100 flex items-center"
                  >
                    {/*<AvatarPhoto*/}
                    {/*  className="v-mid dib mr2"*/}
                    {/*  src={user.profileImageUrl}*/}
                    {/*  alt={user.userName}*/}
                    {/*  size={2}*/}
                    {/*/>{' '}*/}
                    {'Logged in as: '}
                    {user.email}
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    variant="secondary"
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
                  <Button variant="secondary" to={route.signUp()} as={Link}>
                    Sign Up
                  </Button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <MainSection>{children}</MainSection>
    </>
  );
};
