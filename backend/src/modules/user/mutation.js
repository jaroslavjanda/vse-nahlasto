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
    // name,
    // userName,
    // profileImageUrl = 'http://mrmrs.github.io/photos/p/1.jpg',
  },
  { dbConnection },
) => {
  const userByEmail = (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];

  if (userByEmail) {
    throw new Error('Email already registered');
  }

  const passwordHash = await argon2.hash(password);

  const dbResponse = await dbConnection.query(
    `INSERT INTO user (email, password)
    VALUES (?, ?);`,
    [email, passwordHash],
  );

  if (dbResponse.insertId){const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: email, 
      from: 'tym7nahlasto@gmail.com', // Nemenit!
      subject: 'Registration confirmation',
      text: 'You have succesfully registered to Nahlas.to ',
      html: '<strong>You have succesfully registered to Nahlas.to</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
        
      })
      .catch((error) => {
        console.log("fuck")


    //Log friendly error
      console.error(error.toString());
      console.log(output)
      })
  }

  const token = createToken({ id: dbResponse.insertId });

  const userObject = {
    id: dbResponse.insertId,
    email,
  };

  return { user: userObject, token: token };
};
