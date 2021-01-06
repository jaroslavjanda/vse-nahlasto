import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'src/utils/auth';
import { getDataFromLocalStorage } from '../utils/localStorage';

import { Link, NavLink } from 'src/atoms';
import { Button, Col, Dropdown, Nav, Navbar, Row } from 'react-bootstrap';
import { AdminBackground, AdminWrapper } from './styled';
import PrivateStyledLink from './privateStyledLink';

import { route } from 'src/Routes';
import logo from 'src/images/logo.png';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faCaretDown,
  faCaretRight,
  faClipboardList,
  faFileAlt,
  faFolderOpen,
  faNewspaper,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';

export const TopNavigation = ({ children }) => {
  const { signout } = useAuth();
  const history = useHistory();
  const [isAuthenticated, setisauthenticated] = useState(
    localStorage.getItem('quacker-auth'),
  );
  const [isShown, setIsShown] = useState(true);
  let user = getDataFromLocalStorage()?.user;

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
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
          //setisauthenticated={setisauthenticated}
          className="startPageMarginTop"
        >
          {children}{' '}
        </div>
      )}

      {isAuthenticated && (
        <AdminBackground>
          <>
            <Row style={{ marginRight: 0, marginLeft: 0 }}>
              <Col
                lg={isShown ? 1 : 3}
                className={isShown ? 'menuHide' : ''}
                style={{ paddingLeft: 0 }}
                justify="center"
              >
                <Row>
                  <Button
                    className="navButton submenuButton"
                    onClick={() => setIsShown(!isShown)}
                  >
                    <FontAwesomeIcon
                      style={{ fontSize: '18px', width: '25px' }}
                      icon={isShown ? faCaretRight : faCaretDown}
                    />
                    Menu
                  </Button>
                </Row>
                <Row id="admin-menu" className={'menuContent'}>
                  <Col>
                    <PrivateStyledLink
                      exact
                      activeClassName="active-admin"
                      to={route.admin()}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: '18px', width: '25px' }}
                        icon={faTachometerAlt}
                      />{' '}
                      <span className={`${isShown ? 'notVisibleText' : ''}`}>
                        Nástěnka
                      </span>
                    </PrivateStyledLink>

                    <div className={`submenu ${isShown ? 'notVisible' : ''}`}>
                      Uživatel
                    </div>

                    <PrivateStyledLink
                      exact
                      activeClassName="active-admin"
                      to={route.adminAllCommunities()}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: '18px', width: '25px' }}
                        icon={faBuilding}
                      />{' '}
                      <span className={`${isShown ? 'notVisibleText' : ''}`}>
                        Výpis komunit
                      </span>
                    </PrivateStyledLink>
                    <PrivateStyledLink
                      exact
                      activeClassName="active-admin"
                      to={route.adminMemberOfCommunities()}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: '18px', width: '25px' }}
                        icon={faFolderOpen}
                      />{' '}
                      <span className={`${isShown ? 'notVisibleText' : ''}`}>
                        Členství v komunitách
                      </span>
                    </PrivateStyledLink>
                    <PrivateStyledLink
                      exact
                      activeClassName="active-admin"
                      to={route.myAddedTickets()}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: '18px', width: '25px' }}
                        icon={faNewspaper}
                      />{' '}
                      <span className={`${isShown ? 'notVisibleText' : ''}`}>
                        Vložené příspěvky
                      </span>
                    </PrivateStyledLink>
                    <div className={`submenu ${isShown ? 'notVisible' : ''}`}>
                      Správce
                    </div>
                    <PrivateStyledLink
                      exact
                      activeClassName="active-admin"
                      to={route.adminOwnerOfCommunities()}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: '18px', width: '25px' }}
                        icon={faFileAlt}
                      />{' '}
                      <span className={`${isShown ? 'notVisibleText' : ''}`}>
                        Moje komunity
                      </span>
                    </PrivateStyledLink>
                    <PrivateStyledLink
                      exact
                      activeClassName="active-admin"
                      to={route.ticketsToSolve()}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: '18px', width: '25px' }}
                        icon={faClipboardList}
                      />{' '}
                      <span className={`${isShown ? 'notVisibleText' : ''}`}>
                        Příspěvky na vyřešení
                      </span>
                    </PrivateStyledLink>
                  </Col>
                </Row>
              </Col>
              <Col lg={isShown ? 11 : 8}>
                <AdminWrapper>{children}</AdminWrapper>
              </Col>
            </Row>
          </>
        </AdminBackground>
      )}
    </>
  );
};
