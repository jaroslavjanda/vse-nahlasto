import { Alert, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Tickets } from 'src/organisms';
import { imgPath } from 'src/utils/imgPath';
import React from 'react';

export function CommunityDetailTemplate({
  community,
  isMember,
  isOwner,
  communityId,
  handleJoinCommunity,
  userId,
  communityOwnerId,
}) {
  console.log()
  return (
    <Container>
      {(!community.closed || isMember) && (
        <div className="container-image">
          <img src={imgPath('tickets', community.image)} />
          <div className="centered-image">
            <h1>{community.name}</h1>
            <div>{community.description}</div>
          </div>
        </div>
      )}

      <div>
        {!community.closed && !isMember && userId !== 0 && (
          <Button
            variant="primary"
            style={{ width: '150px' }}
            onClick={() => {
              handleJoinCommunity({ variables: { userId, communityId } });
            }}
          >
            Přidat se
          </Button>
        )}

        {isOwner && (
          <Link to={`/community-detail/${communityId}/edit_community`}>
            <Button variant="primary">
              <FontAwesomeIcon icon={faPencilAlt} className="mr2 f4" /> Upravit
              popis
            </Button>
          </Link>
        )}
      </div>

      {community.closed && !isMember && (
        <div>
          <Alert variant={'danger'}>
            <div>Komunita {community.name} vyžaduje žádost o přístup.</div>
          </Alert>
          <Button
            variant="danger"
            onClick={() => toast.info('Požadavek byl odeslán.')}
          >
            Zažádat o přístup
          </Button>
        </div>
      )}

      {(!community.closed || isMember) && (
        <div>
          <Link to={`/community-detail/${communityId}/add`}>
            <Button style={{ width: '150px' }} variant="success">
              Přidat příspěvek
            </Button>
          </Link>
          <br />
          <br />
          <Tickets
            tickets={community.tickets}
            communityOwner={communityOwnerId.data?.communityOwnerId}
          />
        </div>
      )}
    </Container>
  );
}
