export const addCommunity = async (_, { ownerId, name }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `INSERT INTO community (id, ownerId, name)
    VALUES (NULL, ?, ?);`,
    [ownerId, name],
  );

  const community = (
    await dbConnection.query(`SELECT * FROM community WHERE id = ?`, [
      dbResponse.insertId,
    ])
  )[0];

  return community;
};
