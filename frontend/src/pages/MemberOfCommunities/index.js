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
  const { user } = getDataFromLocalStorage();
  const userId = parseInt(user.user_id);
  const state = useQuery(USER_ACCESSIBLE_COMMUNITIES, {
    variables: { userId },
  });
  const communities = state.data?.communitiesAccessibleToUser;

  //TODO Delete
  /*const [community, setCommunity] = useState(null);

  useEffect(() => {
    if (!state.loading && state.data != undefined) {
      const data = state.data.communitiesAccessibleToUser;
      setCommunity(data);
    }
  }, [state]);
*/
  return (
    <div className="center">
      {state.loading && (<Loading />)}
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
