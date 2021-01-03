import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';
import { send, TYPE } from '../helpers/sendgrid/send';
import { random } from 'lodash';

/**
 * Sign in user.
 * @param _
 * @param email
 * @param password
 * @returns {Promise<*>}
 */
export const signin = async (_, { email, password }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `SELECT * FROM user WHERE email = ?`,
    [email],
  );
  const user = dbResponse[0];
  //if user does not exists
  if (!user) {
    throw Error('Neznámý uživatel.');
  }

  if (await argon2.verify(user.password, password)) {
    const token = createToken({ id: user.id });
    return {
      user: { ...user },
      token,
    };
  } else {
    throw Error('Email nebo heslo je špatně zadané.');
  }
};

/**
 * Creates user.
 * @param _
 * @param email
 * @param password
 * @param name
 * @param surname
 * @returns {Promise<*>}
 */
export const signup = async (
  _,
  { email, password, name, surname },
  { dbConnection },
) => {
  //check if user is already signed up
  const userByEmail = (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];

  if (userByEmail) {
    throw new Error('Email has been already used for registration.');
  }

  //create hash
  const passwordHash = await argon2.hash(password);

  //create user
  const dbResponse = await dbConnection.query(
    `INSERT INTO user (email, password, name, surname)
    VALUES (?, ?, ?, ?);`,
    [email, passwordHash, name, surname],
  );

  if (dbResponse.insertId) {
    send(email, TYPE.REGISTRATION);
  }

  const token = createToken({ id: dbResponse.insertId });

  const userObject = {
    user_id: dbResponse.insertId,
    email,
  };

  return { user: userObject, token: token };
};

/**
 * Returns ticket from one community based on communityId and ticketId.
 * @param _
 * @param email
 * @param newPassword
 * @returns {Promise<*>}
 */
export const resetUserPassword = async (
  _,
  { email, newPassword },
  { dbConnection },
) => {
  //update user
  const dbResponse = await dbConnection.query(
    `UPDATE user SET password = ? WHERE email = ?`,
    [await argon2.hash(newPassword), email],
  );

  if (dbResponse) {
    //send email
    send(email, TYPE.CHANGE_PASSWORD);
  }

  // deletes completed request from the DB
  await dbConnection.query(
    `DELETE FROM change_password_request WHERE user_email = ?`,
    [email],
  );

  return (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];
};

export const setResetCode = async (_, { email }, { dbConnection }) => {
  // 1. check if the request is first, if not, delete the previous one
  const uniqueCheckDbResponse = (
    await dbConnection.query(
      `SELECT * FROM change_password_request WHERE user_email = ?`,
      [email],
    )
  )[0];

  if (uniqueCheckDbResponse) {
    await dbConnection.query(
      `DELETE FROM change_password_request WHERE user_email = ?`,
      [email],
    );
  }

  // 2. create random code
  const code = random(99999999);

  // 3. insert email $ code into DB table 'forgotten'
  const setResetCodeDbResponse = await dbConnection.query(
    `INSERT INTO change_password_request (user_email, code)
      VALUES (?, ?)`,
    [email, code],
  );

  if (setResetCodeDbResponse.insertId) {
    const link =
      'http://dev.frontend.team07.vse.handson.pro/password_reset/' +
      email +
      '/' +
      code;

    send(email, TYPE.SEND_LINK_TO_CHANGE_PASSWORD, link);
  }

  return (
    await dbConnection.query(
      `SELECT * FROM change_password_request WHERE user_email = ?`,
      [email],
    )
  )[0];
};

export const joinPublicCommunity = async (
  _,
  { userId, communityId },
  { dbConnection },
) => {
  console.log('userId:', userId, 'commId:', communityId);

  await dbConnection.query(
    `INSERT INTO membership (role_id, community_id, user_id, accepted)
      VALUES (?, ?, ?, ?)`,
    [3, communityId, userId, 1],
  );

  return (
    await dbConnection.query(
      `SELECT community_id FROM membership WHERE community_id = ? AND user_id = ?`,
      [communityId, userId],
    )
  )[0];
};
