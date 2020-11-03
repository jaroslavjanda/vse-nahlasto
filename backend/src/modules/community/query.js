export const communities = async (_, __, { dbConnection }) => {
  const communities = await dbConnection.query(
    `SELECT  
    c.community_id, name, description, closed
    FROM community as c`
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
