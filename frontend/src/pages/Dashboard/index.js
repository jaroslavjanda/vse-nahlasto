import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-grid-system';

import { DashboardCardWrapper, CardTitle } from './styled';
import { route } from '../../Routes';

// Images
import organizationImage from './../../resources/pages/Dashboard/organization-logo.svg';
import adminsImage from './../../resources/pages/Dashboard/admins.svg';
import messageImage from './../../resources/pages/Dashboard/message.svg';
import newsImage from './../../resources/pages/Dashboard/news.svg';
import servicesImage from './../../resources/pages/Dashboard/services.svg';

export const Dashboard = () => {
  return (
    <Row>
      <Col lg={4}>
        <Link to={route.adminAllCommunities()}>
          <DashboardCardWrapper>
            <img width="50%" src={organizationImage} alt="Výpis komunit" />
            <CardTitle>Výpis komunit</CardTitle>
          </DashboardCardWrapper>
        </Link>
      </Col>
      <Col lg={4}>
        <Link to={route.adminMemberOfCommunities()}>
          <DashboardCardWrapper>
            <img width="50%" src={servicesImage} alt="Členství v komunitách" />
            <CardTitle>Členství v komunitách</CardTitle>
          </DashboardCardWrapper>
        </Link>
      </Col>
      <Col lg={4}>
        <Link to={route.myAddedTickets()}>
          <DashboardCardWrapper>
            <img width="50%" src={messageImage} alt="Vložené příspěvky" />
            <CardTitle>Vložené příspěvky</CardTitle>
          </DashboardCardWrapper>
        </Link>
      </Col>
      <Col lg={4}>
        <Link to={route.adminOwnerOfCommunities()}>
          <DashboardCardWrapper>
            <img width="50%" src={adminsImage} alt="Moje komunity" />
            <CardTitle>Moje komunity</CardTitle>
          </DashboardCardWrapper>
        </Link>
      </Col>
      <Col lg={4}>
        <Link to={route.ticketsToSolve()}>
          <DashboardCardWrapper>
            <img width="50%" src={newsImage} alt="Příspěvky na vyřešení" />
            <CardTitle>Příspěvky na vyřešení</CardTitle>
          </DashboardCardWrapper>
        </Link>
      </Col>
    </Row>
  );
};
