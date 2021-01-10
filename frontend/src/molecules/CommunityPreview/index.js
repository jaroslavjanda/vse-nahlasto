import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Col, Row } from 'react-bootstrap';
import { CommunityCard } from './CommunityCard';
import { getDataFromLocalStorage } from './../../utils/localStorage';

export const PreviewType = {
  Member: 'Member',
  Owner: 'Owner',
  Basic: 'Basic',
};

const communityAccessible = gql`
  query CommunityList($userId: Int!) {
    communitiesAccessibleToUser(userId: $userId) {
      community_id
      name
      description
      closed
      image
      role_id
    }
  }
`;

export const CommunityPreview = ({ communities }) => {

  let user = getDataFromLocalStorage()?.user;
  var userId = user ? parseInt(user.user_id) : undefined;
  if (userId === undefined) userId = 0;

  const variables = {
    userId: userId,
  };
  
  const state = useQuery(communityAccessible, {variables});
  const userCommunities = state.data?.communitiesAccessibleToUser;

  const getAccessible = (communityId, role_id) => {
    if(userCommunities){
      for (let index = 0; index < userCommunities.length; index++) {
        if (communityId===userCommunities[index].community_id && userCommunities[index].role_id===role_id){
          return true
        }
      }
    }
    return false
  };

  const ResolvePreviewType = (community) => {
    const isMember = getAccessible(community.community_id, 3)
    const isOwner = getAccessible(community.community_id, 1)
    
    if(isOwner){
      return PreviewType.Owner
    }
    else if (isMember || !community.closed){
      return PreviewType.Member
    }
    else{
      return PreviewType.Basic
    }
   
  };

  return (
    <div className="news">
      <Row>
        {communities.map((community) => (
          <Col lg="auto" md={6} key={community.community_id}>
            <CommunityCard 
              community={community} 
              previewType={ResolvePreviewType(community)} 
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
