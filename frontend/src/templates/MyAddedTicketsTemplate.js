import React from 'react';
import { CommunityCards } from 'src/molecules';
import { HeadingWithButtons } from 'src/organisms/';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CommunityPreview } from './../molecules/CommunityPreview/';
import { Tickets } from 'src/organisms';
export function MyAddedTicketsTemplate({
  allCommunities,
  communitiesAccessibleToUser,
  previewType,
  communities,
  ownerOfCommunities,
  title,
  isPublic,
}) {
  const history = useHistory();
  return (
    <Container>
      <HeadingWithButtons header={title ? title : ''}>
      </HeadingWithButtons>

      <CommunityPreview
        communities={communities}
        previewType={previewType}
        isPublic={isPublic}
      />
    </Container>
  );
}
