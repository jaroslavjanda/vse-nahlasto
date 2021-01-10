import React from 'react';
import { Row } from 'react-bootstrap';
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
