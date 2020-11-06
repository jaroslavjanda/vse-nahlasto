import React from 'react';
import { useHistory } from 'react-router-dom';

import { AvatarPhoto, Link, NavLink } from 'src/atoms/';
import { useAuth } from 'src/utils/auth';
import { route } from 'src/Routes';
import logo from 'src/images/logo.png';

import { MainSection } from './../atoms';
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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavLink exact to={route.home()} className="pa3">
              Home
            </NavLink>
            <NavLink to={route.about()} className="pa3">
              About
            </NavLink>
            {user ? (
              <>
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
              </>
            ) : (
              <>
                <NavLink to={route.signIn()} className="pa3">
                  Sign In
                </NavLink>
                <Button variant="secondary" to={route.signUp()} as={Link}>
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <MainSection>{children}</MainSection>
    </>
  );
};
