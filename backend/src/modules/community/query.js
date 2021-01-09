/**
 * Returns all communities.
 * @param _
 * @param __
 * @returns {Promise<*>}
 */
export const communities = async (_, __, { dbConnection }) => {
  const communities = await dbConnection.query(
    `SELECT  
    c.community_id, name, description, image, closed
    FROM community as c`,
  );

  return communities;
};

/**
 * Returns TOP 3 communities with the most tickets and are opened.
 * @param _
 * @param __
 * @returns {Promise<*>}
 */
export const communitiesHomepage = async (_, __, { dbConnection }) => {
  const communitiesHomepage = await dbConnection.query(
    `SELECT  
    c.community_id, c.name, c.description, c.image, c.closed, COUNT(ticket.community_id) as countID
    FROM community as c
    LEFT JOIN ticket on c.community_id = ticket.community_id
    WHERE c.closed = '0'
    GROUP BY  c.community_id, c.name, c.description, c.closed
    ORDER BY countID DESC
    LIMIT 3`,
  );

  return communitiesHomepage;
};

/**
 * Based on community_id returns one community.
 * @param _
 * @param communityId
 * @returns {Promise<*>}
 */
export const community = async (_, { communityId }, { dbConnection }) => {
  const community = (
    await dbConnection.query(
      `SELECT 
      c.community_id, name, description, image, closed
      FROM community as c
      WHERE c.community_id = ?`,
      [communityId],
    )
  )[0];
  if (!community) {
    return null;
  }
  return community;
};

/**
 * Based on community_id returns id of it's owner.
 * @param _
 * @param communityId
 * @param dbConnection
 * @returns {Promise<*>}
 */
export const communityOwner = async (
  _,
  { communityId },
  { dbConnection },
) => {
  const ownerId = (
    await dbConnection.query(
      `SELECT user_id FROM membership WHERE role_id = ? AND community_id = ?`,
      [1, communityId],
    )
  )[0].user_id;

  console.log("owner id:", ownerId)

  const owner = (
    await dbConnection.query(
      `SELECT * FROM user WHERE user_id = ?`,
      [ownerId]
    )
  )[0]

  console.log("owner data:", owner)

  return owner
};

/**
 * Based on community_id returns array of Ids of all it's members.
 * @param _
 * @param communityId
 * @param dbConnection
 * @returns {Promise<[]>}
 */
export const communityMembersIds = async (
  _,
  { communityId },
  { dbConnection },
) => {
  const membersObjects = await dbConnection.query(
    `SELECT user_id FROM membership WHERE community_id = ?`,
    [communityId],
  );

  const idsArrayInt = [];
  membersObjects.forEach(convertObjectsToInts);

  function convertObjectsToInts(item, index) {
    idsArrayInt[index] = item.user_id;
  }

  return idsArrayInt;
};

/**
 * Returns list of community ids where current user is member.
 * @param _
 * @param userId
 * @param dbConnection
 * @returns {Promise<*>}
 */
export const communitiesAccessibleToUserIds = async (
  _,
  { userId },
  { dbConnection },
) => {
  const idsArrayObject = await dbConnection.query(
    `SELECT community_id FROM membership WHERE user_id = ?`,
    [userId],
  );

  const communityIdsArrayInt = [];
  idsArrayObject.forEach(convertObjectsToInts);

  function convertObjectsToInts(item, index) {
    communityIdsArrayInt[index] = item.community_id;
  }

  return communityIdsArrayInt;
};

/**
 * Based on user_id, returns all communities in which is user a member or an owner.
 * @param _
 * @param userId
 * @param dbConnection
 * @returns {Promise<*>}
 */
export const communitiesAccessibleToUser = async (
  _,
  { userId },
  { dbConnection },
) => {
  return await dbConnection.query(
    'SELECT community.community_id, name, description, image, code, closed ' +
      'FROM `community` ' +
      'JOIN membership ' +
      'ON community.community_id = membership.community_id ' +
      'WHERE user_id = ?',
    [userId],
  );
};

/**
 * Based on user_id, returns all communities in which is user an owner.
 * @param _
 * @param userId
 * @param dbConnection
 * @returns {Promise<*>}
 */
export const communitiesUserOwns = async (_, { userId }, { dbConnection }) => {
  return await dbConnection.query(
    'SELECT community.community_id, name, description, image, code, closed ' +
      'FROM `community` ' +
      'JOIN membership ' +
      'ON community.community_id = membership.community_id ' +
      'WHERE user_id = ? AND role_id = 1',
    [userId],
  );
};
