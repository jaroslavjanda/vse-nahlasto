import React from 'react';
import { Button, Card, CardColumns, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export const CommunityCardsHomepage = ({ communitiesHomepage, isMember }) => {
  const history = useHistory();

  return (
    <Row>
      <CardColumns>
        {communitiesHomepage.map((item) => (
          <Card style={{ width: '100%' }} key={item.community_id}>
            <Card.Img variant="top" src="https://picsum.photos/180/100" />
            <Card.Body>
              <h3>{item.name}</h3>
              <Card.Text>{item.description}</Card.Text>
              {item.closed && (
                <Button
                  variant="danger"
                  onClick={() => toast.info('Your request was sended')}
                >
                  PŘIPOJIT SE
                </Button>
              )}
              {!item.closed && (
                <Button
                  variant="success"
                  onClick={() =>
                    history.push(`community-detail/${item.community_id}`)
                  }
                >
                  OTEVŘÍT
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </Row>
  );
};
