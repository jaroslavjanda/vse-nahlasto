import React, { useCallback }  from 'react';
import { Card, Row, CardDeck, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useMutation, gql } from '@apollo/client';
import { useAuth } from 'src/utils/auth';

const LIKE_MUTATION = gql`
  mutation addLike($ownerId: Int!, $ticketId: Int!) {
    addLike(ownerId: $ownerId, ticketId: $ticketId) {
      title
    }
  }
`;

export function Tickets({ tickets }) {
  const { user } = useAuth();

  const [LikedRequest, LikedRequestState] = useMutation(LIKE_MUTATION, {
    onCompleted: ({ addLike: { user_id, ticket_id } }) => {
    },
    onError: () => {
      console.log('TEST Error while fetching the DB');
    },
  });

  const handleSetLiked = useCallback(
    (variables) => {
      LikedRequest({ variables });
    },
    [LikedRequest],
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <div>
          <Row>
            {console.log(user)}
            <CardDeck>
              {tickets.map((item) => (
                <Card style={{ width: '100%' }} key={item.title}>
                  <Card.Img variant="top" src="https://picsum.photos/180/100" />
                  <Card.Header as="h5">
                    <div>{item.date}</div>
                    <Badge variant="secondary">{item.status[0].status}</Badge>
                  </Card.Header>
                  <Card.Body>
                    <h3>{item.title}</h3>
                    <Card.Text>{item.content}</Card.Text>
                    <div>
                      <div>
                        <FontAwesomeIcon icon={faThumbsUp} className="mr2 f4" />
                        {item.likes_count}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </CardDeck>
          </Row>
        </div>
      </div>
    </div>
  );
}
