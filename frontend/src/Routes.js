import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AboutPage } from './pages/AboutPage';
import { AddCommunityPage } from './pages/AddCommunityPage';
import { AddTicket } from './pages/AddTicket';
import { Communities } from './pages/Communities';
import { CommunityDetail } from './pages/CommunityDetail';
import { EditCommunityPage } from './pages/EditCommunityPage';
import { ForgottenPasswordPage } from './pages/ForgottenPasswordPage';
import { HomePage } from './pages/HomePage';
import { ListOfTickets } from './pages/ListOfTickets';
import { PageNotFound } from './pages/PageNotFound';
import { PasswordResetPage } from './pages/PasswordResetPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { TicketDetail } from './pages/TicketDetail';
import { TopNavigation } from './organisms';

const communityDetail = () => `/community-detail/:communityId`;
const forgottenPasswordRequest = () => ':email/:code';
const ticketDetail = () => `/ticket-detail/:ticketId`;

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
        >}
        <Route
          path={route.communityDetail()}
          exact
          component={CommunityDetail}
        />
        <Route path={route.addTicket()} exact component={AddTicket} />
        <Route path={route.listTicket()} exact component={ListOfTickets} />
        <Route path={route.ticketDetail()} exact component={TicketDetail} />
        <Route
          path={route.editCommunity()}
          exact
          component={EditCommunityPage}
        />
        <Route path={route.communities()} exact component={Communities} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </TopNavigation>
  );
}
