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
export const addCommunity = async (
  _,
  { name, description, image, code, closed, ownerId },
  { dbConnection },
) => {
  // adds community to DB
  // TODO prevent creating communities with same name
  var img = image ? image : null;
  const addCommunityDbResponse = await dbConnection.query(
    `INSERT INTO community (name, description, image, closed)
    VALUES (?, ?, ?, ?);`,
    [name, description, img, closed],
  );

  // if community inserted successfully
  if (addCommunityDbResponse.insertId) {
    const communityId = addCommunityDbResponse.insertId;

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
    )[0];

    send(email, TYPE.ADD_COMMUNITY_CONFIRMATION);

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
  //TODO check if user have role to edit
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
