import { Alert, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Tickets } from 'src/organisms';
import { imgPath } from 'src/utils/imgPath';
import React from 'react';
import { SuccessBanner } from '../atoms';

export function CommunityDetailTemplate({
  community,
  isMember,
  isOwner,
  communityId,
  handleJoinCommunity,
  handlePrivateCommunityJoinRequest,
  userId,
  activeRequest,
  ownerEmail,
}) {
  return (
    <Container>
      {(!community.closed || isMember) && (
        <div className="container-image">
          <img src={imgPath('tickets', community.image)} alt="ticket" />
          <div className="centered-image">
            <h1>{community.name}</h1>
            <div>{community.description}</div>
          </div>
        </div>
      )}

      <div>
        {console.log("is member:", isMember)}
        {!community.closed && !isMember && userId !== 0 && !isOwner && (
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

      {community.closed && !isMember && !activeRequest && (
        <div>
          <Alert variant={'danger'}>
            <div>
              Komunita {community.name} je soukromá. Pokud k ní chcete mít
              přístup, pošlete prosím žádost jejím administrátorům. Nejdříve se
              ale musíte přihlásit.
            </div>
          </Alert>
          {userId !== 0 && (
            <Button
              variant="danger"
              onClick={() => {
                handlePrivateCommunityJoinRequest({
                  variables: { userId, communityId },
                });
              }}
            >
              Zažádat o přístup
            </Button>
          )}
        </div>
      )}
      
      {community.closed && !isMember && activeRequest && (
        <SuccessBanner title={'Požadavek byl potvrzen'} >
          Váš požadavek o přijetí do této komunity byl již zaznamenán,
          vyčkejte prosím na jeho vyřízení. V případě dlouhé časové prodlevy či jakýchkoliv
          nesrovnalostí můžete kontaktovat administrátora komunity na {" "}
          <b><a href={"mailto:"} style={{ color: "white"}}>{ ownerEmail }</a></b>.
        </SuccessBanner>
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
          <Tickets tickets={community.tickets} isOwner={isOwner} />
        </div>
      )}
    </Container>
  );
}
