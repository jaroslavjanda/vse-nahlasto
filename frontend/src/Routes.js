import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AboutPage } from 'src/pages/AboutPage';
import { HomePage } from 'src/pages/HomePage';
import { PageNotFound } from 'src/pages/PageNotFound';
import { SignInPage } from 'src/pages/SignInPage';
import { SignUpPage } from 'src/pages/SignUpPage';
import { PasswordResetPage } from 'src/pages/PasswordResetPage';
import { AddCommunityPage } from 'src/pages/AddCommunityPage';
import { EditCommunityPage } from './pages/EditCommunityPage';
import { CommunityDetail } from 'src/pages/CommunityDetail';
import { TopNavigation } from './organisms';
import { AddTicket } from './pages/AddTicket';
import { ListOfTickets } from './pages/ListOfTickets';
import { Communities } from './pages/Communities';

const communityDetail = () => `/community-detail/:communityId`;

export const route = {
  home: () => `/`,
  about: () => `/about`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  resetPassword: () => '/password_reset',
  addCommunity: () => '/add_community',
  communityDetail,
  addTicket: () => `${communityDetail()}/add`,
  listTicket: () => `${communityDetail()}/list`,
  editCommunity: () => `${communityDetail()}/edit_community`,
  communities: () => `/communities`,
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
        <Route path={route.addCommunity()} exact component={AddCommunityPage} />>}
        <Route
          path={route.communityDetail()}
          exact
          component={CommunityDetail}
        />
        <Route path={route.addTicket()} exact component={AddTicket} />
        <Route path={route.listTicket()} exact component={ListOfTickets} />
        <Route path={route.editCommunity()} exact component={EditCommunityPage} />
        <Route path={route.communities()} exact component={Communities} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </TopNavigation>
  );
}
