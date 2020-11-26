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
import { useAuth } from '../utils/auth';

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

const USER_ACCESSIBLE_COMMUNITIES = gql`
  query UserAccessibleCommunities($userId: Int!) {
    communitiesAccessibleToUserIds(userId: $userId)
  }
`;


export const Communities = () => {
  const communitiesState = useQuery(COMMUNITY_LIST_QUERY);
  const user = useAuth()
  var userId = user.user?.user_id

  // if (userId == null) {
  //   userId = 25
  // }

  const communitiesAccessibleToUser = useQuery(USER_ACCESSIBLE_COMMUNITIES, {
    variables: { userId }
  });
  console.log("User id: ", userId)

  console.log("Communities accessible to user:", communitiesAccessibleToUser)

  console.log("Hey", communitiesAccessibleToUser.data?.communitiesAccessibleToUserIds)

  function isMemberCheck(commId) {
    return !!communitiesAccessibleToUser.data?.communitiesAccessibleToUserIds.includes(commId);
  }

  const communities = communitiesState.data?.communities;


  const history = useHistory();

  return (
    <div style={{ textAlign: 'center' }}>
      {communitiesState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {!communitiesState.loading && (
          
        <div>
          <Container fluid className="container-header">
            <Row margin="50px">
              <Col align="left"><h1>Communities</h1></Col>  
              <Col align="right">
                <Button
                  variant="success"
                  onClick={() => history.push(`/add_community`)}
                >
                  Add new community
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
                      {item.closed && !isMemberCheck(item.community_id) && (
                        <Button
                          variant="danger"
                          onClick={() => toast.info('Your request was sent')}
                      >
                          JOIN
                        </Button>
                      )}
                      { console.log(((!item.closed) || (item.closed && isMemberCheck(item.community_id))), "condition log", item.name) }
                      {((!item.closed) || (item.closed && isMemberCheck(item.community_id))) && (
                      <Button
                          variant="success"
                          onClick={() => history.push(`community-detail/${item.community_id}`)}
                      >
                          OPEN
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
  )
};
