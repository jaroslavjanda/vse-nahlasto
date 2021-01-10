import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { HeadingWithButtons } from '../organisms';
import { CommunityPreview } from '../molecules/CommunityPreview';
import { route } from '../Routes';

import '../molecules/CommunityPreview/styles.css';

export const CommunitiesTemplate = ({
  communities,
  title,
  addCommunity
}) => {
  const history = useHistory();
  return (
    <Container>
      <HeadingWithButtons header={title ? title : ''}>
        {addCommunity && (
          <Button
            variant="success"
            onClick={() => history.push(route.addCommunity())}
          >
            Přidat komunitu
          </Button>
        )}
      </HeadingWithButtons>
      <CommunityPreview
        communities={communities}
      />
    </Container>
  );
};
