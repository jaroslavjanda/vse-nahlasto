import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { HeadingWithButtons } from '../organisms';
import { CommunityPreview } from '../molecules/CommunityPreview';
import { route } from '../Routes';

import '../molecules/CommunityPreview/styles.css';

export const CommunitiesTemplate = ({
  previewType,
  communities,
  title,
  isPublic,
}) => {
  const history = useHistory();
  return (
    <Container>
      {console.log(communities)}
      <HeadingWithButtons header={title ? title : ''}>
        <>
          {!isPublic && (
            <Button
              variant="success"
              onClick={() => history.push(route.addCommunity())}
            >
              Přidat komunitu
            </Button>
          )}
        </>
      </HeadingWithButtons>
      <CommunityPreview
        communities={communities}
        previewType={previewType}
        isPublic={isPublic}
      />
    </Container>
  );
};
