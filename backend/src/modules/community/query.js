export const communities = async (_, __, { dbConnection }) => {
  const communities = await dbConnection.query(
    `SELECT  
    c.community_id, name, description, closed
    FROM community as c`,
  );

  return communities;
};

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
export const communityOwnerId = async (_, { communityId }, { dbConnection }) => {
  const owner = (
    await dbConnection.query(
      `SELECT * FROM membership WHERE role_id = ? AND community_id = ?`,
      [1, communityId]
    )
  )[0];

  return owner.user_id
}
