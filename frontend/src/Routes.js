import React from 'react';
import { Route, Switch } from 'react-router-dom';

/**
 * Main public pages
 */
import { HomePage } from 'src/pages/HomePage';
import { TermsOfServicePage } from 'src/pages/TermsOfServicePage';
import { SignInPage } from 'src/pages/SignInPage';
import { SignUpPage } from 'src/pages/SignUpPage';
import { ForgottenPasswordPage } from './pages/ForgottenPasswordPage';
import { PasswordResetPage } from 'src/pages/PasswordResetPage';

/**
 * Communities pages 
 */
import { Communities } from './pages/CommunitiesPage';
import { AddCommunityPage } from 'src/pages/AddCommunityPage';

/**
 * Community detail pages 
 */
import { CommunityDetail } from 'src/pages/CommunityDetailPage';
import { EditCommunityPage } from './pages/EditCommunityPage';
import { AddTicket } from './pages/AddTicketPage';
import { ListOfTickets } from './pages/ListOfTicketsPage';


/**
 * administration
 */
import { Dashboard } from 'src/pages/Dashboard';
import { AdminAllCommunities } from 'src/pages/AllCommunities';
import { MemberOfCommunities } from 'src/pages/MemberOfCommunities';
import { OwnerOfCommunities } from 'src/pages/OwnerOfCommunities';
import { MyAddedTickets } from 'src/pages/MyAddedTickets';
/**
 * organism used
 */
import { TopNavigation } from './organisms';

/**
 * old or not used? REMOVE?
 */
import { TicketDetail } from './pages/TicketDetail';
import { TicketDetailPage } from './pages/TicketDetailPage';
import { PageNotFound } from 'src/pages/PageNotFound';

/**
 * function with variable
 */
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
  communityDetailRaw: () => '/community-detail',
  addTicket: () => `${communityDetail()}/add`,
  listTicket: () => `${communityDetail()}/list`,
  editCommunity: () => `${communityDetail()}/edit_community`,
  communities: () => `/communities`,
  ticketDetail,
  ticketDetailPage,
  admin: () => `/admin`,
  adminAllCommunities: () => `/admin/all-communities`,
  adminMemberOfCommunities: () => `/admin/member-of-communities`,
  adminOwnerOfCommunities: () => `/admin/owner-of-communities`,
  myAddedTickets: () => `/admin/my-added-tickets`,
  termsOfService: () => `/termsOfService`,
};

export function Routes() {
  return (
    <TopNavigation>
      <Switch>
        <Route path={route.home()} exact component={HomePage} />
        <Route path={route.signIn()} exact component={SignInPage} />
        <Route path={route.signUp()} exact component={SignUpPage} />
        <Route path={route.resetPassword()} exact component={PasswordResetPage}/>
        <Route path={route.forgottenPassword()} exact component={ForgottenPasswordPage}/>
        <Route path={route.addCommunity()} exact component={AddCommunityPage} />
        <Route path={route.communityDetail()} exact component={CommunityDetail}  />
        <Route path={route.addTicket()} exact component={AddTicket} />
        <Route path={route.listTicket()} exact component={ListOfTickets} />
        <Route path={route.ticketDetail()} exact component={TicketDetail} />
        <Route path={route.ticketDetailPage()} exact component={TicketDetailPage} />
        <Route path={route.editCommunity()} exact component={EditCommunityPage} />
        <Route path={route.communities()} exact component={Communities} />
        <Route path={route.adminAllCommunities()} exact component={AdminAllCommunities} />
        <Route path={route.adminMemberOfCommunities()} exact component={MemberOfCommunities} />
        <Route path={route.adminOwnerOfCommunities()} exact component={OwnerOfCommunities} />
        <Route path={route.myAddedTickets()} exact component={MyAddedTickets} />
        <Route path={route.termsOfService()} exact component={TermsOfServicePage} />
        <Route path={route.admin()} exact component={Dashboard} />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </TopNavigation>
  );
}
