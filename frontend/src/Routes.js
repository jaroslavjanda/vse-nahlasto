import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Pages
import { HomePage } from './pages/HomePage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ForgottenPasswordPage } from './pages/ForgottenPasswordPage';
import { PasswordResetPage } from './pages/PasswordResetPage';
import { Communities } from './pages/CommunitiesPage';
import { AddCommunityPage } from './pages/AddCommunityPage';
import { CommunityDetail } from './pages/CommunityDetailPage';
import { EditCommunityPage } from './pages/EditCommunityPage';
import { AddTicket } from './pages/AddTicketPage';
import { Dashboard } from './pages/Dashboard';
import { AdminAllCommunities } from './pages/AllCommunities';
import { MemberOfCommunities } from './pages/MemberOfCommunities';
import { OwnerOfCommunities } from './pages/OwnerOfCommunities';
import { MyAddedTickets } from './pages/MyAddedTickets';
import { TicketsToSolve } from './pages/TicketsToSolve';
import { TicketDetail } from './pages/TicketDetail';
import { PageNotFound } from './pages/PageNotFound';

// Components
import { TopNavigation } from './organisms';

const communityDetail = () => `/community-detail/:communityId`;
const forgottenPasswordRequest = () => ':email/:code';
const ticketDetail = () => `/ticket-detail/:ticketId`;

export const route = {
  home: () => `/`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  forgottenPasswordRequest,
  resetPassword: () => `/password_reset/${forgottenPasswordRequest()}`,
  forgottenPassword: () => '/forgotten_password',
  addCommunity: () => '/add_community',
  communityDetail,
  communityDetailRaw: () => '/community-detail',
  addTicket: () => `${communityDetail()}/add`,
  editCommunity: () => `${communityDetail()}/edit_community`,
  communities: () => `/communities`,
  ticketDetail,
  admin: () => `/admin`,
  adminAllCommunities: () => `/admin/all-communities`,
  adminMemberOfCommunities: () => `/admin/member-of-communities`,
  adminOwnerOfCommunities: () => `/admin/owner-of-communities`,
  myAddedTickets: () => `/admin/my-added-tickets`,
  ticketsToSolve: () => `/admin/tickets-to-solve`,
  termsOfService: () => `/termsOfService`,
};

export function Routes() {
  return (
    <TopNavigation>
      <Switch>
        <Route path={route.home()} exact component={HomePage} />
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
        <Route path={route.ticketDetail()} exact component={TicketDetail} />
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
          path={route.adminMemberOfCommunities()}
          exact
          component={MemberOfCommunities}
        />
        <Route
          path={route.adminOwnerOfCommunities()}
          exact
          component={OwnerOfCommunities}
        />
        <Route path={route.myAddedTickets()} exact component={MyAddedTickets} />
        <Route path={route.ticketsToSolve()} exact component={TicketsToSolve} />
        <Route
          path={route.termsOfService()}
          exact
          component={TermsOfServicePage}
        />
        <Route path={route.admin()} exact component={Dashboard} />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </TopNavigation>
  );
}
