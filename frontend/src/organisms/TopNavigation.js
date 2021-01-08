import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from 'src/utils/auth';
import { getDataFromLocalStorage } from '../utils/localStorage';

import { Link, NavLink } from 'src/atoms';
import { Button, Col, Dropdown, Nav, Navbar, Row } from 'react-bootstrap';
import { AdminBackground, AdminWrapper } from './styled';
import { SideMenu } from 'src/molecules';
import { route } from 'src/Routes';
import logo from 'src/images/logo.png';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export const TopNavigation = ({ children }) => {
  const { signout } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [isAuthenticated, setisauthenticated] = useState(
    localStorage.getItem('quacker-auth'),
  );
  const [isShown, setIsShown] = useState(true);
  const [expanded, setExpanded] = useState(false);
  let user = getDataFromLocalStorage()?.user;

  useEffect(() => {
    setIsShown(false);
    setExpanded(false);
  }, [location]);
  return (
    <>
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      >
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
            {!isAuthenticated && (
              <>
                <Nav.Item>
                  <NavLink exact to={route.home()} className="pa3">
                    Domů
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink exact to={route.communities()} className="pa3">
                    Komunity
                  </NavLink>
                </Nav.Item>
              </>
            )}
            {isAuthenticated ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-custom-1" className="navButton">
                    {' '}
                    {user.name}
                    <span> </span>
                    {user.surname}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        history.push(route.forgottenPassword());
                      }}
                    >
                      Změna hesla
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        signout();
                        history.push(route.home());
                        window.location.reload();
                      }}
                    >
                      {' '}
                      Odhlásit se
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <SideMenu classN={'top'} />
              </>
            ) : (
              <>
                <Nav.Item>
                  <NavLink to={route.signIn()} className="pa3">
                    Přihlásit se
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <Button className="navButton" to={route.signUp()} as={Link}>
                    Registrovat se
                  </Button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {!isAuthenticated && (
        <div
          setisauthenticated={setisauthenticated}
          className="startPageMarginTop"
        >
          {children}{' '}
        </div>
      )}

      {isAuthenticated && (
        <AdminBackground>
          <>
            <Row style={{ marginRight: 0, marginLeft: 0 }}>
              <Col style={{ paddingLeft: 0 }} justify="center">
                <SideMenu isShown={isShown} classN={'side'}>
                  <Nav>
                    <Button
                      className="navButton submenuButton"
                      onClick={() => setIsShown(!isShown)}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: '18px', width: '25px' }}
                        icon={faBars}
                      />
                    </Button>
                  </Nav>
                </SideMenu>
              </Col>
              <Col lg={isShown ? 11 : 10}>
                <AdminWrapper>{children}</AdminWrapper>
              </Col>
            </Row>
          </>
        </AdminBackground>
      )}
    </>
  );
};
