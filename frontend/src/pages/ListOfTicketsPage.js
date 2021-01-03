import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Alert, Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import { random } from 'lodash';

const CUMMUNITY_LIST_QUERY = gql`
  query CommunityList($communityId: Int!) {
    community(communityId: $communityId) {
      name
      closed
      users {
        user_id
      }
      tickets {
        title
        content
      }
    }
  }
`;

export const ListOfTickets = ({ match }) => {
  // Will be seperated to more files, this will be only networking manager
  // Time 😢
  const communityId = parseInt(match.params.communityId);
  const quacksState = useQuery(CUMMUNITY_LIST_QUERY, {
    variables: { communityId },
  });

  const [community, setCommunity] = useState({
    name: '',
    tickets: [],
    description: '',
    users: [],
  });
  useEffect(() => {
    if (!quacksState.loading) {
      const { name, tickets, users, closed } = quacksState.data.community;
      setCommunity({
        name,
        tickets,
        closed,
      });
    }
  }, [quacksState]);
  return (
    <div style={{ textAlign: 'center' }}>
      {quacksState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Načítání...</span>
        </Spinner>
      )}
      {!quacksState.loading && (
        <div>
          <h1>Tickets of: {community.name}</h1>
          {!community.closed && (
            <div>
              <Row>
                {community.tickets.map((item) => (
                  <Col>
                    <Card style={{ width: '100%' }}>
                      <Card.Img
                        variant="top"
                        src="https://picsum.photos/180/100"
                      />
                      <Card.Body>
                        <h3>{item.title}</h3>
                        <Card.Text>{item.content}</Card.Text>

                        <div>👍 {random(15)}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          {community.closed && (
            <div>
              <Alert variant={'danger'}>
                <div>Nemůžete vidět tickety uzavřené komunity.</div>
              </Alert>
              <Button
                variant="danger"
                onClick={() => toast.info('Vaše žádost byla odeslána')}
              >
                Požádejte o přístup do této komunity.
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
