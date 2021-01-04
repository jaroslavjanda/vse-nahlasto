import dotenv from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

import { getConnection } from './libs/connection';

import rootResolver from './modules/rootResolver';

dotenv.config();

const typeDefs = gql`
  scalar Date

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    user_id: Int!
    name: String
    surname: String!
    email: String!
    communities: [Community!]!
    communitiesHomepage: [Community!]!
    tickets: [Ticket!]
  }

  type Community {
    community_id: Int!
    name: String!
    description: String!
    image: String
    closed: Boolean!
    owner: [User]
    users: [User!]!
    tickets: [Ticket!]
  }

  type Comment {
    comment_id: Int!
    date: Date!
    content: String!
    closed: Boolean!
    user_id: Int!
    user: [User!]!
    ticket_id: Int!
  }

  type Ticket {
    ticket_id: Int!
    title: String!
    image: String
    content: String!
    date: Date!
    status_id: Int!
    user_id: Int!
    community_id: Int!
    likes_count: Int
    comment_count: Int
    comments: [Comment!]!
    status: [Status!]
  }

  type Status {
    status_id: Int!
    status: String!
    code_class: String!
  }

  type ChangePasswordRequest {
    user_email: String!
    code: Int!
  }

  type AuthUser {
    name: String!
    surname: String!
    email: String!
    user_id: Int!
  }

  type AuthInfo {
    user: AuthUser!
    token: String!
  }

  type Query {
    uploads: [File]
    users: [User!]!
    user(user_id: Int!): User
    changePasswordRequest(
      user_email: String!
      code: Int!
    ): ChangePasswordRequest
    communities: [Community]
    communitiesHomepage: [Community]
    community(communityId: Int!): Community
    communitiesAccessibleToUser(userId: Int!): [Community]
    communitiesUserOwns(userId: Int!): [Community]
    communitiesAccessibleToUserIds(userId: Int!): [Int]
    tickets: [Ticket!]
    ticket(ticketId: Int!): Ticket!
    usersTickets(userId: Int!): [Ticket]
    ticketsToResolve(userId: Int!): [Ticket]
    communityTickets(communityId: Int!): [Ticket!]
    communityTicket(communityId: Int!, ticketId: Int!): Ticket
    communityOwnerId(communityId: Int!): Int!
    communityMembersIds(communityId: Int!): [Int]
    comments: [Comment!]
    comment(commentId: Int!): [Comment!]
    ticketComment(ticketId: Int!): [Comment!]
    ticketFromCommunitiesIAmAdminIn(userId: Int!): [Ticket]
  }

  type Mutation {
    singleUploadStream(file: Upload!): File!
    singleUpload(file: Upload!): File!

    signin(email: String!, password: String!): AuthInfo!

    signup(
      name: String!
      surname: String!
      email: String!
      password: String!
    ): AuthInfo!

    addCommunity(
      name: String!
      description: String
      code: String
      image: Upload
      closed: Boolean!
      ownerId: Int!
    ): Community!

    editCommunity(description: String!, community_id: Int!): Community!

    addLike(ownerId: Int!, ticketId: Int!): Ticket!

    addTicket(
      user_id: Int!
      community_id: Int!
      title: String!
      content: String!
      image: Upload
      status_id: Int!
    ): Ticket!

    addComment(content: String!, user_id: Int!, ticket_id: Int!): Comment

    deleteTicket(userId: Int!, communityId: Int!, ticketId: Int!): Ticket!

    resetUserPassword(email: String!, newPassword: String!): AuthUser!

    setResetCode(email: String!): ChangePasswordRequest!

    joinPublicCommunity(userId: Int!, communityId: Int!): Community

    setTicketResolved(ticketId: Int!): Ticket
  }
`;

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  const dbConnection = await getConnection();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: rootResolver,
    context: async ({ req, res }) => {
      const auth = req.headers.Authorization || '';

      return {
        req,
        res,
        dbConnection,
        auth,
      };
    },
    playground: true,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;
  app.use('/static', express.static('public/'));
  app.get('/', (_, res) => res.redirect('/graphql'));

  app.listen(port, () => {
    console.info(`Server started at http://localhost:${port}/graphql`);
  });
};

main();
