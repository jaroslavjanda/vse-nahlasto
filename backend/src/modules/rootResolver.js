// import { queries as QuackQueries, mutations as QuackMutations } from './quack';
import { queries as UserQueries, mutations as UserMutations } from './user';
import { queries as CommunityQueries, mutations as CommunityMutations } from './community'

export default {
  Query: {
    // ...QuackQueries,
    ...UserQueries,
    ...CommunityQueries,
  },
  Mutation: {
    // ...QuackMutations,
    ...UserMutations,
    ...CommunityMutations,
  },
  // User: {
  //   async quacks(parent, _, { dbConnection }) {
  //     return await dbConnection.query(`SELECT * FROM quack WHERE userId = ?`, [
  //       parent.id,
  //     ]);
  //   },
  // },
  // Quack: {
  //   async user(parent, _, { dbConnection }) {
  //     return (
  //       await dbConnection.query(`SELECT * FROM user WHERE id = ?`, [
  //         parent.userId,
  //       ])
  //     )[0];
  //   },
  // },
};
