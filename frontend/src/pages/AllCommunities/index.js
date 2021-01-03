import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { CommunitiesTemplate } from '../../templates/CommunitiesTemplate';
import { PreviewType } from '../../molecules/CommunityPreview';
import { ErrorType } from '../../utils/Error';
import { ErrorBannerWithRefreshButton } from '../../atoms/ErrorBannerWithRefreshButton';
import { Loading } from '../../atoms';

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

export const AdminAllCommunities = () => {
  const state = useQuery(COMMUNITY_LIST_QUERY);
  const communities = state.data?.communities;

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
              title={'Výpis komunit'}
              previewType={PreviewType.Basic}
            />
          )}
        </>
      )}
    </div>
  );
};
