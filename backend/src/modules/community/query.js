/**
 * Returns all communities.
 * @param _
 * @param __
 * @returns {Promise<*>}
 */
export const communities = async (_, __, { dbConnection }) => {
  const communities = await dbConnection.query(
    `SELECT  
    c.community_id, name, description, closed
    FROM community as c`,
  );

  return communities;
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
      c.community_id, name, description, closed
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
export const communityOwnerId = async (
  _,
  { communityId },
  { dbConnection },
) => {
  const owner = (
    await dbConnection.query(
      `SELECT * FROM membership WHERE role_id = ? AND community_id = ?`,
      [1, communityId],
    )
  )[0];

  return owner.user_id;
};

/**
 * Returns list of community ids where current user is member.
 * @param _
 * @param userId
 * @param dbConnection
 * @returns {Promise<*>}
 */
export const communitiesAccessibleToUserIds = async (_, { userId }, { dbConnection }) => {
  const idsArrayObject = (await dbConnection.query(
    // TODO solve 'accepted'
      `SELECT community_id FROM membership WHERE user_id = ?`,
      [userId],
    )
  );

  const idsArrayInt = []
  idsArrayObject.forEach(convertObjectsToInts)

  function convertObjectsToInts(item, index) {
    console.log("Item value:",item.community_id)
    idsArrayInt[index] = item.community_id
  }

  return idsArrayInt;
};
