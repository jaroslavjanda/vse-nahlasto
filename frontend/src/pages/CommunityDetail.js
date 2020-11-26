import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { toast } from 'react-toastify';
import { Spinner, Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Tickets } from 'src/organisms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../utils/auth';

const COMMUNITY_DETAIL_QUERY = gql`
  query CommunityList($communityId: Int!) {
    community(communityId: $communityId) {
      name
      description
      closed
      users {
        user_id
      }
      tickets {
        ticket_id
        title
        content
        likes_count
        comment_count
        status_id
        community_id
        date
        status {
          status
        }
      }
    }
  }
`;

const MEMBERSHIP_QUERY = gql`
  query CommunityOwnerId($communityId: Int!) {
    communityOwnerId(communityId: $communityId)
  }
`;

export const CommunityDetail = ({ match }) => {
  const communityId = parseInt(match.params.communityId);
  const communityState = useQuery(COMMUNITY_DETAIL_QUERY, {
    variables: { communityId },
  });

  const { user } = useAuth();

  const userId = user?.user_id;

  const communityOwnerId = useQuery(MEMBERSHIP_QUERY, {
    variables: { communityId },
  });

  const [isMember, setIsMember] = useState(false);

  const community = communityState.data?.community;

  return (
    <div style={{ textAlign: 'center' }}>
      {communityState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Načítání...</span>
        </Spinner>
      )}
      {!communityState.loading && (
        <div>
          <Container fluid className="container-header">
            <Row margin="50px">
              <Col align="left">
                <h1>{community.name}</h1>
                <p>{community.description}</p>
              </Col>
              <Col align="right">
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
              </Col>
            </Row>
          </Container>

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
        </div>
      )}
    </div>
  );
};
