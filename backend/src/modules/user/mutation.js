import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';

export const signin = async (_, { email, password }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `SELECT * FROM user WHERE email = ?`,
    [email],
  );
  const user = dbResponse[0];

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

export const signup = async (
  _,
  {
    email,
    password,
    name,
    surname,
    // profileImageUrl = 'http://mrmrs.github.io/photos/p/1.jpg',
  },
  { dbConnection },
) => {
  const userByEmail = (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];

  if (userByEmail) {
    throw new Error('Email has been already used for registration.');
  }

  const passwordHash = await argon2.hash(password);

  const dbResponse = await dbConnection.query(
    `INSERT INTO user (email, password, name, surname)
    VALUES (?, ?, ?, ?);`,
    [email, passwordHash, name, surname],
  );

  if (dbResponse.insertId) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(config.SENDGRID_API_KEY);

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
    id: dbResponse.insertId,
    email,
  };

  return { user: userObject, token: token };
};

export const resetUserPassword = async (
  _,
  { email, newPassword },
  { dbConnection },
) => {
  const dbResponse = await dbConnection.query(
    `UPDATE user SET password = ? WHERE email = ?`,
    [await argon2.hash(newPassword), email],
  );

  if (dbResponse) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(config.SENDGRID_API_KEY);

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

  if (!email) {
    throw Error('No user registered with this email.');
  }
};
