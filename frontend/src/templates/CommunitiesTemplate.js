import React from 'react';
import { CommunityCards } from 'src/molecules';
import { HeadingWithButtons } from 'src/organisms/';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export function CommunitiesTemplate({
  allCommunities,
  communitiesAccessibleToUser,
}) {
  const history = useHistory();
  return (
    <>
      <HeadingWithButtons header="Komunity">
        <div>
          <Button
            variant="success"
            onClick={() => history.push(`/add_community`)}
          >
            Přidat komunitu
          </Button>
        </div>
      </HeadingWithButtons>
      <CommunityCards
        allCommunities={allCommunities}
        communitiesAccessibleToUser={communitiesAccessibleToUser}
      />
    </>
  );
}
