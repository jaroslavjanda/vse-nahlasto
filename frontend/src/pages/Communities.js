import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { toast } from 'react-toastify';
import {
  Container,
  Col,
  Card,
  Row,
  Spinner,
  Button,
  CardColumns,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const COMMUNITY_LIST_QUERY = gql`
  query Communities {
    communities {
      community_id
      name
      description
      closed
    }
  }
`;

export const Communities = () => {
  const communitiesState = useQuery(COMMUNITY_LIST_QUERY);
  const [isMember] = useState(false);

  const communities = communitiesState.data?.communities;

  const history = useHistory();

  return (
    <div style={{ textAlign: 'center' }}>
      {communitiesState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Načítání...</span>
        </Spinner>
      )}
      {!communitiesState.loading && (
        <div>
          <Container fluid className="container-header">
            <Row margin="50px">
              <Col align="left">
                <h1>Komunity</h1>
              </Col>
              <Col align="right">
                <Button
                  variant="success"
                  onClick={() => history.push(`/add_community`)}
                >
                  Přidat komunitu
                </Button>
              </Col>
            </Row>
          </Container>

          <div>
            <Row>
              <CardColumns>
                {communities.map((item) => (
                  <Card style={{ width: '100%' }} key={item.community_id}>
                    <Card.Img
                      variant="top"
                      src="https://picsum.photos/180/100"
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
          </div>
        </div>
      )}
    </div>
  );
};
