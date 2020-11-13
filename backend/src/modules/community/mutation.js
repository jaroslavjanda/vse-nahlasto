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
