import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';

export const signin = async (_, { email, password }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `SELECT * FROM user WHERE email = ?`,
    [email],
  );
  const user = dbResponse[0];
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

  const userByEmail = ( await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email]) )[0];

  if (userByEmail) {
    throw new Error('Email already registered');
  }

  const passwordHash = await argon2.hash(password);

  const dbResponse = await dbConnection.query(
    `INSERT INTO user (email, password, name, surname)
    VALUES (?, ?, ?, ?);`,
    [email, passwordHash, name, surname],
  );

  const token = createToken({ id: dbResponse.insertId });

  const userObject = {
    id: dbResponse.insertId,
    email,
  };

  return { user: userObject, token: token };
};

export const resetUserPassword = async (
  _,
  {
    email,
    newPassword,
  },
  { dbConnection },
) => {
  await dbConnection.query(`UPDATE user SET password = ? WHERE email = ?`, [await argon2.hash(newPassword), email]);
  return ( await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email]) )[0];
};


