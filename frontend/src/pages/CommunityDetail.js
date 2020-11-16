import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { toast } from 'react-toastify';
import { Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Tickets } from 'src/organisms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

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
        date
        status{
          status
        }
      }
    }
  }
`;

export const CommunityDetail = ({ match }) => {
  // Will be seperated to more files, this will be only networking manager
  // Time 😢
  const communityId = parseInt(match.params.communityId);
  const communityState = useQuery(COMMUNITY_DETAIL_QUERY, {
    variables: { communityId },
  });

  const [isMember, setIsMember] = useState(false);

  const community = communityState.data?.community;

  return (
    <div style={{ textAlign: 'center' }}>
      {communityState.loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {!communityState.loading && (
        <div>
          {console.log('Community: ', communityId)}
          <h1>{community.name}</h1>
          <p>{community.description}</p>
          {!community.closed && !isMember && (
            <div>
              <Alert variant={'success'}>
                <div>Welcome in {community.name} community.</div>
                <div>
                  <strong>This community is open for everyone</strong>
                </div>
              </Alert>
              <Button
                variant="primary"
                onClick={() => {
                  toast.success('Your are in community');
                  setIsMember(true);
                }}
              >
                Join here
              </Button>
              <Link to={`/community-detail/${communityId}/add`}>
                <Button variant="success">Add ticket</Button>
              </Link>
              <Link to={`/community-detail/${communityId}/edit_community`}>
                <Button variant="primary">
                  <FontAwesomeIcon icon={faPencilAlt} className="mr2 f4" /> Edit Description
                </Button>
              </Link>
              <Tickets tickets={community.tickets} />
            </div>
          )}
          {!community.closed && isMember && (
            <div>
              <Alert variant={'success'}>
                <div>Welcome in {community.name} community.</div>
                <div>
                  <strong>This community is open for everyone</strong>
                </div>
              </Alert>
              <h5>
                Hey bro 👋 <br />
                as a part of community you can see stats and add tickets
                <br />
                ⬇️
              </h5>
              <div>Number of users: {community.users.length}</div>
              <div>Number of tickets: {community.tickets.length}</div>
              <br />
              <br />

              <Link to={`/community-detail/${communityId}/add`}>
                <Button variant="success">Add ticket</Button>
              </Link>
              <br />
              <br />
              <Tickets tickets={community.tickets} />
            </div>
          )}
          {community.closed && (
            <div>
              <Alert variant={'danger'}>
                <div>Community {community.name} requires permission.</div>
                <div></div>
              </Alert>
              <Button
                variant="danger"
                onClick={() => toast.info('Your request was sended')}
              >
                Ask for permission
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
