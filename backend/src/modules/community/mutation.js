export const addCommunity = async (_, { name, description, code, closed, ownerId }, { dbConnection }) => {
  const addCommunityDbResponse = await dbConnection.query(
    `INSERT INTO community (name, description, code, closed)
    VALUES (?, ?, ?, ?);`,
    [name, description, code, closed],
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
export const editCommunityDescription = async (_, { description, community_id }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `UPDATE community 
    SET description=? 
    WHERE community_id=?;`,
    [description, community_id],
  );

  const community = (
    await dbConnection.query(`SELECT * FROM community WHERE community_id = ?`, [
      community_id,
    ])
  )[0];

  return community;
};


