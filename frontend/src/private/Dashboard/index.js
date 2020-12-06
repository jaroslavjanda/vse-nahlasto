import React, { useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { DashboardCardWrapper, CardTitle } from './styled';
import organizationImage from './../../resources/private/Dashboard/organization-logo.svg';
import adminsImage from './../../resources/private/Dashboard/admins.svg';
import categoryImage from './../../resources/private/Dashboard/category.svg';
import messageImage from './../../resources/private/Dashboard/message.svg';
import newsImage from './../../resources/private/Dashboard/news.svg';
import servicesImage from './../../resources/private/Dashboard/services.svg';
import settingsImage from './../../resources/private/Dashboard/settings.svg';
import { Link } from 'react-router-dom';
import { route } from '../../Routes';

const Dashboard = () => {
  window.scrollTo(0, 0);
  return (
    <Row>
      <Col lg={4}>
        <Link to={route.adminAllCommunities()}>
          <DashboardCardWrapper>
            <img width="50%" src={organizationImage} />
            <CardTitle>Hledat skupiny</CardTitle>
          </DashboardCardWrapper>
        </Link>
      </Col>
      <Col lg={4}>
        <Link to={route.adminMemberOfCommunities()}>
          <DashboardCardWrapper>
            <img width="50%" src={servicesImage} />
            <CardTitle>Členství ve skupinách</CardTitle>
          </DashboardCardWrapper>
        </Link>
      </Col>
      <Col lg={4}>
        <Link to={''}>
          <DashboardCardWrapper>
            <img width="50%" src={messageImage} />
            <CardTitle>Podané tickety</CardTitle>
          </DashboardCardWrapper>
        </Link>
      </Col>
      <Col lg={4}>
        <Link to={''}>
          <DashboardCardWrapper>
            <img width="50%" src={adminsImage} />
            <CardTitle>Moje skupiny</CardTitle>
          </DashboardCardWrapper>
        </Link>
      </Col>

      <Col lg={4}>
        <Link to={''}>
          <DashboardCardWrapper>
            <img width="50%" src={newsImage} />
            <CardTitle>Moje tickety</CardTitle>
          </DashboardCardWrapper>
        </Link>
      </Col>
      <Col lg={4}>
        <Link to={''}>
          <DashboardCardWrapper>
            <img width="50%" src={settingsImage} />
            <CardTitle>Nastavení</CardTitle>
          </DashboardCardWrapper>
        </Link>
      </Col>
    </Row>
  );
};

export default Dashboard;
