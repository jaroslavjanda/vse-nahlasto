import React from 'react';
import { Card, Button, Row, CardColumns } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { imgPath } from 'src/utils/imgPath';

export const CommunityCards = ({
  allCommunities,
  communitiesAccessibleToUser,
}) => {
  const history = useHistory();

  function isMemberCheck(commId) {
    if (communitiesAccessibleToUser) {
      return !!communitiesAccessibleToUser.data?.communitiesAccessibleToUserIds.includes(
        commId,
      );
    }
  }

  return (
    <Row>
      <CardColumns>
        {allCommunities && (
          <>
            {allCommunities.map((item) => (
              <Card
                style={{ width: '100%' }}
                key={item.community_id}
                onClick={() =>
                  isMemberCheck(item.community_id) || !item.closed
                    ? history.push(`community-detail/${item.community_id}`)
                    : toast.info('Požadavek byl odeslán')
                }
              >
                <Card.Img variant="top" src={imgPath('tickets', item.image)} />
                <Card.Body>
                  <h3>{item.name}</h3>
                  <Card.Text>{item.description}</Card.Text>
                  {item.closed && !isMemberCheck(item.community_id) && (
                    <Button variant="danger">PŘIPOJIT SE</Button>
                  )}
                  {!item.closed && <Button variant="primary">OTEVŘÍT</Button>}
                  {isMemberCheck(item.community_id) && <div>Jsi členem ✅</div>}
                </Card.Body>
              </Card>
            ))}
          </>
        )}

        {!allCommunities && communitiesAccessibleToUser && (
          <>
            {communitiesAccessibleToUser.map((item) => (
              <Card
                style={{ width: '100%' }}
                key={item.community_id}
                onClick={() =>
                  history.push(`community-detail/${item.community_id}`)
                }
              >
                <Card.Img variant="top" src={imgPath('tickets', item.image)} />
                <Card.Body>
                  <h3>{item.name}</h3>
                  <Card.Text>{item.description}</Card.Text>
                  <div>Jsi členem ✅</div>
                </Card.Body>
              </Card>
            ))}
          </>
        )}
      </CardColumns>
    </Row>
  );
};
