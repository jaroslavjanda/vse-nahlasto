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
  faCaretDown,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import { getDataFromLocalStorage } from '../utils/localStorage';

export const TopNavigation = ({ children }) => {
  const { signout } = useAuth();
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('quacker-auth'),
  );
  const [isShown, setIsShown] = useState(true);
  console.log(isShown)
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
              <Col id="admin-menu" xl={isShown ? 1 : 3} justify="center">
                <div class="submenuButton" onClick={()=>setIsShown(!isShown)}>
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={isShown ? faCaretRight : faCaretDown}
                  />
                </div>
                <PrivateStyledLink activeClassName="active-admin" to={route.admin()} >
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faTachometerAlt}
                  />{' '}
                 <span className={`${isShown ? "notVisibleText" : ""}`}>Nástěnka</span>
                </PrivateStyledLink>
                
                <div className={`submenu ${isShown ? "notVisible" : ""}`}>Uživatel</div>

                <PrivateStyledLink activeClassName="active-admin" to={route.adminAllCommunities()} >
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faBuilding}
                  />{' '}
                  <span className={`${isShown ? "notVisibleText" : ""}`}>Výpis komunit</span>
                </PrivateStyledLink>
                <PrivateStyledLink activeClassName="active-admin" to={route.adminMemberOfCommunities()} >
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faFolderOpen}
                  />{' '}
                  <span className={`${isShown ? "notVisibleText" : ""}`}>Členství v komunitách</span>
                </PrivateStyledLink>
                <PrivateStyledLink activeClassName="active-admin" to={route.myAddedTickets()}>
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faNewspaper}
                  />{' '}
                  <span className={`${isShown ? "notVisibleText" : ""}`}>Vložené příspěvky</span>
                </PrivateStyledLink>
                <div className={`submenu ${isShown ? "notVisible" : ""}`}>Správce</div>
                <PrivateStyledLink activeClassName="active-admin" to={route.adminOwnerOfCommunities()} >
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faFileAlt}
                  />{' '}
                  <span className={`${isShown ? "notVisibleText" : ""}`}>Moje komunity</span>
                </PrivateStyledLink>
                <PrivateStyledLink activeClassName="active-admin" to={''}>
                  <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faClipboardList}
                  />{' '}
                  <span className={`${isShown ? "notVisibleText" : ""}`}>Příspěvky na vyřešení</span>
                </PrivateStyledLink>
              </Col>
              <Col xl={isShown ? 11 : 8}>
                <AdminWrapper>{children}</AdminWrapper>
              </Col>
            </Row>
          </>
        </AdminBackground>
      )}
    </>
  );
};
