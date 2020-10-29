import { queries as UserQueries, mutations as UserMutations } from './user';
import { queries as CommunityQueries, mutations as CommunityMutations } from './community'

export default {
  Query: {
    ...UserQueries,
    ...CommunityQueries,
  },
  Mutation: {
    ...UserMutations,
    ...CommunityMutations,
  },

  //TODO cross-selecty

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
