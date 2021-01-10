import React from 'react';
import { PreviewType, CommunityPreview } from './CommunityPreview/index';

export const CommunityCardsHomepage = ({ communitiesHomepage }) => {
  return (
      <CommunityPreview
        communities={communitiesHomepage}
        previewType={PreviewType.Basic}
        isPublic={true}
      />
  );
};
