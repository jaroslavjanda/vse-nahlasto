import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { CommunitiesTemplate } from '../../templates/CommunitiesTemplate';
import { getDataFromLocalStorage } from '../../utils/localStorage';
import { PreviewType } from '../../molecules/CommunityPreview';
import { ErrorType } from '../../utils/Error';
import { ErrorBannerWithRefreshButton } from '../../atoms/ErrorBannerWithRefreshButton';
import { Loading } from '../../atoms';
import { Alert } from 'react-bootstrap';

const COMMUNITY_USER_OWNS = gql`
  query CommunitiesUserOwns($userId: Int!) {
    communitiesUserOwns(userId: $userId) {
      community_id
      name
      description
      closed
      image
    }
  }
`;

export const OwnerOfCommunities = () => {
  let user = getDataFromLocalStorage()?.user;
  var userId = user ? parseInt(user.user_id) : undefined;
  if (userId === undefined) userId = 0;

  const state = useQuery(COMMUNITY_USER_OWNS, {
    variables: { userId },
  });
  const communities = state.data?.communitiesUserOwns;

  return (
    <div style={{ textAlign: 'center' }}>
      {state.loading && <Loading />}
      {!state.loading && (
        <>
          {state.error && (
            <ErrorBannerWithRefreshButton
              errorType={ErrorType.LOAD_DATA_FAILED}
            />
          )}
          {communities ?(
            <CommunitiesTemplate
              communities={communities}
              title={'Výpis mých komunit'}
              previewType={PreviewType.Owner}
              addCommunity={true}
            />
          ): (
            <div style={{marginTop:"3rem"}}>
              <Alert variant={'success'}>
                Nemáš žádné komunity
              </Alert>
            </div>
          )}
        </>
      )}
    </div>
  );
};
