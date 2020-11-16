import dotenv from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

import { getConnection } from './libs/connection';

import rootResolver from './modules/rootResolver';
import mockResolver from './__mocks__/mockResolver';

dotenv.config();

const MOCKS = process.env.MOCKS === 'true';

const typeDefs = gql`
  scalar Date
  type User {
    user_id: Int!
    name: String
    surname: String!
    email: String!
    communities: [Community!]!
    tickets: [Ticket!]
  }

  type Community {
    community_id: Int!
    name: String!
    description: String!
    closed: Boolean!
    owner: [User]
    users: [User!]!
    tickets: [Ticket!]
  }

  type Comment {
    comment_id: Int!
    date: String!
    content: String!
    closed: Boolean!
    user_id: Int!
    user: [User!]!
    ticket_id: Int!
  }

  type Ticket {
    ticket_id: Int!
    title: String!
    image: String!
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
  }

  type AuthUser {
    email: String!
    user_id: Int!
  }

  type AuthInfo {
    user: AuthUser!
    token: String!
  }

  type Query {
    users: [User!]!
    user(user_id: Int!): User
    communities: [Community]
    community(communityId: Int!): Community
    tickets: [Ticket!]
    ticket(ticketId: Int!): [Ticket!]
    communityTickets(communityId: Int!): [Ticket!]
    communityTicket(communityId: Int!, ticketId: Int!): Ticket
    comments: [Comment!]
    comment(commentId: Int!): [Comment!]
    ticketComments(ticketId: Int!): [Comment!]
  }

  type Mutation {
    signin(email: String!, password: String!): AuthInfo!

    signup(
      name: String!
      surname: String!
      email: String!
      password: String!
    ): AuthInfo!

    addCommunity(ownerId: Int!, name: String!): Community!
    editCommunityDescription(description: String!, community_id: Int!): Community!

    addLike(ownerId: Int!, ticketId: Int!): Ticket!

    addTicket(
      user_id: Int!
      community_id: Int!
      title: String!
      content: String!
      image: String!
      status_id: Int!
    ): Ticket!
    resetUserPassword(email: String!, newPassword: String!): AuthUser!
  }
`;

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  const dbConnection = MOCKS ? null : await getConnection();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: MOCKS ? mockResolver : rootResolver,
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

  app.get('/', (_, res) => res.redirect('/graphql'));

  app.listen(port, () => {
    console.info(`Server started at http://localhost:${port}/graphql`);
  });
};

main();
