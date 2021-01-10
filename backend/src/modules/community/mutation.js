import { send, TYPE } from '../helpers/sendgrid/send';

/**
 * Add community.
 * @param _
 * @param name
 * @param description
 * @param image
 * @param code
 * @param closed
 * @param ownerId
 * @returns {Promise<*>}
 */
import { singleUpload } from '../upload/mutation';
import { DirType } from '../../constants';
export const addCommunity = async (
  _,
  { name, description, image, code, closed, ownerId },
  { dbConnection },
) => {
  // adds community to DB
  var img = (image = !null ? image : null);
  const imgPath = await singleUpload({
    file: img,
    type: DirType.COMMUNITY_UPLOAD_DIR,
  });
  const dbResponse = await dbConnection.query(
    `INSERT INTO community (name, description, image, closed)
    VALUES (?, ?, ?, ?);`,
    [name, description, imgPath, closed],
  );
  // if community inserted successfully
  if (dbResponse.insertId) {
    const communityId = dbResponse.insertId;

    // fetches added community from DB
    const community = (
      await dbConnection.query(
        `SELECT * FROM community WHERE community_id = ?`,
        [communityId],
      )
    )[0];

    // adds user to membership table as an owner of the added community
    await dbConnection.query(
      `INSERT INTO membership (role_id, community_id, user_id, accepted)
     VALUES (?, ?, ?, ?);`,
      [1, communityId, ownerId, true],
    );

    // fetches user email from DB to be able to send him an email
    const email = (
      await dbConnection.query(`SELECT email FROM user WHERE user_id = ?`, [
        ownerId,
      ])
    )[0].email;

    const userName = (
      await dbConnection.query(`SELECT name FROM user WHERE user_id = ?`, [
        ownerId,
      ])
    )[0].name;

    const communityLink = "http://dev.frontend.team07.vse.handson.pro/community-detail/" + communityId

    const emailData = {
      type: TYPE.ADD_COMMUNITY_CONFIRMATION,
      receiver: email,
      communityName: name,
      receiverName: userName,
      communityLink: communityLink
    };

    send(emailData);

    return community;
  }
  return null;
};

/**
 * Edit community description.
 * @param _
 * @param community_id
 * @param description
 * @returns {Promise<*>}
 */
export const editCommunity = async (
  _,
  { community_id, description },
  { dbConnection },
) => {
  await dbConnection.query(
    `UPDATE community SET description = ? WHERE community_id = ?`,
    [description, community_id],
  );

  const community = (
    await dbConnection.query(`SELECT * FROM community WHERE community_id = ?`, [
      community_id,
    ])
  )[0];

  return community;
};
