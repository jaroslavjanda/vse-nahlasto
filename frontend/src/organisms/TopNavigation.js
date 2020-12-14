import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Link, NavLink } from 'src/atoms';
import { useAuth } from 'src/utils/auth';
import { route } from 'src/Routes';
import logo from 'src/images/logo.png';

import { MainSection } from 'src/atoms/';
import { Nav, Navbar, Button, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AdminBackground, AdminWrapper } from './styled';
import PrivateStyledLink from './privateStyledLink';
import './style.css';
import { Row, Col } from 'react-grid-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faNewspaper,
  faFileAlt,
  faFolderOpen,
  faTools,
  faClipboardList,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { getDataFromLocalStorage } from '../utils/localStorage';

export const TopNavigation = ({ children }) => {
  const { signout } = useAuth();
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('quacker-auth'),
  );

  var user = getDataFromLocalStorage()?.user;

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
    <Dropdown.Toggle id="dropdown-custom-1"  className="navButton"> {user.name}<span> </span>{user.surname}</Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item as={Link} exact to={route.forgottenPassword()}>Změna hesla</Dropdown.Item>
      <Dropdown.Item onClick={() => {
                      signout();
                      history.push(route.home());
                      window.location.reload();
                    }}> Odhlásit se</Dropdown.Item>
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
        <div setIsAuthenticated={setIsAuthenticated} className="startPageMarginTop">{children} </div>
      )}

      {isAuthenticated && (
        <AdminBackground>
          <>
            <Row>
              <Col id="admin-menu" lg={12} xl={3} justify="center">
                <PrivateStyledLink
                  activeClassName="active-admin"
                  to={route.admin()}
                >
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faTachometerAlt}
                  />{' '}
                  Nástěnka
                </PrivateStyledLink>
                <br />
                <PrivateStyledLink
                  activeClassName="active-admin"
                  to={route.adminAllCommunities()}
                >
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faBuilding}
                  />{' '}
                 Výpis komunit
                </PrivateStyledLink>
                <PrivateStyledLink
                  activeClassName="active-admin"
                  to={route.adminMemberOfCommunities()}
                >
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faFolderOpen}
                  />{' '}
                  Členství v komunitách
                </PrivateStyledLink>
                <PrivateStyledLink activeClassName="active-admin" to={route.myAddedTickets()}>
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faNewspaper}
                  />{' '}
                  Vložené příspěvky
                </PrivateStyledLink>
                <br />
                <br />
                <PrivateStyledLink
                  activeClassName="active-admin"
                  to={route.adminOwnerOfCommunities()}
                >
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faFileAlt}
                  />{' '}
                 Moje komunity
                </PrivateStyledLink>
                <PrivateStyledLink activeClassName="active-admin" to={''}>
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faClipboardList}
                  />{' '}
                Příspěvky na vyřešení
                </PrivateStyledLink>
                <br />
                <br />
                <PrivateStyledLink activeClassName="active-admin" to={''}>
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faTools}
                  />{' '}
                  Nastavení
                </PrivateStyledLink>
              </Col>
              <Col lg={12} xl={8}>
                <AdminWrapper>{children}</AdminWrapper>
              </Col>
            </Row>
          </>
        </AdminBackground>
      )}
    </>
  );
};
