import React, { useState, useEffect } from 'react';
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
  return (
    <>
{/*       <div className="main-content">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-xl-3 col-lg-6">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                          Traffic
                        </h5>
                        <span className="h2 font-weight-bold mb-0">
                          350,897
                        </span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar"></i>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up"></i> 3.48%
                      </span>
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                          New users
                        </h5>
                        <span className="h2 font-weight-bold mb-0">2,356</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie"></i>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down"></i> 3.48%
                      </span>
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                          Sales
                        </h5>
                        <span className="h2 font-weight-bold mb-0">924</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users"></i>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down"></i> 1.10%
                      </span>
                      <span className="text-nowrap">Since yesterday</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                          Performance
                        </h5>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent"></i>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up"></i> 12%
                      </span>
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <br />

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
          <Link to={route.adminOwnerOfCommunities()}>
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
    </>
  );
};

export default Dashboard;
