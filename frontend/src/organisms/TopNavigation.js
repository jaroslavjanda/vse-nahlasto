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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faSignOutAlt, faBars, faHome, faBuilding, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

export const TopNavigation = ({ children }) => {
  const { signout } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [isAuthenticated, setisauthenticated] = useState(
    getDataFromLocalStorage()
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
                  <FontAwesomeIcon
                    className="top"
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faHome}
                  />{' '}
                  <span>
                    Domů
                  </span>
                </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink exact to={route.communities()} className="pa3">
                    <FontAwesomeIcon
                      className="top"
                      style={{ fontSize: '18px', width: '25px' }}
                      icon={faBuilding}
                    />{' '}
                    Komunity
                  </NavLink>
                </Nav.Item>
              </>
            )}
            {isAuthenticated ? (
              <Col>
                <Dropdown className={'side'}>
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
                      
                <Row>
                  <Col style={{paddingLeft:0}}>
                  <div className={`top navButton center name`}>
                    {' '}{user.name}{' '}{user.surname}
                  </div>
                  <Nav.Item className={'top'}>
                      
                    <NavLink exact to={route.forgottenPassword()}>
                      <FontAwesomeIcon
                        style={{ fontSize: '18px', width: '25px' }}
                        icon={faKey}
                      />{' '}
                      Změna hesla
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item className={'top'}>
                    
                    <a href="/" onClick={() => {
                          signout();
                          history.push(route.home());
                          window.location.reload();
                        }} 
                        className={'link no-underline f6 dib'}
                        >
                          <FontAwesomeIcon
                    style={{ fontSize: '18px', width: '25px' }}
                    icon={faSignOutAlt}
                  />{' '}
                    Odhlásit se
                    </a>
                  </Nav.Item>
                  </Col>
                </Row>
                <SideMenu classN={'top'} />
              </Col>
            ) : (
              <>
                <Nav.Item style={{marginBottom:"10px"}}>
                  <NavLink to={route.signIn()} className="pa3">
                    <FontAwesomeIcon
                      className="top"
                      style={{ fontSize: '18px', width: '25px' }}
                      icon={faSignInAlt}
                    />{' '}
                    Přihlásit se
                  </NavLink>
                </Nav.Item>
                <Nav.Item style={{marginLeft:"15px",marginTop:"5px"}}>
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
              <Col
                style={isShown ? {flexGrow:0,zIndex:100} : {flexGrow:1,zIndex:100}} 
                justify="center"
                xs={0}
              >
                <SideMenu isShown={isShown} classN={"side"}>
                  <Nav>
                    <Button
                      className="submenuButton"
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
              <Col lg={isShown ? 12 : 11} xs={0}>
                <AdminWrapper>{children}</AdminWrapper>
              </Col>
            </Row>
          </>
        </AdminBackground>
      )}
    </>
  );
};
