export const communities = async (_, __, { dbConnection }) => {
  const communities = await dbConnection.query(
    `SELECT  
    c.community_id, name, description, user_id, closed
    FROM community as c
    JOIN membership as m on c.community_id=m.community_id 
    WHERE role_id = 1`
    );

  return communities;
};

export const community = async (_, { communityId }, { dbConnection }) => {
  const community = (
    await dbConnection.query(
      `SELECT 
      c.community_id, name, description, user_id, closed
      FROM community as c
      JOIN membership as m on c.community_id=m.community_id 
      WHERE role_id = 1 AND c.community_id = ?`, 
      [
      communityId,
      ]
    )
  ) [0]
  if (!community) {
    return null
  }
  return community
}

export const memberships = async (_, __, { dbConnection }) => {
  const memberships = (
    await dbConnection.query(
      `SELECT * FROM membership`
    )
  )
  if (!memberships) {
    return null
  }
  return memberships
}

export const membership = async (_, { communityId }, { dbConnection }) => {
  const membership = (
    await dbConnection.query(
      `SELECT * FROM membership as m
      WHERE m.community_id = ?`, 
      [
      communityId,
      ]
    )
  )
  if (!membership) {
    return null
  }
  return membership
}
