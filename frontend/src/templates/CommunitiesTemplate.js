import React from 'react';
import { CommunityCards } from 'src/molecules';
import { HeadingWithButtons } from 'src/organisms/';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CommunityPreview } from './../molecules/CommunityPreview/';
export function CommunitiesTemplate({
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
        <div>
          <Button
            variant="success"
            onClick={() => history.push(`/add_community`)}
          >
            Přidat komunitu
          </Button>
        </div>
      </HeadingWithButtons>
      {console.log('Owner of communities:', ownerOfCommunities)}

      <CommunityPreview
        communities={communities}
        previewType={previewType}
        isPublic={isPublic}
      />

      {/*
      <CommunityCards
        allCommunities={allCommunities}
        communitiesAccessibleToUser={communitiesAccessibleToUser}
        ownerOfCommunities={ownerOfCommunities}
      />
      */}
    </Container>
  );
}
