import { queries as UserQueries, mutations as UserMutations } from './user';
import { queries as CommunityQueries, mutations as CommunityMutations } from './community'
import { queries as TicketQueries, mutations as TicketMutations } from './ticket'
import { queries as MembershipQueries, mutations as MembershipMutations } from './membership'
import { communities, memberships } from './community/query';

export default {
  Query: {
    ...UserQueries,
    ...CommunityQueries,
    ...TicketQueries,
    ...MembershipQueries
  },
  Mutation: {
    ...UserMutations,
    ...CommunityMutations,
    ...TicketMutations,
    ...MembershipMutations
  },
  Community: {
    owner({ user_id }) {
      return users.find((user) => user.user_id === user_id);
    },
    //TODO get with attribute
    users({ community_id }) {
      return memberships.filter((member) => member.community_id === community_id);
    },
    //TODO get with attribute
    tickets({community_id}){
      return tickets(community_id);
    }
  },
  User:{
    communities({user_id}){
      return communities.filter((community) => community.users.filter((user)=> user.user_id=== user_id) );
    }
  }

};
