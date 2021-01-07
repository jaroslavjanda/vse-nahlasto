import React from 'react';
import { Button, Card, CardColumns, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PreviewType, CommunityPreview } from './CommunityPreview/index';

export const CommunityCardsHomepage = ({ communitiesHomepage }) => {
  const history = useHistory();

  return (
    <Row>
      <CommunityPreview
        communities={communitiesHomepage}
        previewType={PreviewType.Basic}
        isPublic={true}
      />
    </Row>
  );
};
