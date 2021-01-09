import { mutations as UserMutations, queries as UserQueries } from './user';
import {
  mutations as CommunityMutations,
  queries as CommunityQueries,
} from './community';
import {
  mutations as TicketMutations,
  queries as TicketQueries,
} from './ticket';
import {
  mutations as CommentMutations,
  queries as CommentQueries,
} from './comment';
import {
  mutations as UploadMutations,
  queries as UploadQueries,
} from './upload';

const { GraphQLScalarType } = require('graphql');

export default {
  Query: {
    ...UserQueries,
    ...CommunityQueries,
    ...TicketQueries,
    ...CommentQueries,
    ...UploadQueries,
  },
  Mutation: {
    ...UserMutations,
    ...CommunityMutations,
    ...TicketMutations,
    ...CommentMutations,
    ...UploadMutations,
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
        `SELECT ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id
        FROM ticket 
        WHERE user_id = ?
        ORDER BY ticket.date desc
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
    async comments(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT comment_id, date, content, user_id, ticket_id FROM comment
        WHERE ticket_id = ?`,
        [parent.ticket_id],
      );
    },
    async likes(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT ticket.ticket_id,
        COUNT(like.ticket_id) likes_count
        FROM ticket
        LEFT JOIN \`like\` on ticket.ticket_id = like.ticket_id 
        WHERE ticket.ticket_id = ?
        GROUP BY ticket.ticket_id
          `,
        [parent.ticket_id],
      );
    },
  },
  Likes: {
    async likes_users(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT user.user_id, name, surname, email FROM user 
          JOIN \`like\` on user.user_id = like.user_id 
          WHERE like.ticket_id = ?`,
        [parent.ticket_id],
      );
    },
  },
  Comment: {
    async user(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT user_id, name, surname, email FROM user 
        WHERE user_id = ?`,
        [parent.user_id],
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
        `SELECT ticket_id, title, image, ticket.content, ticket.date, ticket.status_id, ticket.user_id, community_id
        FROM ticket 
        WHERE community_id = ?
        ORDER BY ticket.date desc
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
