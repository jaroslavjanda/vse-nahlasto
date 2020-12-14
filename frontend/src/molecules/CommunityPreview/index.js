import React from 'react';
import { Card, Button, Row, CardColumns, Col } from 'react-bootstrap';
import { CommunityCard } from './CommunityCard';
export const PreviewType = {
  Member: 'Member',
  Owner: 'Owner',
  Basic: 'Basic',
};
export const CommunityPreview = ({
  communities,
  previewType,
  isPublic = false,
}) => {
  return (
    <div className="news">
      <Row>
        {communities.map((community) => (
          <Col lg={isPublic ? 4 : 6} md={12}>
            <CommunityCard community={community} previewType={previewType} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
