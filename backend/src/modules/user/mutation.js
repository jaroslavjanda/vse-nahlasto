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
    throw Error('Unknown username.');
  }

  if (await argon2.verify(user.password, password)) {
    const token = createToken({ id: user.id });
    return {
      user: { ...user },
      token,
    };
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
export const signup = async (_, { email, password, name, surname }, { dbConnection }) => {
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
export const resetUserPassword = async (_, { email, newPassword }, { dbConnection }) => {
  //update user
  const dbResponse = await dbConnection.query(
    `UPDATE user SET password = ? WHERE email = ?`,
    [await argon2.hash(newPassword), email],
  );

  if (dbResponse) {
    //send email
    send(email, TYPE.CHANGE_PASSWORD);
  }

  return (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];
};

export const setResetCode = async (
  _,
  { email },
  { dbConnection },
) => {

  // 1. check if the request is first, if not, delete the previous one
  const uniqueCheckDbResponse = ( await dbConnection.query(
    `SELECT * FROM forgotten WHERE user_email = ?`,
    [email]
  ))[0];

  console.log("unique resp. data:", uniqueCheckDbResponse)

  if (uniqueCheckDbResponse) {
    console.log("Deleting previous request")
    await dbConnection.query(
      `DELETE FROM forgotten WHERE user_email = ?`,
      [email]
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
    const link = 'http://dev.frontend.team07.vse.handson.pro/password_reset/'
      + email + '/' + code;

    send(email, TYPE.SEND_LINK_TO_CHANGE_PASSWORD, link);
  }

  return (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];
};
