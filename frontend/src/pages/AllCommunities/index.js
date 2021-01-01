import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { CommunitiesTemplate } from '../../templates/CommunitiesTemplate';
import { Spinner } from 'react-bootstrap';
import { ErrorBanner, Button } from 'src/atoms/';
import { useAuth } from '../../utils/auth';
import { PreviewType } from '../../molecules/CommunityPreview';

const COMMUNITY_LIST_QUERY = gql`
  query Communities {
    communities {
      community_id
      name
      description
      closed
      image
    }
  }
`;

const USER_ACCESSIBLE_COMMUNITIES = gql`
  query UserAccessibleCommunities($userId: Int!) {
    communitiesAccessibleToUserIds(userId: $userId)
  }
`;

export const AdminAllCommunities = () => {
  const communitiesState = useQuery(COMMUNITY_LIST_QUERY);
  const history = useHistory();
  const communities = communitiesState.data?.communities;

  const user = useAuth();
  console.log(user)
  var userId;
  if (userId == null) userId = 0;

  const communitiesAccessibleToUser = useQuery(USER_ACCESSIBLE_COMMUNITIES, {
    variables: { userId },
  });
  const communitiesAccessibleToUserState = communitiesAccessibleToUser.data;

  return (
    <div style={{ textAlign: 'center' }}>
      {console.log(communitiesAccessibleToUserState)}
      {communitiesState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Načítání...</span>
        </Spinner>
      )}
      {!communitiesState.loading && (
        <>
          {communitiesState.error && (
            <ErrorBanner title={communitiesState.error.message}>
              <Button color="red" onClick={() => history.go(0)}>
                Načíst znovu
              </Button>
            </ErrorBanner>
          )}
          {communities && (
            <CommunitiesTemplate
              communities={communities}
              title={'Výpis komunit'}
              previewType={PreviewType.Basic}
            />
          )}
        </>
      )}
    </div>
  );
};
