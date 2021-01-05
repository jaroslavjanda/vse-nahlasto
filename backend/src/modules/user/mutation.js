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

    console.log('receiver email: ', email);

    const emailData = {
      type: TYPE.REGISTRATION,
      receiver: email,
      receiverName: name,
    };

    send(emailData);

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

  const userName = await dbConnection.query(
    'SELECT userName FROM user WhERE email = ?',
    [email],
  );

  if (dbResponse) {

    console.log('receiver email: ', email);

    const emailData = {
      type: TYPE.CHANGE_PASSWORD,
      receiver: email,
      receiverName: userName,
    };

    //send email
    send(emailData);
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

    const userName = await dbConnection.query(
      'SELECT userName FROM user WhERE email = ?',
      [email],
    );

    const emailData = {
      type: TYPE.SEND_LINK_TO_CHANGE_PASSWORD,
      receiver: email,
      receiverName: userName,
      link: link,
    };

    send(emailData);
  }

  return (
    await dbConnection.query(
      `SELECT * FROM change_password_request WHERE user_email = ?`,
      [email],
    )
  )[0];
};

/**
 *
 * @param _
 * @param userId
 * @param communityId
 * @param dbConnection
 * @returns {Promise<*>}
 */
export const joinPublicCommunity = async (
  _,
  { userId, communityId },
  { dbConnection },
) => {
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
/**
 *
 * @param _
 * @param userId
 * @param communityId
 * @param dbConnection
 * @returns {Promise<*>}
 */
export const joinPrivateCommunity = async (
  _,
  { userId, communityId },
  { dbConnection },
) => {

  console.log("step 1");

  const usersCredentials = (await dbConnection.query(
    'SELECT name, email FROM user WHERE user_id = ?',
    [userId],
  ))[0];

  const communityName = (await dbConnection.query(
    'SELECT name FROM community WHERE community_id = ?',
    [communityId],
  ))[0];

  // TODO roles can be 1 and 2, but more than 1 email should be sent then - we do not use role 2 for now
  const communityOwnerId = (await dbConnection.query(
    'SELECT user_id FROM `membership` WHERE community_id = ? AND role_id = 1',
    [communityId],
  ))[0].user_id;

  const communityOwnerCredentials = (await dbConnection.query(
    'SELECT name, email FROM `user` WHERE user_id = ?',
    [communityOwnerId],
  ))[0];

  console.log("step 2");

  // ################### LINK STUFF ###################
  // 1. check if the request is first, if not, delete the previous one
  const uniqueCheckDbResponse = (
    await dbConnection.query(
      `SELECT * FROM join_private_community_request WHERE user_email = ?`,
      [usersCredentials.email],
    )
  )[0];

  console.log("step 3");

  if (uniqueCheckDbResponse) {
    await dbConnection.query(
      `DELETE FROM join_private_community_request WHERE user_email = ?`,
      [usersCredentials.email],
    );
  }

  console.log("step 4");

  // 2. create random code
  const code = random(99999999);

  console.log("step 4.5");

  // 3. insert email $ code into DB table 'forgotten'
  const setResetCodeDbResponse = await dbConnection.query(
    `INSERT INTO join_private_community_request (communityId, user_email, code)
      VALUES (?, ?, ?)`,
    [communityId, usersCredentials.email, code],
  );

  console.log("step 5");

  if (setResetCodeDbResponse.insertId) {
    console.log("step 6");

    const acceptance_link =
      // TODO change localhost to dev.frontend
      'http://localhost:3000/join_private_community_request/' +
      communityId + '/' +
      usersCredentials.email +
      '/' +
      code;

    // ################### END OF THE LINK STUFF ###################

    const applicantEmailData = {
      type: TYPE.JOIN_COMMUNITY_REQUEST,
      receiver: usersCredentials.email,
      receiverName: usersCredentials.name,
      communityName: communityName.name,
    };

    const communityOwnerEmailData = {
      type: TYPE.JOIN_COMMUNITY_REQUEST_ADMIN,
      receiver: communityOwnerCredentials.email,
      receiverName: communityOwnerCredentials.name,
      communityName: communityName.name,
      applicantEmail: usersCredentials.email,
      link: acceptance_link,
    };

    //send emails
    send(applicantEmailData);
    send(communityOwnerEmailData);

    console.log(usersCredentials, communityOwnerId, communityOwnerCredentials);
    console.log('This is a message that request can be sent.', usersCredentials.email, usersCredentials.name, communityName.name);
  }
};
