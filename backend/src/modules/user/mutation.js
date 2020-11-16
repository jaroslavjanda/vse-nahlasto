import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';
import { random } from 'lodash';

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

  if (!email) {
    throw Error('No user registered with this email.');
  }
};

export const setResetCode = async (
  _,
  { email },
  { dbConnection },
) => {


  const doesUserExist = await dbConnection.query(
    `SELECT * FROM user WHERE email = ?`,
    [email],
  );

  if (doesUserExist.data) {

    const code = "XX".random(1, 99999999)

    console.log("Code: ", code)

    const dbResponse = await dbConnection.query(
      `INSERT INTO forgotten (user_email, code) VALUES (?, ?)`,
      [email, code],
    );

    if (dbResponse.insertId) {
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
          console.error(error.toString());
          console.log(output);
        });
    }
  }

  if (!doesUserExist) {
    throw Error('No user registered with this email.');
  }

  return (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];
}
