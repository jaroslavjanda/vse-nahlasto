import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CommunityCard } from './CommunityCard';

export const PreviewType = {
  Member: 'Member',
  Owner: 'Owner',
  Basic: 'Basic',
};

export const CommunityPreview = ({ communities, previewType, isPublic }) => {
  return (
    <div className="news">
      <Row>
        {communities.map((community) => (
          <Col lg={isPublic ? 4 : 6} md={12} key={community.community_id}>
            <CommunityCard community={community} previewType={previewType} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
