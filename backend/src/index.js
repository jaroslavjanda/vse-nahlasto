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
  type User {
    email: String!
    communities: [Community!]!
  }

  type Community {
    id: Int!
    name: String!
    owner: User!
    ownerId: Int!
  }

  type AuthUser {
    email: String!
  }

  type AuthInfo {
    user: AuthUser!
    token: String!
  }

  type Query {
    users: [User!]!
    user(email: String!): User
    communities: [Community!]!
    community(name: String!): Community
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
