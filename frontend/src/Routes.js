import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AboutPage } from 'src/pages/AboutPage';
import { AddCommunityPage } from 'src/pages/AddCommunityPage';
import { AddTicket } from './pages/AddTicketPage';
import { Communities } from './pages/CommunitiesPage';
import { CommunityDetail } from 'src/pages/CommunityDetailPage';
import { EditCommunityPage } from './pages/EditCommunityPage';
import { ForgottenPasswordPage } from './pages/ForgottenPasswordPage';
import { HomePage } from 'src/pages/HomePage';
import { ListOfTickets } from './pages/ListOfTicketsPage';
import { PageNotFound } from 'src/pages/PageNotFound';
import { PasswordResetPage } from 'src/pages/PasswordResetPage';
import { SignInPage } from 'src/pages/SignInPage';
import { SignUpPage } from 'src/pages/SignUpPage';
import { TicketDetail } from './pages/TicketDetail';
import { TicketDetailPage } from './pages/TicketDetailPage';
import { TopNavigation } from './organisms';
import Dashboard from './private/Dashboard';
import { AdminAllCommunities } from './private/AllCommunities';

const communityDetail = () => `/community-detail/:communityId`;
const forgottenPasswordRequest = () => ':email/:code';
const ticketDetail = () => `/ticket-detail/:ticketId`;
const ticketDetailPage = () => `/ticket-detail-page/:ticketId`;

export const route = {
  home: () => `/`,
  about: () => `/about`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  forgottenPasswordRequest,
  resetPassword: () => `/password_reset/${forgottenPasswordRequest()}`,
  // resetPassword: () => `/password_reset`,
  forgottenPassword: () => '/forgotten_password',
  addCommunity: () => '/add_community',
  communityDetail,
  addTicket: () => `${communityDetail()}/add`,
  listTicket: () => `${communityDetail()}/list`,
  editCommunity: () => `${communityDetail()}/edit_community`,
  communities: () => `/communities`,
  ticketDetail,
  ticketDetailPage,
  admin: () => `/admin`,
  adminAllCommunities: () => `/admin/all-communities`,
  adminOpenCommunities: () => `/admin/open-communities`,
};

export function Routes() {
  return (
    <TopNavigation>
      <Switch>
        <Route path={route.home()} exact component={HomePage} />
        <Route path={route.about()} exact component={AboutPage} />
        <Route path={route.signIn()} exact component={SignInPage} />
        <Route path={route.signUp()} exact component={SignUpPage} />
        <Route
          path={route.resetPassword()}
          exact
          component={PasswordResetPage}
        />
        <Route
          path={route.forgottenPassword()}
          exact
          component={ForgottenPasswordPage}
        />
        <Route path={route.addCommunity()} exact component={AddCommunityPage} />
        <Route
          path={route.communityDetail()}
          exact
          component={CommunityDetail}
        />
        <Route path={route.addTicket()} exact component={AddTicket} />
        <Route path={route.listTicket()} exact component={ListOfTickets} />
        <Route path={route.ticketDetail()} exact component={TicketDetail} />
        <Route
          path={route.ticketDetailPage()}
          exact
          component={TicketDetailPage}
        />
        <Route
          path={route.editCommunity()}
          exact
          component={EditCommunityPage}
        />
        <Route path={route.communities()} exact component={Communities} />
        <Route
          path={route.adminAllCommunities()}
          exact
          component={AdminAllCommunities}
        />
        <Route
          path={route.adminOpenCommunities()}
          exact
          component={AdminAllCommunities}
        />
        <Route path={route.admin()} exact component={Dashboard} />

        <Route path="*" component={PageNotFound} />
      </Switch>
    </TopNavigation>
  );
}
