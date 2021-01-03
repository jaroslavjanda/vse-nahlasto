import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { CommunitiesTemplate } from '../templates/CommunitiesTemplate';
import { ErrorType } from '../utils/Error';
import { Loading } from '../atoms';
import { ErrorBannerWithRefreshButton } from '../atoms/ErrorBannerWithRefreshButton';

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

export const Communities = () => {
  const communitiesState = useQuery(COMMUNITY_LIST_QUERY);
  const communities = communitiesState.data?.communities;

  return (
    <div className="center">
      {communitiesState.loading && <Loading />}
      {!communitiesState.loading && (
        <>
          {communitiesState.error && (
            <ErrorBannerWithRefreshButton
              errorType={ErrorType.LOAD_DATA_FAILED}
            />
          )}
          {communities && (
            <>
              <CommunitiesTemplate
                communities={communities}
                title={'Komunity'}
                isPublic={true}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
