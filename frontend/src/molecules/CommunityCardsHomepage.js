import React from 'react';
import { CommunityPreview } from './CommunityPreview/index';

export const CommunityCardsHomepage = ({ communitiesHomepage }) => {
  return (
      <CommunityPreview
        communities={communitiesHomepage}
      />
  );
};
