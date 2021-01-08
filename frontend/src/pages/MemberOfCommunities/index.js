import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { CommunitiesTemplate } from '../../templates/CommunitiesTemplate';
import { getDataFromLocalStorage } from './../../utils/localStorage';
import { PreviewType } from '../../molecules/CommunityPreview';
import { ErrorType } from '../../utils/Error';
import { ErrorBannerWithRefreshButton } from '../../atoms/ErrorBannerWithRefreshButton';
import { Loading } from '../../atoms';

const USER_ACCESSIBLE_COMMUNITIES = gql`
  query UserAccessibleCommunities($userId: Int!) {
    communitiesAccessibleToUser(userId: $userId) {
      community_id
      name
      description
      closed
      image
    }
  }
`;

export const MemberOfCommunities = () => {
  let user = getDataFromLocalStorage()?.user;
  var userId = user ? parseInt(user.user_id) : undefined;
  if (userId === undefined) userId = 0;

  const state = useQuery(USER_ACCESSIBLE_COMMUNITIES, {
    variables: { userId },
  });
  const communities = state.data?.communitiesAccessibleToUser;
  
  return (
    <div className="center">
      {state.loading && <Loading />}
      {!state.loading && (
        <>
          {state.error && (
            <ErrorBannerWithRefreshButton
              errorType={ErrorType.LOAD_DATA_FAILED}
            />
          )}
          {communities && (
            <CommunitiesTemplate
              communities={communities}
              title={'Členství v komunitách'}
              previewType={PreviewType.Member}
            />
          )}
        </>
      )}
    </div>
  );
};
