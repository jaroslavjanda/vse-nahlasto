import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { CommunitiesTemplate } from '../../templates/CommunitiesTemplate';
import { Spinner } from 'react-bootstrap';
import { Button, ErrorBanner } from 'src/atoms/';
import { useAuth } from '../../utils/auth';
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
