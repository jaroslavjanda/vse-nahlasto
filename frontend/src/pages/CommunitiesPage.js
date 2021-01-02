import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { CommunitiesTemplate } from '../templates/CommunitiesTemplate';
import { Spinner } from 'react-bootstrap';
import { Button, ErrorBanner } from 'src/atoms';
import { useAuth } from '../utils/auth';

const COMMUNITY_LIST_QUERY = gql`
  query Communities($userId: Int!) {
    communitiesAccessibleToUserIds(userId: $userId)
    communities {
      community_id
      name
      description
      closed
      image
    }
  }
`;

export const Communities = () => {
  const user = useAuth();
  var userId = user.user?.user_id;
  if (userId == null) userId = 0;

  const communitiesState = useQuery(COMMUNITY_LIST_QUERY, {
    variables: { userId },
  });

  const history = useHistory();
  const communities = communitiesState.data?.communities;

  return (
    <div style={{ textAlign: 'center' }}>
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
              title={'Komunity'}
              isPublic={true}
            />
          )}
        </>
      )}
    </div>
  );
};
