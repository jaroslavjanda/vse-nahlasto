import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';
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
export const signup = async (_, {email, password, name, surname}, { dbConnection }) => {
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
    //send email
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: email,
      from: 'tym7nahlasto@gmail.com', // Nemenit!
      subject: 'Registration confirmation',
      text: 'You have succesfully registered to Nahlas.to ',
      html: '<strong>You have succesfully registered to Nahlas.to</strong>',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent', 'Send123');
      })
      .catch((error) => {
        //Log friendly error
        console.error(error.toString());
      });
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
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: 'tym7nahlasto@gmail.com', // Nemenit!
      subject: 'Change password confirmation',
      text: 'You have successfully changed your password',
      html: '<strong>You have successfully changed your password</strong>',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        //Log friendly error
        console.error(error.toString());
        console.log(output);
      });
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
    const code = random(99999999)
    console.log("Code: ", code)

    const setResetCodeDbResponse = await dbConnection.query(
      `INSERT INTO forgotten (user_email, code)
      VALUES (?, ?)`,
      [email, code],
    );

    console.log("Insert ID: ", setResetCodeDbResponse.insertId)

    if (setResetCodeDbResponse.insertId) {

      console.log("I got here");
      const link = "http://dev.frontend.team07.vse.handson.pro/password_reset/?email="
        + email + "&code=" + code

      console.log("Link: ", link)

      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: email,
        from: 'tym7nahlasto@gmail.com', // Nemenit!
        subject: 'Change password confirmation',
        text: 'You have successfully changed your password',
        html: '<strong>'+ link + '</strong>',
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent');
        })
        .catch((error) => {
          //Log friendly error
          console.log("Sendgrid failed.");
          console.error(error.toString());
          console.log(error.toString());
        });
    }

  console.log("Im returning something!");

  return (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];
}
