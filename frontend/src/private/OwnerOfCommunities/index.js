import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { ErrorBanner } from 'src/atoms/';
import { Button } from 'react-bootstrap';
import '../../molecules/CommunityPreview/styles.css';
import { useAuth } from '../../utils/auth';
import { imgPath } from '../../utils/imgPath';
import { route } from '../../Routes';
import { HeadingWithButtons } from "./../../organisms"
import { getDataFromLocalStorage } from '../../utils/localStorage';
import { CommunityPreview, PreviewType} from '../../molecules/CommunityPreview';
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
  const { user } = getDataFromLocalStorage()
  const userId = parseInt(user.user_id);
  const communitiesUserOwnsState = useQuery(COMMUNITY_USER_OWNS, {
    variables: { userId },
  });

  const [communities, setCommunities] = useState(null);
  useEffect(() => {
    if (!communitiesUserOwnsState.loading) {
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
            <ErrorBanner
              title={communitiesUserOwnsState.error.message}
            ></ErrorBanner>
          )}
          {communities && (
            <>
            <HeadingWithButtons header={"Moje komunity"}>
              <div>
                <Link to={route.addCommunity()}>

                <Button
                  variant="success"
                >
                  Přidat komunitu
                </Button>
                </Link>
              </div>
            </HeadingWithButtons>
              <CommunityPreview communities={communities} previewType={PreviewType.Owner} />
              </>
          )}
        </>
      )}
    </div>
  );
};
