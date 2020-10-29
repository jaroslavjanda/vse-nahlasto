import { createToken } from '../libs/token';
import { users } from './mocks';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const MOCK_DATA_DELAY = 300;
const QUACKS_LIMIT = 20;
const QUACK_TEXT_LIMIT = 250;

function getAuthUser(dbUser) {
  return {
    id: dbUser.id,
    email: dbUser.email,
  };
}

export default {
  Query: {
    async users() {
      await sleep(MOCK_DATA_DELAY);

      return users;
    },
    // async user(_, { userName }) {
    //   await sleep(MOCK_DATA_DELAY);
    //
    //   return users.find((user) => user.userName === userName);
    // },
    async communities() {
      await sleep(MOCK_DATA_DELAY);

      return communities;
    },
  },

  Mutation: {
    async signin() {
      await sleep(MOCK_DATA_DELAY);
      const user = getAuthUser(users[0]);
      const token = createToken(user);

      return {
        user,
        token,
      };
    },
    async signup(_, { email, password }) {
      await sleep(MOCK_DATA_DELAY);

      if (
        users.find(
          (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
        )
      ) {
        throw Error('This email has been already used for registration');
      }

      const id = users.length + 1;

      const dbUser = {
        id,
        email: email.trim(),
      };

      const user = getAuthUser(dbUser);
      const token = createToken(user);

      users.push(dbUser);

      return { user, token };
    },

    async addCommunity(_, { ownerId, name }) {
      await sleep(MOCK_DATA_DELAY);

      if (!(name || '').trim()) {
        throw Error('No text provided');
      }

      // if (text.trim().length > QUACK_TEXT_LIMIT) {
      //   throw Error('Text is too long');
      // }

      const user = users.find((user) => user.id === ownerId);
      if (!user) {
        throw Error('User not found');
      }

      const community = {
        id: communities.length + 1,
        ownerId,
        name,
      };

      // quacks.splice(0, 0, quack);

      return community;
    },
  },
  User: {
    communities({ id }) {
      return communities
        .filter((community) => community.ownerId === id)
        // .slice(0, QUACKS_LIMIT);
    },
  },
  Community: {
    user({ userId }) {
      return users.find((user) => user.id === ownerId);
    },
  },
};
