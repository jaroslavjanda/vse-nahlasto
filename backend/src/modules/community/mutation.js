export const addCommunity = async (_, { ownerId, name }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `INSERT INTO community (user_id, name)
    VALUES (?, ?);`,
    [ownerId, name],
  );

  const community = (
    await dbConnection.query(`SELECT * FROM community WHERE community_id = ?`, [
      dbResponse.insertId,
    ])
  )[0];

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
