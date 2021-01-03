import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Button, ErrorBanner } from 'src/atoms/';
import '../../molecules/CommunityPreview/styles.css';
import { route } from '../../Routes';
import { HeadingWithButtons } from './../../organisms';
import { getDataFromLocalStorage } from '../../utils/localStorage';
import { CommunityPreview, PreviewType } from '../../molecules/CommunityPreview';

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
  const { user } = getDataFromLocalStorage();
  const userId = parseInt(user.user_id);
  const history = useHistory();
  const communitiesUserOwnsState = useQuery(COMMUNITY_USER_OWNS, {
    variables: { userId },
  });

  const [communities, setCommunities] = useState(null);
  useEffect(() => {
    if (
      !communitiesUserOwnsState.loading &&
      communitiesUserOwnsState.data != undefined
    ) {
      const data = communitiesUserOwnsState.data.communitiesUserOwns;
      setCommunities(data);
    }
  }, [communitiesUserOwnsState]);
  return (
    <div style={{ textAlign: 'center' }}>
      {communitiesUserOwnsState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Načítání...</span>
        </Spinner>
      )}
      {!communitiesUserOwnsState.loading && (
        <>
          {communitiesUserOwnsState.error && (
            <ErrorBanner title={communitiesUserOwnsState.error.message}>
              <Button color="red" onClick={() => history.go(0)}>
                Načíst znovu
              </Button>
            </ErrorBanner>
          )}
          {communities && (
            <>
              <HeadingWithButtons header={'Moje komunity'}>
                <div>
                  <Link to={route.addCommunity()}>
                    <Button variant="success">Přidat komunitu</Button>
                  </Link>
                </div>
              </HeadingWithButtons>
              <CommunityPreview
                communities={communities}
                previewType={PreviewType.Owner}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
