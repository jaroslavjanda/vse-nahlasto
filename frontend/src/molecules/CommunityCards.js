import React from 'react';
import { Card, Button, Row, CardColumns } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { imgPath } from 'src/utils/imgPath'

export const CommunityCards = ({
allCommunities,
communitiesAccessibleToUser
}) => {
  const history = useHistory();

  function isMemberCheck(commId) {
    return !!communitiesAccessibleToUser.data?.communitiesAccessibleToUserIds.includes(commId);
  }

  return (
    <Row>
        <CardColumns>
        {allCommunities.map((item) => (
            <Card style={{ width: '100%' }} key={item.community_id}>
                <Card.Img
                    variant="top"
                    src={imgPath("tickets",item.image)}
                />
                <Card.Body>
                    <h3>{item.name}</h3>
                    <Card.Text>{item.description}</Card.Text>
                    {item.closed && !isMemberCheck(item.community_id) && (
                    <Button
                        variant="danger"
                        onClick={() => toast.info('Požadavek byl odeslán')}
                    >
                        PŘIPOJIT SE
                    </Button>
                    )}
                  {console.log("Comm name:", item.name, "condition:", item.closed && isMemberCheck(item.community_id))}
                    { ( ( !item.closed ) || ( isMemberCheck(item.community_id) ) ) && (
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
