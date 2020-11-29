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
  const membersObjects = (
    await dbConnection.query(
      `SELECT user_id FROM membership WHERE community_id = ?`,
      [communityId],
    )
  );

  const idsArrayInt = [];
  membersObjects.forEach(convertObjectsToInts);

  function convertObjectsToInts(item, index) {
    console.log('Item value:', item.user_id);
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
  { dbConnection }
  ) => {
  const idsArrayObject = (await dbConnection.query(
      // TODO solve 'accepted'
      `SELECT community_id FROM membership WHERE user_id = ?`,
      [userId],
    )
  );

  const idsArrayInt = [];
  idsArrayObject.forEach(convertObjectsToInts);

  function convertObjectsToInts(item, index) {
    console.log('Item value:', item.community_id);
    idsArrayInt[index] = item.community_id;
  }

  return idsArrayInt;
};
