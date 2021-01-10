import React from 'react';
import { NavLink } from 'src/atoms';
import { Col, Nav, Row } from 'react-bootstrap';
import { route } from 'src/Routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faColumns,
  faBuilding,
  faClipboardList,
  faHouseUser,
  faNewspaper,
  faHotel,
} from '@fortawesome/free-solid-svg-icons';

export const SideMenu = ({ isShown, classN, children }) => {
  return (
    <div className={classN}>
      {children}
      <Row id="admin-menu">
        <Col style={{paddingLeft:0}}>
          <Nav.Item>
            <NavLink exact activeClassName="active-admin" to={route.admin()}>
              <FontAwesomeIcon
                style={{ fontSize: '18px', width: '25px' }}
                icon={faColumns}
              />{' '}
              <span className={`${isShown ? 'notVisibleText' : ''}`}>
                Nástěnka
              </span>
            </NavLink>
          </Nav.Item>

          <div className={`submenu ${isShown ? 'notVisible' : ''}`}>
            Menu uživatele
          </div>
          <Nav.Item>
            <NavLink
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
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              exact
              activeClassName="active-admin"
              to={route.adminMemberOfCommunities()}
            >
              <FontAwesomeIcon
                style={{ fontSize: '18px', width: '25px' }}
                icon={faHouseUser}
              />{' '}
              <span className={`${isShown ? 'notVisibleText' : ''}`}>
                Členství
              </span>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              exact
              activeClassName="active-admin"
              to={route.myAddedTickets()}
            >
              <FontAwesomeIcon
                style={{ fontSize: '18px', width: '25px' }}
                icon={faNewspaper}
              />{' '}
              <span className={`${isShown ? 'notVisibleText' : ''}`}>
                Moje příspěvky
              </span>
            </NavLink>
          </Nav.Item>
          <div className={`submenu ${isShown ? 'notVisible' : ''}`}>
            Menu správce
          </div>
          <Nav.Item>
            <NavLink
              exact
              activeClassName="active-admin"
              to={route.adminOwnerOfCommunities()}
            >
              <FontAwesomeIcon
                style={{ fontSize: '18px', width: '25px' }}
                icon={faHotel}
              />{' '}
              <span className={`${isShown ? 'notVisibleText' : ''}`}>
                Moje komunity
              </span>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              exact
              activeClassName="active-admin"
              to={route.ticketsToSolve()}
            >
              <FontAwesomeIcon
                style={{ fontSize: '18px', width: '25px' }}
                icon={faClipboardList}
              />{' '}
              <span className={`${isShown ? 'notVisibleText' : ''}`}>
                Příspěvky
              </span>
            </NavLink>
          </Nav.Item>
        </Col>
      </Row>
    </div>
  );
};
