import React from 'react';
import { HeadingWithButtons } from 'src/organisms/';
import { Button, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Tickets } from 'src/organisms';

export function CommunityDetailTemplate({
                                          community,
                                          isMember,
                                          isOwner,

                                          communityId,
                                          userId,
                                          communityOwnerId,
                                        }) {
  return (
    <>
      <HeadingWithButtons header={community.name} description={community.description}>
        <div>
          {!community.closed && !isMember && (
            <Button
              variant="primary"
              onClick={() => {
                toast.success('Nyní jste součástí komunity!');
                // setIsMember(true);
              }}
            >
              PŘIDAT SE
            </Button>
          )}

          {(!community.closed || (community.closed && isMember)) && (
            <Link to={`/community-detail/${communityId}/add`}>
              <Button variant="success">Přidat ticket</Button>
            </Link>
          )}

          {isOwner && (
            <Link to={`/community-detail/${communityId}/edit_community`}>
              <Button variant="primary">
                <FontAwesomeIcon icon={faPencilAlt} className="mr2 f4" />{' '}
                Upravit popis
              </Button>
            </Link>
          )}
        </div>
      </HeadingWithButtons>

      {!community.closed && (
        <div>
          <Alert variant={'success'}>
            <div>Vítej v {community.name} komunitě.</div>
            <strong>Tato komunita je otevřená pro všechny.</strong>
          </Alert>
        </div>
      )}
      {community.closed && isMember && (
        <div>
          <Alert variant={'success'}>
            <div>Vítej v {community.name} komunitě.</div>
            <strong>Tato komunita je otevřena pouze pro její členy.</strong>
          </Alert>
        </div>
      )}

      {((!community.closed) || (isMember)) && (
        <div>
          <div>{community.description}</div>
          <br />
          <div>Počet uživatelu: {community.users.length}</div>
          <div>Počet ticketu: {community.tickets.length}</div>
          <br />
          <br />
          <Link to={`/community-detail/${communityId}/add`}>
            <Button variant="success">Přidat ticket</Button>
          </Link>
          <br />
          <br />
          <Tickets
            tickets={community.tickets}
            communityOwner={communityOwnerId.data?.communityOwnerId}
          />
        </div>
      )}

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
    </>
  );
}
