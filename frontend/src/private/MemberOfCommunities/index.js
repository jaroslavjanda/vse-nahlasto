import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { CommunitiesTemplate } from '../../templates/CommunitiesTemplate';
import { Spinner } from 'react-bootstrap';
import { ErrorBanner, Button } from 'src/atoms/';
import { useAuth } from '../../utils/auth';
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
  const { user } = getDataFromLocalStorage()
  const userId = parseInt(user.user_id);
  const quacksState = useQuery(USER_ACCESSIBLE_COMMUNITIES, {
    variables: { userId },
  });

  const [community, setCommunity] = useState(null);
  useEffect(() => {
    if (!quacksState.loading) {
      const data = quacksState.data.communitiesAccessibleToUser;
      setCommunity(data);
    }
  }, [quacksState]);
  return (
    <div style={{ textAlign: 'center' }}>
      {console.log(community)}
      {quacksState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Načítání...</span>
        </Spinner>
      )}
      {!quacksState.loading && (
        <>
          {quacksState.error && (
            <ErrorBanner title={quacksState.error.message}></ErrorBanner>
          )}
          {community && (
            <CommunitiesTemplate communities={community} title={"Členství v komunitách"} previewType={PreviewType.Member} />
          )}
        </>
      )}
    </div>
  );
};
