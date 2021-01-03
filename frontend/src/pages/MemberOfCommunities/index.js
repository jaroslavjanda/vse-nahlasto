import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { CommunitiesTemplate } from '../../templates/CommunitiesTemplate';
import { Spinner } from 'react-bootstrap';
import { Button, ErrorBanner } from 'src/atoms/';
import { getDataFromLocalStorage } from './../../utils/localStorage';
import { PreviewType } from '../../molecules/CommunityPreview';

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
  const { user } = getDataFromLocalStorage();
  const userId = parseInt(user.user_id);
  const history = useHistory();
  const state = useQuery(USER_ACCESSIBLE_COMMUNITIES, {
    variables: { userId },
  });

  const [community, setCommunity] = useState(null);

  useEffect(() => {
    if (!state.loading && state.data != undefined) {
      const data = state.data.communitiesAccessibleToUser;
      setCommunity(data);
    }
  }, [state]);

  return (
    <div style={{ textAlign: 'center' }}>
      {console.log(community)}
      {state.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Načítání...</span>
        </Spinner>
      )}
      {!state.loading && (
        <>
          {state.error && (
            <ErrorBanner title={state.error.message}>
              <Button color="red" onClick={() => history.go(0)}>
                Načíst znovu
              </Button>
            </ErrorBanner>
          )}
          {community && (
            <CommunitiesTemplate
              communities={community}
              title={'Členství v komunitách'}
              previewType={PreviewType.Member}
            />
          )}
        </>
      )}
    </div>
  );
};
