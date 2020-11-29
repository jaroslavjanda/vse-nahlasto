import React from 'react';
import { Card, Button, Row, CardColumns } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { imgPath } from 'src/utils/imgPath'

export const CommunityCards = ({
communities,
isMember
}) => {
  const history = useHistory();

  return (
    <Row>
        <CardColumns>
        {communities.map((item) => (
            <Card style={{ width: '100%' }} key={item.community_id}>
                <Card.Img
                    variant="top"
                    src={imgPath("tickets",item.image)}
                />
                <Card.Body>
                    <h3>{item.name}</h3>
                    <Card.Text>{item.description}</Card.Text>
                    {item.closed && !isMember && (
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
                        history.push(
                            `community-detail/${item.community_id}`,
                        )
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
