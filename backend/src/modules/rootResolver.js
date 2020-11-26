import { queries as UserQueries, mutations as UserMutations } from './user';
import {
  queries as CommunityQueries,
  mutations as CommunityMutations,
} from './community';
import {
  queries as TicketQueries,
  mutations as TicketMutations,
} from './ticket';
import {
  queries as CommentQueries,
  mutations as CommentMutations,
} from './comment';

const { GraphQLScalarType } = require('graphql');

export default {
  Query: {
    ...UserQueries,
    ...CommunityQueries,
    ...TicketQueries,
    ...CommentQueries,
  },
  Mutation: {
    ...UserMutations,
    ...CommunityMutations,
    ...TicketMutations,
    ...CommentMutations,
  },

  User: {
    async communities(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT community.community_id, name, description, closed FROM community 
        JOIN membership on membership.community_id = community.community_id 
        WHERE membership.user_id = ?`,
        [parent.user_id],
      );
    },
    async tickets(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id, 
        COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
        FROM ticket 
        LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
        LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
        WHERE ticket.user_id = ?
        GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id
        `,
        [parent.user_id],
      );
    },
  },
  Ticket: {
    async status(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT status_id, status, code_class FROM status
        WHERE status_id = ?`,
        [parent.status_id],
      );
    },
  },
  Community: {
    async owner(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT user.user_id, name, surname, email FROM user 
        JOIN membership on membership.user_id = user.user_id 
        WHERE community_id = ? AND role_id = 1`,
        [parent.community_id],
      );
    },
    async users(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT user.user_id, name, surname, email FROM user 
        JOIN membership on membership.user_id = user.user_id 
        WHERE community_id = ?`,
        [parent.community_id],
      );
    },
    async tickets(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id, 
        COUNT(like.ticket_id) likes_count, COUNT(comment.ticket_id) comments_count 
        FROM ticket 
        LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
        LEFT JOIN comment on ticket.ticket_id = comment.ticket_id
        WHERE ticket.community_id = ?
        GROUP BY ticket.ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id
        `,
        [parent.community_id],
      );
    },
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom date scalar',
    parseValue(value) {
      return value;
    },
    serialize(value) {
      const d = new Date(Number(value));
      var date = d.getDate();
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      const fullDate = date + '. ' + month + '. ' + year;
      return fullDate;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};
