import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'src/utils/auth';
import { getDataFromLocalStorage } from '../utils/localStorage';

import { NavLink } from 'src/atoms';
import { Col, Nav, Row } from 'react-bootstrap';

import { route } from 'src/Routes';
import '../organisms/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faClipboardList,
  faFileAlt,
  faFolderOpen,
  faNewspaper,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';

export const SideMenu = ({ isShown, classN, children }) => {
  return (
    <div className={classN}>
      {children}
      <Row id="admin-menu" className={'menuContent'}>
        <Col>
          <Nav.Item>
            <NavLink exact activeClassName="active-admin" to={route.admin()}>
              <FontAwesomeIcon
                style={{ fontSize: '18px', width: '25px' }}
                icon={faTachometerAlt}
              />{' '}
              <span className={`${isShown ? 'notVisibleText' : ''}`}>
                Nástěnka
              </span>
            </NavLink>
          </Nav.Item>

          <div className={`submenu ${isShown ? 'notVisible' : ''}`}>
            Uživatel
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
                icon={faFolderOpen}
              />{' '}
              <span className={`${isShown ? 'notVisibleText' : ''}`}>
                Členství v komunitách
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
                Vložené příspěvky
              </span>
            </NavLink>
          </Nav.Item>
          <div className={`submenu ${isShown ? 'notVisible' : ''}`}>
            Správce
          </div>
          <Nav.Item>
            <NavLink
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
                Příspěvky na vyřešení
              </span>
            </NavLink>
          </Nav.Item>
        </Col>
      </Row>
    </div>
  );
};
