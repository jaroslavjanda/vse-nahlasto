export const addCommunity = async (_, { name, description, code, closed, ownerId }, { dbConnection }) => {

  // adds community to DB
  const addCommunityDbResponse = await dbConnection.query(
    `INSERT INTO community (name, description, closed)
    VALUES (?, ?, ?);`,
    [name, description, closed],
  );

  // if community inserted successfully
  if (addCommunityDbResponse.insertId) {

    const communityId = addCommunityDbResponse.insertId;

    // fetches added community from DB
    const community = (
      await dbConnection.query(`SELECT * FROM community WHERE community_id = ?`, [
        communityId,
      ])
    )[0];

    // adds user to membership table as an owner of the added community
    await dbConnection.query(
      `INSERT INTO membership (role_id, community_id, user_id, accepted)
     VALUES (?, ?, ?, ?);`,
      [1, communityId, ownerId, true],
    );

    // fetches user email from DB to be able to send him an email
    const userEmail = (await dbConnection.query(`SELECT email FROM user WHERE user_id = ?`, [
      ownerId,
    ]))[0];

    // main sending framework below
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: userEmail,
      from: 'tym7nahlasto@gmail.com', // Nemenit!
      subject: 'Add community confirmation',
      text: 'Community at Nahlas.to created ',
      html: '<strong>Your community has been added successfully.</strong>',
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

    return community;
  }
  return null;
};
