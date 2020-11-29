
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
  setIsMember,
  communityId,
  userId,
  communityOwnerId
}) {
return (
    <>
      <HeadingWithButtons header={community.name} description={community.description}>
        <div>      
            {!isMember && (
                <Button
                variant="primary"
                onClick={() => {
                    toast.success('Your are in community');
                    setIsMember(true);
                }}
                >
                PŘIDAT SE
                </Button>
            )}
            {!community.closed && (
                <Link to={`/community-detail/${communityId}/add`}>
                <Button variant="success">Přidat ticket</Button>
                </Link>
            )}
            {userId && userId === communityOwnerId.data?.communityOwnerId && (
                <Link to={`/community-detail/${communityId}/edit_community`}>
                <Button variant="primary">
                    <FontAwesomeIcon icon={faPencilAlt} className="mr2 f4" />{' '}
                    Upravit popis
                </Button>
                </Link>
            )}
        </div>
      </HeadingWithButtons>
      {!community.closed && !isMember && (
            <div>
              <Alert variant={'success'}>
                <div>Vítej v {community.name} komunitě.</div>
                <div>
                  <strong>Tato komunita je otevřená pro všechny</strong>
                </div>
              </Alert>
              <Tickets
                tickets={community.tickets}
                communityOwner={communityOwnerId.data?.communityOwnerId}
              />
            </div>
          )}
          {!community.closed && isMember && (
            <div>
              <Alert variant={'success'}>
                <div>Vítej v {community.name} komunitě.</div>
                <div>
                  <strong>Tato komunita je otevřená pro všechny</strong>
                </div>
              </Alert>
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
          {community.closed && (
            <div>
              <Alert variant={'danger'}>
                <div>Komunita {community.name} vyžaduje žádost o přístup.</div>
                <div></div>
              </Alert>
              <Button
                variant="danger"
                onClick={() => toast.info('Your request was sended')}
              >
                Zažádat o přístup
              </Button>
            </div>
          )}
    </>
  );
}
