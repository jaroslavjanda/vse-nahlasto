export const addCommunity = async (_, { name, description, code, closed, ownerId }, { dbConnection }) => {
  const addCommunityDbResponse = await dbConnection.query(
    `INSERT INTO community (name, description, closed)
    VALUES (?, ?, ?);`,
    [name, description, closed],
  );

  const communityId = addCommunityDbResponse.insertId

  const community = (
    await dbConnection.query(`SELECT * FROM community WHERE community_id = ?`, [
      communityId,
    ])
  )[0];

  await dbConnection.query(
    `INSERT INTO membership (role_id, community_id, user_id, accepted)
     VALUES (?, ?, ?, ?);`,
    [1, communityId, ownerId, true],
  );

  return community;
};
